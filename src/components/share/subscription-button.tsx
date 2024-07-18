"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	isPro: boolean;
};

export function SubscriptionButton({ isPro }: Props) {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/stripe");
			window.location.href = response.data.url;
		} catch (error) {
			toast.error("Something went wrong");
			console.log("BILLING_ERROR", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			disabled={loading}
			variant={isPro ? "default" : "premium"}
			onClick={handleClick}
		>
			{isPro ? "Manage Subscription" : "Upgrade to Pro"}
			{!isPro && <Zap className="ml-2 size-4 fill-white" />}
		</Button>
	);
}
