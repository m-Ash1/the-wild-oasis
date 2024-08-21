import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings successfully edited");

      queryClient.invalidateQueries("settings");
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
}

export default useUpdateSettings;
