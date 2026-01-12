import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import UserHero from "@/components/userHero";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	return (
		<div className="flex flex-col min-h-screen">
			<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-14 max-w-screen-2xl items-center justify-end px-8">
					<UserHero />
				</div>
			</header>
			<main className="flex-1">{children}</main>
		</div>
	);
};

export default DashboardLayout;
