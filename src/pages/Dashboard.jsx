import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashBoardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashBoardLayout />
    </Row>
  );
}

export default Dashboard;
