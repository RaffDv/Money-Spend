"use client";
import { Button } from "@/components/ui/button";
import GoogleIcon from "./icons/googleIcon";

const GoogleLoginButton = () => {
	const handleGoogleSignIn = () => {
		// This will redirect to your backend Google OAuth endpoint
		window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;
	};

	return (
		<Button
			variant="outline"
			className="w-full flex items-center gap-2"
			onClick={handleGoogleSignIn}
		>
			<GoogleIcon />
			Continue with Google
		</Button>
	);
};

export default GoogleLoginButton;
