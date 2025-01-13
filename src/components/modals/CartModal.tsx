import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";
import Checkout from "../Checkout";
import * as Dialog from "@radix-ui/react-dialog";

export const CartModal = () => {
  const cart = useCartStore((state) => state.cart);
  const ticketTypes = useCartStore((state) => state.ticketTypes);
  const cartModalOpen = useCartStore((state) => state.cartModalOpen);
  const totalItems = useCartStore((state) => state.totalTickets());
  const totalPrice = useCartStore((state) => state.totalPrice());
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const setCartModalOpen = useCartStore((state) => state.setCartModalOpen);

  return (
    <>
      <Dialog.Root open={cartModalOpen} onOpenChange={setCartModalOpen}>
        <Dialog.Trigger asChild>
          <Button variant="secondary">Cart</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
              Your Cart
            </Dialog.Title>
            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-2 max-h-[50vh] overflow-y-auto">
                    {cart.map((item, index) => {
                      const ticketType = ticketTypes.find((type) => type.id === item.ticketTypeId);
                      return (
                        <li
                          key={item.seatId}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              Tiket #{index + 1}: Place {item.place} 
                              <span className="text-sm text-gray-600">
                                ({ticketType ? ticketType.name : "Unknown"})
                              </span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Price: {ticketType
                                ? `${ticketType.price} CZK `
                                : "Price not available"}
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromCart(item.seatId)}
                          >
                            Remove
                          </Button>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-medium text-gray-800">
                      Total Items: {totalItems}
                    </p>
                    <p className="font-medium text-gray-800">
                      Total Price: {totalPrice} CZK
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="default" onClick={clearCart}>
                      Clear Cart
                    </Button>
                    <Checkout />
                  </div>
                </>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
