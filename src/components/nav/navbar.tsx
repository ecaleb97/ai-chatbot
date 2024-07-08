import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2, Menu } from "lucide-react";
import { MobileSidebar } from "@/components/nav/mobile-sidebar";

export function Navbar() {
	return (
		<div className="flex items-center p-4">
			<MobileSidebar />
			<div className="flex w-full items-center justify-end">
				<ClerkLoading>
					<Loader2 className="animate-spin text-muted-foreground" />
				</ClerkLoading>
				<ClerkLoaded>
					<UserButton />
				</ClerkLoaded>
			</div>
		</div>
	);
}
