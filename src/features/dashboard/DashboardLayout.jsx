import styled from "styled-components";
import useBookingsAfterDate from "./useBookingsAfterDate";
import Spinner from "../../ui/Spinner";
import useCabins from "../cabins/useCabins";
import Stats from "./Stats";
import useStaysAfterDate from "./useStaysAfterDate";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashBoardLayout() {
  const { isLoading: isLoading1, bookings } = useBookingsAfterDate();
  const {
    isLoading: isLoading2,
    stays,
    confiremdStays,
    numDays,
  } = useStaysAfterDate();
  const { cabins, isLoading: isLoading3 } = useCabins();
  console.log(bookings, stays);

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        cabinsCount={cabins.length}
        numDays={numDays}
        confirmedStays={confiremdStays}
      />
      <TodayActivity />

      <DurationChart confiremdStays={confiremdStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashBoardLayout;
