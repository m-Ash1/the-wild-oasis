import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import useBookings from "./useBookings";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  // Client Side Filtering
  // const [searchParams] = useSearchParams();
  // const filteredBooking =
  //   searchParams.get("status") !== "all"
  //     ? bookings.filter(
  //         (booking) => booking.status === searchParams.get("status")
  //       )
  //     : bookings;
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
