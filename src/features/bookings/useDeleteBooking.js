import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: deleteBookingMutateFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),

    onSuccess: () => {
      toast.success(`Successfully deleted booking`, {
        icon: "👍",
      });
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error("Something went wrong in deleting booking", {
        icon: "👎",
      });
    },
  });

  return { deleteBookingMutateFn, isLoading, error };
}

export default useDeleteBooking;
