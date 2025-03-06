import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    error,
    isLoading: isUpdating,
    mutate: updateUserMutFn,
  } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("Account Successfully Updated", {
        icon: "👍",
      });
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
    },
    onError: (e) => {
      toast.error(e.message, {
        icon: "👎",
      });
    },
  });
  return { error, isUpdating, updateUserMutFn };
}

export default useUpdateUser;
