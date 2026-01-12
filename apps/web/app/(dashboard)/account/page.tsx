import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AccountView from "./account-view";

export default async function AccountPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	return <AccountView user={user} />;
}
