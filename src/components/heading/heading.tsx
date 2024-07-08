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
		<div className="flex items-center gap-3 mb-8 px-4 lg:px-8">
			<div className={cn("p-2 w-fit rounded-md", bgColor)}>
				<Icon className={cn("size-10", iconColor)} />
			</div>
			<div>
				<h2 className="text-3xl font-bold">{title}</h2>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	);
}
