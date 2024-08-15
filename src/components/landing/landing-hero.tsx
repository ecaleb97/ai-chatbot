"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

export function LandingHero() {
	const { isSignedIn } = useAuth();

	return (
		<div className="text-white font-bold py-20 text-center space-y-5 px-4">
			<div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-bold">
				<h1 className="text-black">
					The Best AI Generator for{" "}
					<span
						className="text-transparent bg-clip-text 
						bg-gradient-to-r from-[#F69C0A] via-[#EA5B0D] to-[#EAA909]"
					>
						everything
					</span>
				</h1>
				<div
					className="text-transparent bg-clip-text 
					bg-gradient-to-r from-[#F69C0A] via-[#EA5B0D] to-[#EAA909]"
				>
					<TypewriterComponent
						options={{
							strings: ["Chatbot", "Photo Generation", "Code Generation"],
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</div>
			<div className="text-sm md:text-xl font-light text-[#4B5563]">
				Create content using AI 10x faster
			</div>
			<div>
				<Button asChild className="rounded-full hover:bg-black/80">
					<Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
						Start generating for free
					</Link>
				</Button>
			</div>
			<div className="text-zinc-400 text-xs md:text-sm font-normal">
				No credit card required
			</div>
		</div>
	);
}
