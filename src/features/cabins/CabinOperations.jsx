import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Select from "../../ui/Select";

function CabinOperations() {
  return (
    <TableOperations>
      <Filter
        filedName="discount"
        fileds={[
          { label: "all", value: "All" },
          { label: "with-discount", value: "With Discount" },
          { label: "without-discount", value: "Without Discount" },
        ]}
      />
      <Select
        filedName="sort"
        fileds={[
          { value: "name-asc", type: "A-Z" },
          { value: "name-dec", type: "Z-A" },
          { value: "regularPrice-asc", type: "Price(High-Low)" },
          { value: "regularPrice-dec", type: "Price(Low-High)" },
          { value: "maxCapacity-asc", type: "Capacity(High-Low)" },
          { value: "maxCapacity-dec", type: "Capacity(Low-High)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinOperations;
