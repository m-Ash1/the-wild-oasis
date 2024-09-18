import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const { data: settings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { settings, isLoadingSettings };
}

export default useSettings;
