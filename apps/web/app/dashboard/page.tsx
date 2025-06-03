import GlobalErrorHandler from "@/components/globalErrorHandler";
import { authOptions } from "@/lib/auth";
import { api } from "@/lib/constants";
import { getServerSession } from "next-auth";

const Page = async () => {
	const session = await getServerSession(authOptions);
	let protectedData = null;
	try {
		const { data } = await api.get("/auth/protected", {});
		protectedData = data;
	} catch (error) {
		console.error("Erro no servidor ao buscar dados protegidos:", error);
		// Erro tratado no servidor, não quebra a aplicação
	}
	return (
		<>
			<GlobalErrorHandler />
			<section className="max-w-full h-full flex items-center justify-center p-4">
				<div className="flex flex-col bg-secondary h-fit p-4 rounded break-words w-96">
					<h1 className="mb-4">DASHBOARD</h1>
					<div className="break-words hyphens-auto text-wrap">
						{protectedData}
					</div>
					<div>{JSON.stringify(session?.refresh_token)}</div>
					<br />
					<div>{JSON.stringify(session?.access_token)}</div>

					<p>test</p>
				</div>
			</section>
		</>
	);
};

export default Page;
