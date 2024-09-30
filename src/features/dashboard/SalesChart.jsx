/* eslint-disable react/prop-types */
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { useDarkMode } from "../../contexts/DarkmodeContext";
import Heading from "../../ui/Heading";
import DashboardBox from "./DashboardBox";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ recentBookings, numDays }) {
  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDays.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extrasPrice, 0),
    };
  });

  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDays.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDays.at(-1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray={4} />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis unit={"$"} />
         
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            strokeWidth={2}
            name="Extra Sales"
            unit="$"
            fill={colors.extrasSales.fill}
            stackId="1"
          />
           <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
            fill={colors.totalSales.fill}
            stackId="1"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              border: "none",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
