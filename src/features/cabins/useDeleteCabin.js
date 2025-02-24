import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/APICabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading: isDeleting,
    mutate,
  } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    // or direct
    // mutationFn: deleteCabin(id),
    onSuccess: () => {
      // alert("Are you sure, You want to delete Cabin!");
      toast.success("Cabin deletes successfully", {
        icon: "👋",
        iconTheme: {
          primary: "green",
          secondary: "blue",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
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
  return { isDeleting, mutate, error };
}

export default useDeleteCabin;
