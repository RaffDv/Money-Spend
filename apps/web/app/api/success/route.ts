import { belvoSaveAccountLink } from "@/lib/gen";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
	const supabase = await createClient();

	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (error || !session?.user) {
		console.debug("Usuário não autenticado via Server Side");
		return redirect("/login");
	}

	const userId: string = session.user.id;
	const token = session.access_token;

	const searchParams = request.nextUrl.searchParams;

	const link = searchParams.get("link");

	try {
		const resp = await axios.post(
			"http://localhost:4000/belvo/linkAccount",
			{
				userId: userId,
				link: link,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		console.log(resp.data);
	} catch (err) {
		console.error("Erro ao vincular conta:", err);
		// Opcional: Redirecionar para erro ou tratar
	}

	return redirect("/account");
}
