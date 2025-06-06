import GlobalErrorHandler from "@/components/globalErrorHandler";
import { authOptions } from "@/lib/auth";
import { api } from "@/lib/constants";
import { getServerSession } from "next-auth";

const Page = async () => {
	try {
		const r = await api.get("/auth/protected");
		// console.log(r.data);
	} catch (error) {}

	const session = await getServerSession(authOptions);
	// console.log(session);

	return (
		<>
			<GlobalErrorHandler />
			<section className="max-w-full h-full flex items-center justify-center p-4">
				<div className="flex flex-col bg-secondary h-fit p-4 rounded break-words w-96">
					<h1 className="mb-4">DASHBOARD</h1>
				</div>
			</section>
		</>
	);
};

export default Page;
