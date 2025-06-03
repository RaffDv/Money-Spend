// lib/hooks/use-auth.ts
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export function useAuth() {
	const { data: session, status } = useSession();

	const logout = async () => {
		await signOut({
			redirect: false,
			callbackUrl: "/auth/login",
		});
		redirect("/auth/login");
	};

	return {
		user: session?.user,
		isAuthenticated: !!session,
		isLoading: status === "loading",
		logout,
	};
}
