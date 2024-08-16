"use client";

import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { dropdownRoutes } from "@/lib/data";
import { DropdownLinks } from "./dropdown-links";

export function UserDropdown() {
	const { user } = useUser();
	const [open, setOpen] = useState(false);

	const handleOpenPopover = () => {
		setOpen((prevState) => !prevState);
	};

	return (
		<div className="relative inline-block pt-1.5">
			<Popover onOpenChange={handleOpenPopover} open={open}>
				<PopoverTrigger className="pb-2">
					<Avatar className="size-8">
						<AvatarImage
							src={user?.imageUrl}
							alt={user?.firstName ?? "User profile"}
							className="size-8"
						/>
						<AvatarFallback className="size-8">
							{user?.firstName?.charAt(0)}
						</AvatarFallback>
					</Avatar>
				</PopoverTrigger>
				<PopoverContent align="end" className="ml-4">
					<div className="w-full flex flex-col space-y-px rounded-md bg-white sm:w-[254px]">
						<div className="cursor-pointer p-2">
							{user?.firstName ? (
								<>
									<p className="truncate text-sm font-medium text-gray-900">
										{user.fullName}
									</p>
									<p className="truncate text-sm text-gray-500">
										{user.emailAddresses[0].emailAddress}
									</p>
								</>
							) : (
								<>
									<p className="truncate text-sm font-medium text-gray-900">
										Test Account
									</p>
									<p className="truncate text-sm text-gray-500">
										{user?.emailAddresses[0].emailAddress}
									</p>
								</>
							)}
						</div>
						{dropdownRoutes.map((route) => (
							<DropdownLinks
								key={route.href}
								label={route.label}
								href={route.href}
								icon={route.icon}
								onClick={handleOpenPopover}
							/>
						))}
						<SignOutButton redirectUrl="/">
							<button
								className="flex w-full items-center gap-2 p-2 rounded-md text-sm transition-all 
								duration-75 hover:bg-gray-100 active:bg-gray-200"
							>
								<LogOut className="size-4" />
								Logout
							</button>
						</SignOutButton>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
