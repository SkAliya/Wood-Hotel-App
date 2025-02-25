import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import ErrorFallback from "../../ui/ErrorFallback";
import Spinner from "../../ui/Spinner";

import CreateEditCabinForm from "./CreateCabinForm";
import { deleteCabin } from "../../services/APICabins";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { image, name, regularPrice, discount, maxCapacity, id } = cabin;
  // console.log(cabin);
  const [formOpen, setFormOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    error,
    isLoading: isDeleting,
    mutate,
  } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    // or direct
    // mutationFn: deleteCabin(id),
    onSuccess: () => {
      // alert("Are you sure, You want to delete Cabin!");
      toast.success("Cabin deletes successfully", {
        icon: "👋",
        iconTheme: {
          primary: "green",
          secondary: "blue",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (e) => {
      // alert(e.message);
      toast.error(e.message, {
        icon: "👎",
        iconTheme: {
          primary: "red",
          secondary: "black",
        },
      });
    },
  });

  if (error) return <ErrorFallback err={error} />;
  if (isDeleting) return <Spinner />;
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => mutate(id)} disabled={isDeleting}>
            Delete
          </button>
          <button onClick={() => setFormOpen((open) => !open)}>
            &nbsp;Edit&nbsp;
          </button>
        </div>
      </TableRow>
      {formOpen && <CreateEditCabinForm cabinData={cabin} />}
    </>
  );
}

export default CabinRow;
