"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";

type Props = {
	apiLimitCount: number;
};

export function FreeTrialCounter({ apiLimitCount = 0 }: Props) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="px-6">
			<Card className="bg-white/10 border-0">
				<CardContent className="py-6 flex flex-col">
					<div className="text-center text-sm text-white mb-4 space-y-2">
						<p>
							{apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
						</p>
						<Progress
							className="h-3"
							value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
						/>
					</div>
					<Button variant="premium">
						Upgrade <Zap className="size-4 ml-2" />
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
