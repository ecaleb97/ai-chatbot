"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { montserrat } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
	const { isSignedIn } = useAuth();

	return (
		<nav className="p-4 bg-transparent flex items-center justify-between gap-2">
			<Link href="/" className="flex items-center">
				<div className="relative size-8 mr-4">
					<Image src="/logo-ai-project.svg" alt="Logo" fill />
				</div>
				<h1
					className={cn(
						"text-[1rem] sm:text-2xl font-bold text-white",
						montserrat.className,
					)}
				>
					AI Generator
				</h1>
			</Link>
			<div>
				<Button asChild variant="outline" className="rounded-full">
					<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>Get Started</Link>
				</Button>
			</div>
		</nav>
	);
}
