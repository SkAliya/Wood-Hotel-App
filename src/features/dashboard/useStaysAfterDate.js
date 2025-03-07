import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useStaysAfterDate() {
  const [searchParams] = useSearchParams();

  // get the params value no.days when filter seletec in dashbord
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // create the isostring formate date queryfun only takes isostring supabase supprts
  // get that date from todays date based exct date using 1 func subDays(todaydate,numdaysback) nd convert to iso

  const queryDate = subDays(new Date(), numDays).toISOString();

  // now pass to queryfunc
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`], //refetch everytym the searchparsm changes nd numdays also cneged based on searchparams
  });

  const confiremdStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { isLoading, stays, confiremdStays, numDays };
}

export default useStaysAfterDate;
