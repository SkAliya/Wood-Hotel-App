import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettingsData() {
  const {
    data: settingsData,
    error: settingsError,
    isLoading: isGettingSettings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settingsData, settingsError, isGettingSettings };
}

export default useSettingsData;
