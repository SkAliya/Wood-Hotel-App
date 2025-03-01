import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("status") || "all";

  const filterBy =
    !filteredValue || filteredValue === "all"
      ? null
      : { type: "status", filterType: filteredValue, method: "eq" };

  const sortValue = searchParams.get("sort") || "startDate-desc";
  const [sortType, direction] = sortValue.split("-");
  const sortBy =
    !sortValue || sortValue === "startDate-desc"
      ? null
      : { sortType, direction };

  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filterBy, sortBy],
    // queryFn: getBookings,
    queryFn: () => getBookings({ filterBy, sortBy }),
  });

  return [bookings, error, isLoading];
}
