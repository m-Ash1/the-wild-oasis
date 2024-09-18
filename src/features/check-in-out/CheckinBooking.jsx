import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import BookingDataBox from "../bookings/BookingDataBox";
import useBooking from "../bookings/useBooking";
import useSettings from "../settings/useSettings";
import useCheckin from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmBreakFast, setConfirmBreakFast] = useState(false);
  const { isLoading, booking } = useBooking();
  const { isCheckingIn, checkInMutator } = useCheckin();
  const { settings, isLoadingSettings } = useSettings();

  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking?.isPaid]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    isPaid,
    totalPrice,
    numGuests,
    hasBreakfast,
    extrasPrice,
    numNights,
  } = booking;

  const totalBreakFast = numGuests * numNights * settings?.breakfastPrice;

  const totalWithBreakfast = totalPrice + totalBreakFast;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (confirmBreakFast) {
      checkInMutator({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: totalBreakFast,
          totalPrice: totalPrice + totalBreakFast,
        },
      });
    } else {
      checkInMutator({ bookingId, breakfast: {} });
    }
  }

  function handleAddBreakfast() {
    setConfirmBreakFast((confirmBreakFast) => !confirmBreakFast);
    setConfirmPaid(false);
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={confirmBreakFast}
            onChange={handleAddBreakfast}
            disabled={isCheckingIn}
            id={"addBreadkfast"}
          >
            Add breakfast for {numGuests} guests for{" "}
            {formatCurrency(totalBreakFast)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id={"confirm"}
        >
          I confirm that {guests.fullName} has paid the total amout of{" "}
          {!confirmBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalWithBreakfast)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(totalBreakFast)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
