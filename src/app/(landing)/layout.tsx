import { GridPattern } from "@/components/background/grid-pattern";
import { cn } from "@/lib/utils";

type Props = {
	children: React.ReactNode;
};

export default function LandingLayout({ children }: Props) {
	return (
		<div className="min-h-dvh bg-gradient-to-r from-white via-[#F0ECFC] to-[#ECF9EB] overflow-auto">
			<div className="z-[9999] mx-auto max-w-7xl size-full">{children}</div>
			<GridPattern
				width={15}
				height={15}
				x={-1}
				y={-1}
				// strokeDasharray={"4 2"}
				className={cn(
					"[mask-image:radial-gradient(100px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(200px_circle_at_center,white,transparent)] lg:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] z-0",
				)}
			/>
			{/* <GridPattern
        width={15}
        height={15}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      /> */}
		</div>
	);
}
