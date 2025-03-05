import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const { mutate: signUpMutateFn, isLoading } = useMutation({
    // mutationFn: ({ email, password, fullName }) =>
    //   signUp({ email, password, fullName }),
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(
        "Account successfull created,Please verify new account from the user's email address"
      );
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Unable to sign up");
    },
  });

  return { signUpMutateFn, isLoading };
}

export default useSignUp;
