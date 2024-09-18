import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) {
    return <Spinner />;
  }

  // Filter
  const filterValue = searchParams.get("discount");

  const filteredCabins = cabins.filter((cabin) => {
    switch (filterValue) {
      case "with-discount":
        return cabin.discount !== 0;
      case "no-discount":
        return cabin.discount === 0;
      default:
        return cabin;
    }
  });

  // Sort
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  const sortedCabins = filteredCabins.toSorted((a, b) =>
    direction === "asc" ? a[field] - b[field] : b[field] - a[field]
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
