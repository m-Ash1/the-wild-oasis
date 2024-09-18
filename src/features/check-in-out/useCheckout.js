import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

function useCheckout() {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkOutMutator } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error("Could not check in booking");
      console.error(error);
    },
  });
  return { isCheckingOut, checkOutMutator };
}

export default useCheckout;
