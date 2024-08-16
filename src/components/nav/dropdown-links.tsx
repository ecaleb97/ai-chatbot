"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DropdownLinksProps {
	label: string;
	href: string;
	icon: React.ReactNode;
	onClick: () => void;
}

export function DropdownLinks({
	label,
	href,
	icon,
	onClick,
}: DropdownLinksProps) {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			onClick={onClick}
			className={cn(
				`flex w-full items-center gap-2 p-2 rounded-md text-sm transition-all duration-75
				hover:bg-gray-100 active:bg-gray-200`,
				pathname === href && "bg-gray-100",
			)}
		>
			{icon}
			{label}
		</Link>
	);
}
