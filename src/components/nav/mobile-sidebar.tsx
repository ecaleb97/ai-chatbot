"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";

export function MobileSidebar({ apiLimitCount }: { apiLimitCount: number }) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="sm:hidden">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="p-0 md:hidden">
				<SheetHeader className="hidden">
					<SheetTitle className="hidden"></SheetTitle>
					<SheetDescription className="hidden"></SheetDescription>
				</SheetHeader>
				<Sidebar apiLimitCount={apiLimitCount} />
			</SheetContent>
		</Sheet>
	);
}
