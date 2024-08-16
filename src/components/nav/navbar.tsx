import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { MobileSidebar } from "@/components/nav/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function Navbar() {
	const apiLimitCount = await getApiLimitCount();
	const isPro = await checkSubscription();

	return (
		<div className="flex items-center p-4">
			<MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
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
