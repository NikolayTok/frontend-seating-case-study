import { useCartStore } from "@/store/cartStore";
import { CartModal } from "./modals/CartModal";
import { FinalStepModal } from "./modals/FinalStepModal";
import { ModeSelectModal } from "./modals/ModeSelectModal";

export default function Checkout() {
  const totalTickets = useCartStore((s) => s.totalTickets());
  const totalPrice = useCartStore((s) => s.totalPrice());

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
      <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
        {/* Total in cart */}
        <div className="flex flex-col">
          <span>Total for {totalTickets} ticket{totalTickets !== 1 ? "s" : ""}</span>
          <span className="text-2xl font-semibold">{totalPrice} CZK</span>
        </div>
        {/* cart modal button */}
        <CartModal />
        {/* mode select modal */}
        <ModeSelectModal />
        {/* final step modal */}
        <FinalStepModal />
      </div>
    </nav>
  );
}
