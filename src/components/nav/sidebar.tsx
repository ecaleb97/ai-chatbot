"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import {
	Code,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	Music,
	Settings,
	VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeTrialCounter } from "./free-trial-counter";

const montserrat = Montserrat({
	weight: "600",
	subsets: ["latin"],
});

const routes = [
	{
		label: "Dashboard",
		icon: LayoutDashboard,
		href: "/dashboard",
		color: "text-sky-500",
	},
	{
		label: "Conversation",
		icon: MessageSquare,
		href: "/conversation",
		color: "text-violet-500",
	},
	{
		label: "Image Generation",
		icon: ImageIcon,
		href: "/image-generation",
		color: "text-pink-700",
	},
	{
		label: "Video Generation",
		icon: VideoIcon,
		href: "/video-generation",
		color: "text-orange-500",
	},
	{
		label: "Music Generation",
		icon: Music,
		href: "/music-generation",
		color: "text-emerald-500",
	},
	{
		label: "Code Generation",
		icon: Code,
		href: "/code-generation",
		color: "text-blue-500",
	},
	{
		label: "Settings",
		icon: Settings,
		href: "/settings",
	},
];

type Props = {
	apiLimitCount: number;
};

export function Sidebar({ apiLimitCount }: Props) {
	const pathname = usePathname();

	return (
		<div className="space-y-4 py-4 flex flex-col justify-between min-h-full bg-gray-800 text-white">
			<div className="px-3 py-2 flex-1">
				<Link href="/dashboard" className="flex items-center mb-14 gap-4">
					<div className="relative size-8">
						<Image src="/logo-ai-project.svg" alt="Logo" fill />
					</div>
					<h1
						className={
							(cn("text-2xl font-bold text-white"), montserrat.className)
						}
					>
						AI Generator
					</h1>
				</Link>
				<nav>
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								`text-sm group flex p-3 w-full text-gray-900
							justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10
							rounded-lg transition`,
								pathname === route.href
									? "text-white bg-white/10"
									: "text-zinc-400",
							)}
						>
							<div className="flex items-center flex-1">
								<route.icon className={cn("size-5 mr-3", route.color)} />
								{route.label}
							</div>
						</Link>
					))}
				</nav>
			</div>
			<FreeTrialCounter apiLimitCount={apiLimitCount} />
		</div>
	);
}
