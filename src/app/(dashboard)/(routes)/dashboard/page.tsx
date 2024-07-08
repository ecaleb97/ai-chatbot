"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	ArrowRight,
	Code,
	ImageIcon,
	MessageSquare,
	Music,
	VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
	{
		label: "Conversation",
		icon: MessageSquare,
		color: "text-violet-500",
		bgColor: "bg-violet-500/10",
		href: "/conversation",
	},
	{
		label: "Image Generation",
		icon: ImageIcon,
		color: "text-pink-700",
		bgColor: "bg-pink-700/10",
		href: "/image-generation",
	},
	{
		label: "Video Generation",
		icon: VideoIcon,
		color: "text-orange-500",
		bgColor: "bg-orange-500/10",
		href: "/video-generation",
	},
	{
		label: "Music Generation",
		icon: Music,
		color: "text-emerald-500",
		bgColor: "bg-emerald-500/10",
		href: "/music-generation",
	},
	{
		label: "Code Generation",
		icon: Code,
		color: "text-blue-500",
		bgColor: "bg-blue-500/10",
		href: "/code-generation",
	},
];

export default function DashboardPage() {
	const router = useRouter();

	return (
		<div className="p-6">
			<div className="mb-8 space-y-4">
				<h2 className="text-2xl md:text-4xl font-bold">
					Explore the power of AI
				</h2>
				<p className="text-muted-foreground font-light text-sm md:text-lg">
					Chat with the smartest AI - Experience the power of AI
				</p>
			</div>
			<div className="space-y-4">
				{tools.map((tool) => (
					<Card
						onClick={() => router.push(tool.href)}
						key={tool.href}
						className="border-black/5 flex items-center justify-between
						hover:shadow-md transition cursor-pointer p-4"
					>
						<div className="flex items-center gap-4">
							<div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
								<tool.icon className={cn("size-8", tool.color)} />
							</div>
							<div className="font-semibold">{tool.label}</div>
						</div>
						<ArrowRight className="size-5" />
					</Card>
				))}
			</div>
		</div>
	);
}
