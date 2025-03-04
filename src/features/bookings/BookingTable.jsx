import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";
import PaginationCom from "../../ui/Pagination";
import Modal from "../../ui/Modal";

function BookingTable() {
  const { bookings, error, isLoading, count } = useBookings();
  // console.log(bookings);

  if (!bookings?.length) return <Empty resource="bookings" />;
  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback err={error} />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.TableHeader>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.TableHeader>

        <Table.TableBody
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <PaginationCom count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
