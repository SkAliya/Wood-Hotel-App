import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("status") || "all";
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // FILTER
  const filterBy =
    !filteredValue || filteredValue === "all"
      ? null
      : { type: "status", filterType: filteredValue, method: "eq" };

  // SORT
  const sortValue = searchParams.get("sort") || "startDate-desc";
  const [sortType, direction] = sortValue.split("-");
  const sortBy =
    !sortValue || sortValue === "startDate-desc"
      ? null
      : { sortType, direction };

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filterBy, sortBy, page],
    // queryFn: getBookings,
    queryFn: () => getBookings({ filterBy, sortBy, page }),
  });
  // console.log(bookings, count);

  // PAGINATION
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterBy, sortBy, page + 1],
      queryFn: () => getBookings({ filterBy, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterBy, sortBy, page - 1],
      queryFn: () => getBookings({ filterBy, sortBy, page: page - 1 }),
    });

  return { bookings, error, isLoading, count };
}
