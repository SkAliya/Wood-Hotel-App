import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  console.log(user);
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}

export default useCurrentUser;
