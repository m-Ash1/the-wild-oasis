import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

function useAddBreakFast() {
  const queryClient = useQueryClient();
  const { isLoading: isAddingBreakFast, mutate: addingBreakFastMutator } =
    useMutation({
      mutationFn: ({ bookingId, totalBreakFast, totalWithBreakfast }) =>
        updateBooking(bookingId, {
          hasBreakfast: true,
          extrasPrice: totalBreakFast,
          totalPrice: totalWithBreakfast,
        }),
      onSuccess: (data) => {
        toast.success(`Breakfast added to booking ${data.id}`);
        queryClient.invalidateQueries({ active: true });
      },
    });
  return { addingBreakFastMutator, isAddingBreakFast };
}

export default useAddBreakFast;
