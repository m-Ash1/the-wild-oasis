/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { deleteCabin } from "../../services/apiCabins";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
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
  } = cabin;

  // Making an instance from the query client
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabinMutator } = useMutation({
    mutationFn: deleteCabin,
    //* hy3ml ll query deh t7dedan refetch fe kol el app 3shan y update el ui b3d el delete
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowEditForm(!showEditForm)}>Edit</button>
          <button
            disabled={isDeleting}
            onClick={() => deleteCabinMutator(cabinID)}
          >
            Delete
          </button>
        </div>
      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
