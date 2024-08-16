"use client";

import Link from "next/link";
import Image from "next/image";
import { UserDropdown } from "./user-dropdown";
import { dropdownRoutes } from "@/lib/data";
import { DropdownLinks } from "./dropdown-links";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardNavbar() {
	const pathname = usePathname();

	return (
		<header className="w-full py-4">
			<nav className="flex items-center justify-between">
				<Link href="/">
					<div className="relative size-8">
						<Image src="/logo-ai-project.svg" alt="Logo" fill />
					</div>
				</Link>
				<ul className="hidden sm:flex gap-2 border p-1 px-4 rounded-full text-[#6f737c]">
					{dropdownRoutes.map((route) => (
						<li
							key={route.href}
							className={cn(
								`text-[#6f737c]`,
								pathname === route.href && "text-black",
							)}
						>
							<DropdownLinks href={route.href} label={route.label} />
						</li>
					))}
				</ul>
				<UserDropdown />
			</nav>
		</header>
	);
}
