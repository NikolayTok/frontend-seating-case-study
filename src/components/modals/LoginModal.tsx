import React, { useState } from "react";
import { Button } from "../ui/button";
import useUserStore from "../../store/userStore";
import useAppStore from "@/store/appStore";
import * as Dialog from "@radix-ui/react-dialog";

const LoginModal: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const loading = useAppStore((s) => s.loading);
  const isOpenLoginModal = useUserStore((s) => s.openLoginModal);
  const login = useUserStore((s) => s.login);
  const setIsOpenLoginModal = useUserStore((s) => s.setOpenLoginModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await login(email, password);
    }
    setIsOpenLoginModal(false);
  };

  return (
    <Dialog.Root open={isOpenLoginModal} onOpenChange={setIsOpenLoginModal}>
      <Dialog.Trigger asChild>
        <Button variant="secondary">Login</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        {/* Modal Content */}
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">Login</Dialog.Title>
          <Dialog.Description className="text-sm mb-6 text-gray-600">
            Please log in using your credentials.
          </Dialog.Description>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            {/* password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            {/* login submit Button */}
            <Button
              type="submit"
              disabled={loading}
              variant="default"
              className="w-full">
              Login
            </Button>
          </form>
          {/* close Button */}
          <Dialog.Close asChild className="mt-2">
            <Button
              type="submit"
              disabled={loading}
              variant="outline"
              className="w-full">
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginModal;
