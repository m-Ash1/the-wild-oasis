import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

function useDeleteCabin() {
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
  return { isDeleting, deleteCabinMutator };
}

export default useDeleteCabin;
