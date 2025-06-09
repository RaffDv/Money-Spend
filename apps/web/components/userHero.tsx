import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "./logoutButton";

const UserHero = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className="flex items-center gap-2 ml-auto">
			{session?.user ? (
				<>
					<span>{session.user.name}</span>
					<LogoutButton />
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
