import { Navbar } from "@/components/nav/navbar";
import { Sidebar } from "@/components/nav/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

type DashboardLayoutProps = {
	children: React.ReactNode;
};

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	const apiLimitCount = await getApiLimitCount();
	const isPro = await checkSubscription();

	return (
		<div className="min-h-full relative">
			<div className="hidden min-h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-800">
				<div>
					<Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
				</div>
			</div>
			<main className="md:pl-72">
				<Navbar />
				{children}
			</main>
		</div>
	);
}
