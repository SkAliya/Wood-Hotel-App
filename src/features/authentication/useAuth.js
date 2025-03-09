import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import login from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginMutateFn, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      // queryClient.setQueriesData(["user"], user);
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (e) => {
      toast.error(e.message, {
        icon: "🥲",
      });
    },
  });

  return { loginMutateFn, isLoading };
}

export default useAuth;
