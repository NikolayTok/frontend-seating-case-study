import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { useCartStore } from '@/store/cartStore';
import { SeatInfo } from '@/types/seating';
import { cn } from '@/utils/classMerge';
import React, { useState } from 'react';

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
	seat: SeatInfo;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
	({ seat, className }: SeatProps, ref) => {
		const [isPopoverOpen, setIsPopoverOpen] = useState(false);
		const isInCart = useCartStore((state) => state.isInCart(seat.seatId));
		const ticketTypes = useCartStore((state) => state.ticketTypes);
		const addToCart = useCartStore((state) => state.addToCart);
		const removeFromCart = useCartStore((state) => state.removeFromCart);

		const ticketType = ticketTypes.find((type) => type.id === seat.ticketTypeId) || {
			name: "Unknown",
			price: "N/A",
		};

		const handleCartAction = () => {
			if (isInCart) {
				removeFromCart(seat.seatId);
			} else {
				addToCart(seat.seatId, seat.ticketTypeId, seat.place);
			}
		};

		return (
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger>
					<div
						className={cn(
							"size-9 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-color text-xl",
							isInCart && "bg-green-200",
							isInCart && "hover:bg-green-300",
							className
						)}
						ref={ref}
					>
						<span className="text-xs text-zinc-400 font-medium">{seat.place}</span>
					</div>
				</PopoverTrigger>
				<PopoverContent onMouseLeave={() => setIsPopoverOpen(false)}>
					<div className="flex flex-col items-start">
						<p className="text-sm font-medium text-zinc-800">
							Place: <span className="font-bold">{seat.place}</span>
						</p>
						<p className="text-sm font-medium text-zinc-800">
							Ticket Type: <span className="font-bold">{ticketType.name}</span>
						</p>
						<p className="text-sm font-medium text-zinc-800">
							Price: <span className="font-bold">{ticketType.price} Kč</span>
						</p>
					</div>
					<footer className="flex flex-col mt-3">
						<Button
							onClick={handleCartAction}
							variant={isInCart ? "destructive" : "default"}
							size="sm"
						>
							{isInCart ? "Remove from cart" : "Add to cart"}
						</Button>
					</footer>
				</PopoverContent>
			</Popover>
		);
	}
);

Seat.displayName = "Seat";
