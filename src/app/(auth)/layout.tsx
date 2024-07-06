type AuthProps = {
	children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthProps) {
	return (
		<div className="min-h-dvh flex items-center justify-center">{children}</div>
	);
}
