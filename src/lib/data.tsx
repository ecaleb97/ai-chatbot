import { MessageSquare, Settings, Code, ImageIcon } from "lucide-react";
import React from "react";

export const dropdownRoutes = [
	{
		label: "Chat",
		href: "/conversation",
		icon: <MessageSquare className="size-4" />,
	},
	{
		label: "Image",
		href: "/image-generation",
		icon: <ImageIcon className="size-4" />,
	},
	{
		label: "Code",
		href: "/code-generation",
		icon: <Code className="size-4" />,
	},
	{
		label: "Settings",
		href: "/settings",
		icon: <Settings className="size-4" />,
	},
];
