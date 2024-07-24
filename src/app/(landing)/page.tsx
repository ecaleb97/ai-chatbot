import { LandingContent } from "@/components/landing/landing-content";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingNavbar } from "@/components/landing/landing-navbar";

export default function LandingPage() {
	return (
		<div className="h-full">
			<LandingNavbar />
			<LandingHero />
			<LandingContent />
		</div>
	);
}
