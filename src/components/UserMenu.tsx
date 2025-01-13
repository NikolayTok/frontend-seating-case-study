import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import LoginModal from "./modals/LoginModal";
import useUserStore from "@/store/userStore";

export default function UserMenu() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const fullName = `${user?.firstName} ${user?.lastName}`

  return (
    <div className="max-w-[250px] w-full flex justify-end">
      {
        isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`} />
                    <AvatarFallback>{user?.firstName[0]}{user?.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">{fullName}</span>
                    <span className="text-xs text-zinc-500">{user?.email}</span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px] bg-white rounded-md shadow-lg p-2 border border-gray-200">
              <DropdownMenuLabel className="px-3 py-2 text-sm font-medium text-gray-700">
                {fullName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="h-px bg-gray-200 my-2" />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={logout}
                  className="px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginModal />
        )
      }
    </div>
  )
}
