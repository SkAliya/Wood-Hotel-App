import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useCheckin from "../check-in-out/useCheckin";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import useCheckout from "../check-in-out/useCheckout.js";
import useDeleteBooking from "./useDeleteBooking.js";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Modal from "../../ui/Modal.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // const status = "checked-in";
  // const booking = {};

  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  // CUSTOM HOOKS
  const { booking, isLoading } = useBooking();
  const { checkingMutateFn, isLoading: checkinLoading } = useCheckin();
  const { checkoutMutateFn, isLoading: checkoutLoading } = useCheckout();
  const { deleteBookingMutateFn, isLoading: isDeleting } = useDeleteBooking();

  const { status, id: bookingId, isPaid, guests, totalPrice } = booking ?? {};
  useEffect(() => setChecked(isPaid ?? false), [isPaid]);

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckin() {
    checkingMutateFn(bookingId);
    navigate(`/checkin/${bookingId}`);
  }

  // ///////////////////////////////////////////////

  if (isLoading) return <Spinner />;
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <HeadingGroup>
          {/* <Heading as="h1">Booking #</Heading> */}
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Checkbox
        checked={checked}
        onChange={() => setChecked((checkin) => !checkin)}
        disabled={checked}
        id="checked"
      >
        I confirm that {guests.fullName} has paid the total amount of{" "}
        {formatCurrency(totalPrice)}
      </Checkbox>
      <ButtonGroup>
        {!isPaid && (
          <Button
            variation="primary"
            size="medium"
            onClick={handleCheckin}
            disabled={!checked || checkinLoading}
          >
            Check-in Booking #{bookingId}
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            variation="primary"
            size="medium"
            onClick={() => checkoutMutateFn(bookingId)}
            disabled={!checked || checkoutLoading}
          >
            Check-out Booking #{bookingId}
          </Button>
        )}
        {status === "checked-out" && (
          //   <Button
          //     variation="danger"
          //     size="medium"
          //     onClick={() => {
          //       deleteBookingMutateFn(bookingId);
          //       navigate("/bookings");
          //     }}
          //     disabled={!checked || isDeleting}
          //   >
          //     Delete Booking #{bookingId}
          //   </Button>
          // )}

          <Modal>
            <Modal.Open type="delete">
              <Button
                variation="danger"
                size="medium"
                onClick={() => {
                  deleteBookingMutateFn(bookingId);
                  navigate("/bookings");
                }}
                disabled={!checked || isDeleting}
              >
                Delete Booking #{bookingId}
              </Button>
            </Modal.Open>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="booking"
                onConfirm={() =>
                  deleteBookingMutateFn(bookingId, {
                    onSettled: navigate(-1),
                  })
                }
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        )}
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Row>
  );
}

export default BookingDetail;
