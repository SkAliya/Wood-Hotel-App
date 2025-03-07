import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useBookingsAfterDate() {
  const [searchParams] = useSearchParams();

  // get the params value no.days when filter seletec in dashbord
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // create the isostring formate date queryfun only takes isostring supabase supprts
  // get that date from todays date based exct date using 1 func subDays(todaydate,numdaysback) nd convert to iso

  const queryDate = subDays(new Date(), numDays).toISOString();

  // now pass to queryfunc
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${numDays}`], //refetch everytym the searchparsm changes nd numdays also cneged based on searchparams
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isLoading, bookings };
}

export default useBookingsAfterDate;
