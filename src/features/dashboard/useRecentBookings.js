import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns/subDays";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last") || 7;

  const date = subDays(new Date(), Number(numDays)).toISOString();

  const { data: recentBookings, isLoading } = useQuery({
    queryKey: ["recentBookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(date),
  });


  return { recentBookings, isLoading, numDays };
}

export default useRecentBookings;
