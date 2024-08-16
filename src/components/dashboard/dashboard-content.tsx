"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { tools } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardContent() {
	const router = useRouter();

	return (
		<main className="sm:pt-8">
			<div className="space-y-4 mb-8">
				<h2 className="text-2xl sm:text-4xl text-balance">
					Explore the power of AI
				</h2>
				<p className="text-muted-foreground font-light text-sm sm:text-base text-pretty">
					Chat with the smartest AI - Experience the power of AI
				</p>
			</div>
			<div className="space-y-4">
				{tools.map((tool) => (
					<Card
						onClick={() => router.push(tool.href)}
						key={tool.href}
						className="border-black/5 flex items-center justify-between
						hover:shadow-sm transition cursor-pointer p-4"
					>
						<div className="flex items-center gap-4">
							<div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
								<tool.icon className={cn("size-8", tool.color)} />
							</div>
							<div className="font-medium">{tool.label}</div>
						</div>
						<ArrowRight className="size-5" />
					</Card>
				))}
			</div>
		</main>
	);
}
