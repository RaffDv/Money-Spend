// components/LogoutButton.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { api } from "@/lib/constants";

const LogoutButton = () => {
	const session = useSession();
	const handleSignOut = async () => {
		try {
			console.log(session.data?.access_token);

			await api.post(
				"/auth/logout",
				{},
				{
					headers: {
						Authorization: `Bearer ${session.data?.access_token}`,
					},
				},
			);

			await signOut({
				callbackUrl: "/auth/login",
			});
		} catch (error) {
			console.error("Error during signout:", error);
			// Sign out anyway even if API call fails
			console.log(error);
		}
	};
	return (
		<Button
			onClick={() => handleSignOut()}
			className="text-sm underline"
			variant={"link"}
		>
			Sign Out
		</Button>
	);
};

export default LogoutButton;
