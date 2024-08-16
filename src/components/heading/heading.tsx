import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type HeadingProps = {
	title: string;
	description: string;
	icon: LucideIcon;
	iconColor?: string;
	bgColor?: string;
};

export function Heading({
	title,
	description,
	icon: Icon,
	iconColor,
	bgColor,
}: HeadingProps) {
	return (
		<div className="flex items-center gap-3 mb-8">
			<div className={cn("p-2 w-fit rounded-md", bgColor)}>
				<Icon className={cn("size-10", iconColor)} />
			</div>
			<div>
				<h2 className="text-xl sm:text-2xl text-balance font-medium">
					{title}
				</h2>
				<p className="text-sm text-muted-foreground text-pretty">
					{description}
				</p>
			</div>
		</div>
	);
}
