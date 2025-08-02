"use client";
import type { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { createClient as createSupabase } from "lib/supabase/client";
import { useEffect, useState } from "react";
import { userControllerGetAllProfilesOptions } from "@/lib/client/@tanstack/react-query.gen";
import { createClient } from "@/lib/client/client";

const page = () => {
	const [sessionData, setSessionData] = useState<Session | null>(null);

	const supabase = createSupabase();

	useEffect(() => {
		const getUserData = async () => {
			const { data, error } = await supabase.auth.getSession();

			if (error) {
				console.error("Erro ao buscar usuário:", error);
			} else {
				setSessionData(data.session);
			}
		};

		getUserData();
	}, [supabase]);
	console.log(sessionData);

	const client = createClient({
		baseUrl: process.env.NEXT_PUBLIC_API_URL,
		headers: {
			Authorization: `Bearer ${sessionData?.access_token}`,
		},
	});

	const { data } = useQuery({
		...userControllerGetAllProfilesOptions({
			client: client,
		}),
	});

	return (
		<div>
			<div>
				<h1>ALL USERS</h1>
				{JSON.stringify(data)}
			</div>
		</div>
	);
};

export default page;
