import type { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ session }:{session:Session}) => (
    <>
        <Avatar className="bg-card-foreground border border-purple-400 cursor-pointer">
            {session?.user && session?.user?.pictureURL ? (
                <AvatarImage src={session.user.pictureURL} />
            ) : (
                <AvatarFallback>
                    {session.user.username.substring(0, 1)}
                </AvatarFallback>
            )}
        </Avatar>
    </>
);
export default UserAvatar;
