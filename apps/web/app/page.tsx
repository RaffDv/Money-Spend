"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Page = () => {
	return (
		<div>
			<Button onClick={async () => await signOut()}>Sign Out</Button>
		</div>
	);
};

export default Page;
