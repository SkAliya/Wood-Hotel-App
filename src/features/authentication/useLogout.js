import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logoutMutateFn, isLoading } = useMutation({
    mutationKey: ["user"],
    mutationFn: logout,
    onSuccess: () => {
      //here we r only removed 'user' from cach if u want remove all then removeQueries()
      queryClient.removeQueries("user");
      navigate("/login", { replace: true });
    },
  });
  return { logoutMutateFn, isLoading };
}

export default useLogout;
