import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as apiUpdateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const {
    error: settingError,
    isLoading: isSettingUpdating,
    mutate: updateSetting,
  } = useMutation({
    mutationFn: apiUpdateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully", {
        icon: "👍",
        iconTheme: {
          primary: "green",
          secondary: "blue",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (e) => {
      toast.error(e.message, {
        icon: "👎",
        iconTheme: {
          primary: "red",
          secondary: "black",
        },
      });
    },
  });
  return { settingError, isSettingUpdating, updateSetting };
}

export default useUpdateSetting;
