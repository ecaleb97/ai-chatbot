"use client";

import Link from "next/link";

interface DropdownLinksProps {
	label: string;
	href: string;
	icon?: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

export function DropdownLinks({
	label,
	href,
	icon,
	onClick,
}: DropdownLinksProps) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className="flex w-full items-center gap-2 p-2 rounded-md text-sm transition-all duration-75"
		>
			{icon}
			{label}
		</Link>
	);
}
