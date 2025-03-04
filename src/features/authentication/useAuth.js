import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import login from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";

function useAuth() {
  const navigate = useNavigate();
  const {
    mutate: loginMutateFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      navigate("/dashboard");
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
