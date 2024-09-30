import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkOutMutator, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="danger"
      size="small"
      onClick={() => checkOutMutator(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
