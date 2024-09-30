import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isCheckingIn, mutate: checkInMutator } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Could not check in booking");
      console.error(error);
    },
  });
  return { isCheckingIn, checkInMutator };
}

export default useCheckin;
