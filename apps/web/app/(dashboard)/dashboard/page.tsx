"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getAllProfiles, ProfileDto } from "@/lib/gen";
import { ConnectBankButton } from "@/components/connectBankButton";

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
				<ConnectBankButton userId="97132970-7f81-4eeb-bc6f-f7ef4cbb47d4" />
			</div>
		</div>
	);
};

export default page;
