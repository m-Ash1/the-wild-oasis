/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useCreatingCabin from "./useCreatingCabin";
import useDeleteCabin from "./useDeleteCabin";

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
  const [showEditForm, setShowEditForm] = useState(false);

  const {
    id: cabinID,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;

  // Making an instance from the query client
  const { isDeleting, deleteCabinMutator } = useDeleteCabin({});
  const { isDuplicating, createCabin: duplicateCabin } =
    useCreatingCabin(false);

  function handleDuplicateCabin() {
    duplicateCabin({
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
      name: `copy of ${name}`,
    });
  }
  return (
    <>
      <TableRow>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button disabled={isDuplicating} onClick={handleDuplicateCabin}>
            <HiSquare2Stack />
          </button>

          <button
            disabled={isDeleting}
            onClick={() => deleteCabinMutator(cabinID)}
          >
            <HiTrash />
          </button>
          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>

      {/* {showEditForm && (
        <CreateCabinForm
          cabinToEdit={cabin}
          setShowEditForm={setShowEditForm}
        />
      )} */}
    </>
  );
}

export default CabinRow;
