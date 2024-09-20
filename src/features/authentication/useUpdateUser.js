import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../services/apiAuth";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserMutator, isLoading: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User successfully updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUserMutator, isUpdating };
}

export default useUpdateUser;
