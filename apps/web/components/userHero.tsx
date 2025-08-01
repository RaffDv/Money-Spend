import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
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
import { Separator } from "./ui/separator";

const UserHero = async () => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<div className="flex items-center gap-2 ml-auto">
			{user ? (
				<Sheet>
					<SheetTrigger asChild>
						<UserAvatar user={user} />
					</SheetTrigger>
					<SheetContent className="w-64 rounded-l-2xl">
						<SheetHeader>
							<SheetTitle>{user.user_metadata.fullname}</SheetTitle>
						</SheetHeader>
						<div className="px-4 space-y-3">
							<Separator />
							<LogoutButton />
						</div>
					</SheetContent>
				</Sheet>
			) : (
				<>
					<Link href="/login" className="underline text-sm cursor-pointer">
						Sign In
					</Link>
					<Link href="/register" className="underline text-sm cursor-pointer">
						Sign Up
					</Link>
				</>
			)}
		</div>
	);
};

export default UserHero;
