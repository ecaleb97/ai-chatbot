import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
	return (
		<div>
			<p>Landing Page</p>
			<Button asChild variant="link" className="pl-0">
				<Link href="/sign-in">Login</Link>
			</Button>
			<Button asChild variant="link">
				<Link href="/sign-up">Sign Up</Link>
			</Button>
		</div>
	);
}
