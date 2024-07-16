import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2, Menu } from "lucide-react";
import { MobileSidebar } from "@/components/nav/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export async function Navbar() {
	const apiLimitCount = await getApiLimitCount();

	return (
		<div className="flex items-center p-4">
			<MobileSidebar apiLimitCount={apiLimitCount} />
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
