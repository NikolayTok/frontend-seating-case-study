import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
      {/* inner content */}
      <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
        {/* application/author image/logo placeholder */}
        <div className="max-w-[250px] w-full flex">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2BBEE_39r7h1TMqtYyUW58wFxDnkxQgfi3w&s" 
            alt="App/Author Logo"
            className="rounded-md size-12 object-cover"
          />
        </div>
        {/* app/author title/name placeholder */}
        <div className="text-xl font-semibold text-gray-800">
          NFCtron
        </div>
        {/* user menu */}
        <UserMenu />
      </div>
    </nav>
  )
}
