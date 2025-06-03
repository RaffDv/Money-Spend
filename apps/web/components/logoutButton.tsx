// components/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const LogoutButton = () => {
	return (
		<Button
			onClick={() => signOut({ callbackUrl: "/" })}
			className="text-sm underline"
			variant={"link"}
		>
			Sign Out
		</Button>
	);
};

export default LogoutButton;
