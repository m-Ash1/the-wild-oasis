import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import TableCabinsOperations from "../features/cabins/TableCabinsOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <TableCabinsOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
