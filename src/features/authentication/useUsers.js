import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiAuth";

function useUsers() {
  const {
    data: profiles,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { profiles, error, isLoading };
}

export default useUsers;
