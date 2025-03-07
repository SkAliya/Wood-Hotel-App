import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filedName="last"
      fileds={[
        { label: "7", value: "Last 7 days" },
        { label: "30", value: "Last 30 days" },
        { label: "90", value: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
