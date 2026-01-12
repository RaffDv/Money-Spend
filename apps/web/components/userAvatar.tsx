import type { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { forwardRef } from "react";

interface UserAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
	user: User;
}

const UserAvatar = forwardRef<React.ElementRef<typeof Avatar>, UserAvatarProps>(
	({ user, className, ...props }, ref) => {
		const picture = user?.user_metadata?.picture;
		const username = user?.user_metadata?.username;

		return (
			<Avatar
				ref={ref}
				className={`bg-card-foreground border-[1.5px] border-purple-400 cursor-pointer ${className}`}
				{...props}
			>
				{picture ? (
					<AvatarImage src={picture} alt={username || "User Avatar"} />
				) : (
					<AvatarFallback>
						{username?.substring(0, 1).toUpperCase() || "?"}
					</AvatarFallback>
				)}
			</Avatar>
		);
	},
);

UserAvatar.displayName = "UserAvatar";

export default UserAvatar;
