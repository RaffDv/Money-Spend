"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import GoogleIcon from "./icons/googleIcon";

const GoogleLoginButton = () => {
	const supabase = createClient();
	const handleGoogleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_WEB_URL}/auth/callback`,
				queryParams: {
					access_type: "offline",
					prompt: "consent",
				},
			},
		});
	};

	return (
		<Button
			variant="outline"
			className="w-full cursor-pointer flex items-center gap-2"
			onClick={handleGoogleSignIn}
		>
			<GoogleIcon />
			Continue with Google
		</Button>
	);
};

export default GoogleLoginButton;
