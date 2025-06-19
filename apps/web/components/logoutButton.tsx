// components/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { api } from "@/lib/constants";

// TODO: Make logout button like github
const LogoutButton = () => {
	const handleSignOut = async () => {
		try {
			await api.post("/auth/logout");

			await signOut({
				callbackUrl: "/api/auth/logout",
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
			variant={"outline"}
		>
			Sign Out
		</Button>
	);
};

export default LogoutButton;
