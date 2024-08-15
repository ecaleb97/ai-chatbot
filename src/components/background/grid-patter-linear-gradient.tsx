"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/background/grid-pattern";

export function GridPatternDashed() {
	return (
		<div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
			<p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
				Grid Pattern
			</p>
			<GridPattern
				width={10}
				height={10}
				x={-1}
				y={-1}
				strokeDasharray={"4 2"}
				className={cn(
					"[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
				)}
			/>
		</div>
	);
}
