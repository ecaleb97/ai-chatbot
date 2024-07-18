import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const tools = [
	{
		label: "Conversation",
		icon: MessageSquare,
		color: "text-violet-500",
		bgColor: "bg-violet-500/10",
		href: "/conversation",
	},
	{
		label: "Image Generation",
		icon: ImageIcon,
		color: "text-pink-700",
		bgColor: "bg-pink-700/10",
		href: "/image-generation",
	},
	{
		label: "Video Generation",
		icon: VideoIcon,
		color: "text-orange-500",
		bgColor: "bg-orange-500/10",
		href: "/video-generation",
	},
	{
		label: "Music Generation",
		icon: Music,
		color: "text-emerald-500",
		bgColor: "bg-emerald-500/10",
		href: "/music-generation",
	},
	{
		label: "Code Generation",
		icon: Code,
		color: "text-blue-500",
		bgColor: "bg-blue-500/10",
		href: "/code-generation",
	},
];

export const MAX_FREE_COUNTS = 5;
