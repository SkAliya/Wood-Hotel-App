import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const {
    mutate: checkingMutateFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Successfully Checked-in Booking #${data.id}`, {
        icon: "👍",
      });
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong in checking booking", {
        icon: "👎",
      });
    },
  });

  return { checkingMutateFn, isLoading, error };
}

export default useCheckin;

// before breakfast
// mutationFn: (id) =>
//   updateBooking(id, {
//     status: "checked-in",
//     isPaid: true,
//   }),
// queryClient.invalidateQueries({
//   queryKey: ["bookings"],
// });
