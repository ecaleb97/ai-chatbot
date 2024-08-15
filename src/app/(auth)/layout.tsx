type AuthProps = {
	children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthProps) {
	return (
		<div className="min-h-dvh flex items-center justify-center bg-gradient-to-r from-white via-[#F0ECFC] to-[#ECF9EB] overflow-auto">
			{children}
		</div>
	);
}
