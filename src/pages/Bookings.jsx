import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </Row>
  );
}

export default Bookings;
