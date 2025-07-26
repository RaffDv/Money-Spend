import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "./logoutButton";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import UserAvatar from "./userAvatar";

const UserHero = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);

	return (
		<div className="flex items-center gap-2 ml-auto">
			{session?.user ? (
				<>
					<Sheet>
						<SheetTrigger asChild>
							<UserAvatar session={session} />
						</SheetTrigger>
						<SheetContent className="w-64 rounded-l-2xl">
							<SheetHeader>
								<SheetTitle>{session.user.fullname}</SheetTitle>
							</SheetHeader>
							<SheetFooter>
								<LogoutButton />
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</>
			) : (
				<>
					<Link href="/auth/login" className="underline text-sm cursor-pointer">
						Sign In
					</Link>
					<Link
						href="/auth/register"
						className="underline text-sm cursor-pointer"
					>
						Sign Up
					</Link>
				</>
			)}
		</div>
	);
};

export default UserHero;
