import { belvoSaveAccountLink } from "@/lib/gen";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
	const supabase = await createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		console.debug("Usuário não autenticado via Server Side");
		return redirect("/login");
	}

	const userId: string = user.id;
	console.log("User ID Validado:", userId);

	const searchParams = request.nextUrl.searchParams;

	const link = searchParams.get("link");
	console.log(link, userId);

	const resp = await axios.post("http://localhost:4000/belvo/linkAccount", {
		userId: userId,
		link: link,
	});
	console.log(resp.data);

	return redirect("/dashboard");
}
