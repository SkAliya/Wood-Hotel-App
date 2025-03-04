import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: checkoutMutateFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Successfully Checked-out Booking #${data.id}`, {
        icon: "👍",
      });
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/bookings?status=checked-out&page=1");
    },
    onError: () => {
      toast.error("Something went wrong in checkout booking", {
        icon: "👎",
      });
    },
  });

  return { checkoutMutateFn, isLoading, error };
}

export default useCheckout;
