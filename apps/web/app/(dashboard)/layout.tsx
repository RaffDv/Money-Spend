import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	return <>{children}</>;
};

export default DashboardLayout;