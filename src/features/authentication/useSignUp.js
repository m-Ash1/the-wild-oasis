import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/apiAuth";

function useSignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signUpMutator, isLoading: isSigningUp } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Account created successfully");

      // b invalidate users for the table w user for the header

      queryClient.invalidateQueries({ queryKey: [["users"], ["user"]] });
      // navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signUpMutator, isSigningUp };
}

export default useSignUp;
