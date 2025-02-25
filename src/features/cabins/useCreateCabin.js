import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatEditCabin } from "../../services/APICabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();
  // const { reset } = useForm();

  const { error, isLoading, mutate } = useMutation({
    mutationFn: creatEditCabin,
    onSuccess: () => {
      // alert("Are you sure, You want to delete Cabin!");
      toast.success("Cabin created successfully", {
        icon: "👍",
        iconTheme: {
          primary: "green",
          secondary: "blue",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset();
    },
    onError: (e) => {
      // alert(e.message);
      toast.error(e.message, {
        icon: "👎",
        iconTheme: {
          primary: "red",
          secondary: "black",
        },
      });
    },
  });
  return { error, isLoading, mutate };
}

export default useCreateCabin;
