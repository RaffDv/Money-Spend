// app/components/userHero.tsx (ou qualquer lugar que esteja em /app e não tenha "use client")
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
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
					<Link href="/auth/login" className="underline text-sm">
						Sign In
					</Link>
					<Link href="/auth/register" className="underline text-sm">
						Sign Up
					</Link>
				</>
			)}
		</div>
	);
};

export default UserHero;
