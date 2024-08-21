import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
function useCreatingCabin({ onClose }) {
  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin successfully added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });
  return { isAdding, createCabin };
}

export default useCreatingCabin;
