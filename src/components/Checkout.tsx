import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";

export default function Checkout() {
  const totalTickets = useCartStore((s) => s.totalTickets());
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const isDisabled = totalTickets <= 0
  const setFinalStepOpen = useCartStore((s) => s.setFinalStepOpen);
  const setModeSelectModalOpen = useCartStore((s) => s.setModeSelectModalOpen);
  const setCartModalOpen = useCartStore((s) => s.setCartModalOpen);

  return (
    <>
      {/* Checkout button */}
      {isLoggedIn ? (
        <Button
          disabled={isDisabled}
          variant="secondary"
          onClick={() => {
            setCartModalOpen(false)
            setFinalStepOpen(true)
          }}>
          Continue
        </Button>
      ) : (
        <Button
          variant="secondary"
          disabled={isDisabled}
          onClick={() => {
            setCartModalOpen(false)
            setModeSelectModalOpen(true)
          }}>
          Checkout now
        </Button>)}
    </>
  );
}
