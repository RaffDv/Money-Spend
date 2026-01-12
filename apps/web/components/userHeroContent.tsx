"use client";

import Link from "next/link";
import LogoutButton from "./logoutButton";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from "./ui/sheet";
import UserAvatar from "./userAvatar";
import { Separator } from "./ui/separator";
import { LayoutDashboard, UserRoundCog } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function UserHeroContent({ user }: { user: User | null }) {
	if (!user) {
		return (
			<>
				<Link href="/login" className="underline text-sm cursor-pointer">
					Sign In
				</Link>
				<Link href="/register" className="underline text-sm cursor-pointer">
					Sign Up
				</Link>
			</>
		);
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<UserAvatar user={user} />
			</SheetTrigger>
			<SheetContent
				className="w-64 rounded-l-2xl"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader>
					<SheetTitle>{user.user_metadata.fullname}</SheetTitle>
				</SheetHeader>
				<div className="px-4 space-y-3">
					<Separator />
					<div className="px-4 py-2 flex flex-col space-y-3">
						<SheetClose asChild>
							<button
								type="button"
								className="text-md  cursor-pointer text-start space-x-2 flex justify-start items-center hover:underline underline-offset-2 "
							>
								<Link href="/dashboard" className="flex items-center gap-1">
									<LayoutDashboard />
									Dashboard
								</Link>
							</button>
						</SheetClose>
						<SheetClose asChild>
							<button
								type="button"
								className=" cursor-pointer text-start space-x-2 flex justify-start items-center hover:underline underline-offset-2"
							>
								<Link href="/account" className="flex items-center gap-1">
									<UserRoundCog /> Conta
								</Link>
							</button>
						</SheetClose>
						<SheetClose asChild>
							<LogoutButton />
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
