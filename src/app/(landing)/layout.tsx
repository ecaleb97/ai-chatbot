type Props = {
	children: React.ReactNode;
};

export default function LandingLayout({ children }: Props) {
	return (
		<main className="min-h-screen bg-[#111827] overflow-auto">
			<div className="mx-auto max-w-screen-xl size-full">{children}</div>
		</main>
	);
}
