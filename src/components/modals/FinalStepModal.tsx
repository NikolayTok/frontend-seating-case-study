import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";
import { CreateOrderPayload } from "@/types/order";
import { User } from "@/types/user";
import { toast } from "react-toastify";
import useAppStore from "@/store/appStore";
import ApiService from "@/service/ApiBaseService";
import useUserStore from "@/store/userStore";
import * as Dialog from "@radix-ui/react-dialog";

export const FinalStepModal = () => {
  const guestData = useCartStore((s) => s.guestData);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const cart = useCartStore((s) => s.cart);
  const eventId = useAppStore((s) => s.eventId);
  const loading = useAppStore((s) => s.loading);
  const finalStepOpen = useCartStore((s) => s.finalStepOpen);
  const user = useUserStore((s) => s.user);
  const setFinalStepOpen = useCartStore((s) => s.setFinalStepOpen);
  const clearCart = useCartStore((s) => s.clearCart);
  const setLoading = useAppStore((s) => s.setLoading);

  const createOrder = async () => {
    const order: CreateOrderPayload = {
      eventId: eventId as string,
      tickets: cart,
      user: user as User || guestData
    }
    try {
      setLoading(true)
      const response = await ApiService.createOrder(order)
      if (response) {
        clearCart()
        toast.success("Order confirmed successfully!");
      }
    } catch {
      toast.error("Failed to confirm order.");
    } finally {
      setLoading(false)
      setFinalStepOpen(false)
    }
  }

  return (
    <Dialog.Root open={finalStepOpen} onOpenChange={setFinalStepOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">Order Summary</Dialog.Title>
          <div className="space-y-4">
            <p>
              <span className="font-bold">Total Price:</span> {totalPrice} Kč
            </p>
            <p>
              <span className="font-bold">Name:</span> {user?.firstName || guestData?.firstName}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user?.email || guestData?.email}
            </p>
          </div>
          <footer className="mt-6 flex justify-center">
            <Button variant="default" onClick={createOrder} disabled={loading}>
              Confirm and Order
            </Button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
