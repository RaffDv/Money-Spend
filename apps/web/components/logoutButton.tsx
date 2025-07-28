"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

// TODO: Make logout button like github
const LogoutButton = () => {
	const supabase = createClient();
	const router = useRouter();
	return (
		<Button
			onClick={async () => {
				await supabase.auth.signOut();
				router.push("/login");
			}}
			className="text-sm underline"
			variant={"outline"}
		>
			Sair
		</Button>
	);
};

export default LogoutButton;
