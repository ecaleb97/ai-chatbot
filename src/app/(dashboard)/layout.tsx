import { Navbar } from "@/components/nav/navbar";
import { Sidebar } from "@/components/nav/sidebar";

type DashboardLayoutProps = {
	children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="min-h-full relative">
			<div className="hidden min-h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-800">
				<div>
					<Sidebar />
				</div>
			</div>
			<main className="md:pl-72">
				<Navbar />
				{children}
			</main>
		</div>
	);
}
