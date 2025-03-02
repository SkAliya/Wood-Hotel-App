import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Select from "../../ui/Select";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filedName="status"
        fileds={[
          { label: "all", value: "All" },
          { label: "checked-out", value: "Checked out" },
          { label: "checked-in", value: "Checked in" },
          { label: "unconfirmed", value: "Unconfirmed" },
        ]}
        searchParamsToReset={[{ name: "page", value: 1 }]}
      />

      <Select
        filedName="sort"
        fileds={[
          { value: "startDate-desc", type: "date (recent first)" },
          { value: "startDate-asc", type: "date (earlier first)" },
          {
            value: "totalPrice-desc",
            type: "amount (high first)",
          },
          { value: "totalPrice-asc", type: "amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
