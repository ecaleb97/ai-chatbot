import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AIAvatar() {
	return (
		<Avatar>
			<AvatarImage src="/logo-ai-project.svg" className="rounded-full object-cover size-7" />
			<AvatarFallback className="rounded-full object-cover size-7">AI</AvatarFallback>
		</Avatar>
	);
}
