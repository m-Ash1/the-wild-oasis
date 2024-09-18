import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBookingMutator, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries("bookings");
    },
  });
  return { deleteBookingMutator, isDeleting };
}

export default useDeleteBooking;
