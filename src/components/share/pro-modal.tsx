import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { tools } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export function ProModal() {
	const { isOpen, onCloseModal } = useProModal();
	const [loading, setLoading] = useState(false);

	const handleSubscribe = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/stripe");
			window.location.href = response.data.url;
		} catch (error) {
			toast.error("Something went wrong");
			console.error(error, "STRIPE_CLIENT_ERROR");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onCloseModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
						<div className="flex items-center gap-x-2 font-bold py-1">
							Upgrade to AI Generator
							<Badge className="uppercase text-sm py-1" variant="premium">
								Pro
							</Badge>
						</div>
					</DialogTitle>
					<div className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
						{tools.map((tool) => (
							<Card
								key={tool.label}
								className="p-3 border-black/5 flex items-center
								justify-between"
							>
								<div className="flex items-center gap-x-4">
									<div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
										<tool.icon className={cn("size-6", tool.color)} />
									</div>
									<span className="text-sm font-semibold">{tool.label}</span>
								</div>
								<Check className="text-primary size-5" />
							</Card>
						))}
					</div>
				</DialogHeader>
				<DialogFooter>
					<Button
						disabled={loading}
						size={"lg"}
						variant={"premium"}
						className="w-full"
						onClick={handleSubscribe}
					>
						Upgrade
						<Zap className="size-4 ml-2 fill-white" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
