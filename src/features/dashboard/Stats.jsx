/* eslint-disable react/prop-types */
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
function Stats({ recentBookings, confirmedStays, numDays , cabins }) {
  // Number of bookings
  const numOfBookings = recentBookings.length;
  // Total Sales
  const totalSales = recentBookings.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );
  // Check-ins
  const checkIns = confirmedStays.length;

  // Occupancy Rate
  const occupation = confirmedStays.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );

  const numOfCabins = cabins.length;

  const occupancyRate = occupation / (numDays * numOfCabins);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOfBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
