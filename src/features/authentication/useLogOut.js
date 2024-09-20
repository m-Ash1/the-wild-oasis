import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/apiAuth";

function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logOutMutator, isLoading: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logOutMutator, isLoggingOut };
}

export default useLogOut;
