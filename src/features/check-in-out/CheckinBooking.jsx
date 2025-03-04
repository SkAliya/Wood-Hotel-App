import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import useCheckin from "./useCheckin";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useSettingsData from "../settings/useSettingsData";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmed, setConfirmed] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkingMutateFn, isLoading: isChecking } = useCheckin();
  const { settingsData, isGettingSettings } = useSettingsData();
  useEffect(() => setConfirmed(booking?.isPaid ?? false), [booking]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking ?? {};
  const totalPriceIncludeBf =
    settingsData?.breakfastPrice * numGuests * numNights;

  // before breakfast added
  // function handleCheckin() {
  //   if (!confirmed) return;
  //   checkingMutateFn(bookingId);
  // }

  function handleCheckin() {
    if (!confirmed) return;
    if (breakfast) {
      checkingMutateFn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: totalPriceIncludeBf,
          totalPrice: totalPrice + totalPriceIncludeBf,
        },
      });
    } else {
      checkingMutateFn({ bookingId, breakfast: {} });
    }
  }

  if (isLoading || isGettingSettings) return <Spinner />;
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={breakfast}
            onChange={() => {
              setBreakfast((breakfast) => !breakfast);
              setConfirmed(false);
            }}
            disabled={breakfast}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(totalPriceIncludeBf)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmed}
          onChange={() => setConfirmed((checkin) => !checkin)}
          disabled={confirmed}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {breakfast
            ? `${formatCurrency(
                totalPrice + totalPriceIncludeBf
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                totalPriceIncludeBf
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {!isPaid ||
          (breakfast && (
            <Button
              variation="primary"
              size="medium"
              onClick={handleCheckin}
              disabled={!confirmed || isChecking}
            >
              Check in
            </Button>
          ))}
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Row>
  );
}

export default CheckinBooking;
