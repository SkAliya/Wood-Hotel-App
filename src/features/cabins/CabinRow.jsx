import { useState } from "react";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import ErrorFallback from "../../ui/ErrorFallback";
import Spinner from "../../ui/Spinner";

import CreateEditCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { IoCopy } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import useCreateCabin from "./useCreateCabin";

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
  const [formOpen, setFormOpen] = useState(false);
  const { image, name, regularPrice, discount, maxCapacity, id, description } =
    cabin;
  // console.log(cabin);

  // custom hook
  const { isDeleting, mutate, error: deleteCabinError } = useDeleteCabin();
  const {
    error: copyCabinError,
    isLoading: isCopying,
    mutate: copyCabin,
  } = useCreateCabin();

  function handleCopyCabin() {
    copyCabin({
      name: `Copy of ${name}`,
      regularPrice,
      discount,
      maxCapacity,
      description,
      image,
    });
  }

  if (deleteCabinError || copyCabinError) return <ErrorFallback />;
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
          <button onClick={() => handleCopyCabin()} disabled={isCopying}>
            <IoCopy />
          </button>
          <button onClick={() => mutate(id)} disabled={isDeleting}>
            <MdDelete />
          </button>
          <button onClick={() => setFormOpen((open) => !open)}>
            <MdModeEdit />
          </button>
        </div>
      </TableRow>
      {formOpen && <CreateEditCabinForm cabinData={cabin} />}
    </>
  );
}

export default CabinRow;
