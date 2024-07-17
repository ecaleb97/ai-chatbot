"use client";

import { ProModal } from "@/components/share/pro-modal";
import { useEffect, useState } from "react";

export function ModalProvider() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<ProModal />
		</>
	);
}
