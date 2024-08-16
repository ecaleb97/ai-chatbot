"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "@/lib/constants";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
	const router = useRouter();

	return (
		// <div className="p-6">
		// 	<div className="mb-8 space-y-4">
		// 		<h2 className="text-2xl md:text-4xl font-bold">
		// 			Explore the power of AI
		// 		</h2>
		// 		<p className="text-muted-foreground font-light text-sm md:text-lg">
		// 			Chat with the smartest AI - Experience the power of AI
		// 		</p>
		// 	</div>
		// 	<div className="space-y-4">
		// 		{tools.map((tool) => (
		// 			<Card
		// 				onClick={() => router.push(tool.href)}
		// 				key={tool.href}
		// 				className="border-black/5 flex items-center justify-between
		// 				hover:shadow-md transition cursor-pointer p-4"
		// 			>
		// 				<div className="flex items-center gap-4">
		// 					<div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
		// 						<tool.icon className={cn("size-8", tool.color)} />
		// 					</div>
		// 					<div className="font-semibold">{tool.label}</div>
		// 				</div>
		// 				<ArrowRight className="size-5" />
		// 			</Card>
		// 		))}
		// 	</div>
		// </div>
		<DashboardContent />
	);
}
