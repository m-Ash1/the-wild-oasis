import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingMutator, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries("bookings");
    },
  });
  return { deleteBookingMutator, isDeleting };
}

export default useDeleteBooking;
