"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getAllProfiles, ProfileDto } from "@/lib/gen";

const page = () => {
	const [sessionData, setSessionData] = useState<Session | null>(null);
	const [profiles, setProfiles] = useState<ProfileDto[] | null>(null);

	const supabase = createClient();

	const getSession = async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		setSessionData(session);
	};
	const fecthAllUsers = async () => {
		const response = await getAllProfiles({
			headers: {
				Authorization: `Bearer ${sessionData?.access_token}`,
			},
		});

		setProfiles(response);
	};

	useEffect(() => {
		if (!sessionData) getSession();
		fecthAllUsers();
	}, [sessionData]);

	return (
		<div>
			<div>
				<h1>ALL USERS</h1>
				{profiles?.map((profile) => (
					<div key={profile.user_id}>{profile.email}</div>
				))}
			</div>
		</div>
	);
};

export default page;
