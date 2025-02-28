import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/APICabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import ErrorFallback from "../../ui/ErrorFallback";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, error, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  // FILTER DISCOUNT
  const filedValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filedValue === "all") {
    filteredCabins = cabins;
  }
  if (filedValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  if (filedValue === "without-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  // SORT
  const sortValue = searchParams.get("sort") || "startDate-asc";
  const [filed, type] = sortValue.split("-");
  const flow = type === "asc" ? -1 : 1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (filed === "name") {
      return a[filed].localeCompare(b[filed]) * flow;
    }
    return (a[filed] - b[filed]) * flow;
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback err={error} />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      </Table.TableHeader>
      <Table.TableBody
        cabins={sortedCabins}
        // cabins={filteredCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
