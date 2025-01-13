import { useState } from "react";
import { Button } from "../ui/button";
import { GuestFormModal } from "./GuestFormModal";
import { User } from "@/types/user";
import { useCartStore } from "@/store/cartStore";
import useUserStore from "@/store/userStore";
import * as Dialog from "@radix-ui/react-dialog";

export const ModeSelectModal = () => {
  const setOpenLoginModal = useUserStore((s) => s.setOpenLoginModal);
  const setGuestData = useCartStore((s) => s.setGuestData);
  const setFinalStepOpen = useCartStore((s) => s.setFinalStepOpen);
  const setModeSelectModalOpen = useCartStore((s) => s.setModeSelectModalOpen);
  const modeSelectModalOpen = useCartStore((s) => s.modeSelectModalOpen);
  const [isGuestFormOpen, setGuestFormOpen] = useState(false);

  const handleLoginClick = () => {
    setModeSelectModalOpen(false);
    setOpenLoginModal(true);
  };

  const handleGuestClick = () => {
    setModeSelectModalOpen(false);
    setGuestFormOpen(true);
  };

  const continueFinalStep = (data: User) => {
    setGuestData(data)
    setFinalStepOpen(true)
    setModeSelectModalOpen(false);
  }

  return (
    <>
      <Dialog.Root open={modeSelectModalOpen} onOpenChange={setModeSelectModalOpen}>
        <Dialog.Trigger asChild>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
              How would you like to proceed?
            </Dialog.Title>
            <div className="space-y-4">
              <Button onClick={handleLoginClick} variant="default" className="w-full">
                Login
              </Button>
              <Button onClick={handleGuestClick} variant="secondary" className="w-full">
                Continue as Guest
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {/* guest form */}
      <GuestFormModal
        isGuestFormOpen={isGuestFormOpen}
        setGuestFormOpen={setGuestFormOpen}
        onSubmit={(data) => continueFinalStep(data)}
      />
    </>
  );
};
