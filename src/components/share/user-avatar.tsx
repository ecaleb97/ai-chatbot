import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
	const { user } = useUser();

	return (
		<Avatar>
			<AvatarImage
				src={user?.imageUrl}
				className=" size-7 rounded-full object-cover"
			/>
			<AvatarFallback className="size-7 rounded-full object-cover">
				{user?.firstName?.charAt(0)}
				{user?.lastName?.charAt(0)}
			</AvatarFallback>
		</Avatar>
	);
}
