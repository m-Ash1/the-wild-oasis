import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns/subDays";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last") || 7;

  const date = subDays(new Date(), Number(numDays)).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(date),
  });

  const confirmedStays = stays?.filter(
    (booking) =>
      booking.status === "checked-in" || booking.status === "checked-out"
  );

  return { confirmedStays, isLoading };
}

export default useRecentStays;
