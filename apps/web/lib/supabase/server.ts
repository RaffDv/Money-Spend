import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
	process.env.SUPABASE_PROJECT_URL as string,
	process.env.SUPABASE_AUTH_PUB_KEY as string,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false,
		},
	},
);
