"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LogoutButton = () => {
	const supabase = createClient();
	const router = useRouter();
	return (
		<button
			type="button"
			onClick={async () => {
				await supabase.auth.signOut();
				router.push("/login");
			}}
			className="text-sm cursor-pointer text-start space-x-2 flex justify-start items-center "
		>
			<LogOut /> <span>Sair</span>
		</button>
	);
};

export default LogoutButton;
