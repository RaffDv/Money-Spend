import GlobalErrorHandler from "@/components/globalErrorHandler";
import { authOptions } from "@/lib/auth";
import { api } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

const Page = async () => {
	try {
		const cStore = await cookies();

		const access_token = cStore.get("access_token");

		const r = await api.get("/auth/protected", {
			headers: {
				Cookie: `${access_token?.name}=${access_token?.value};`,
			},
		});
		if (r.status !== 200) {
			console.error(r.data);
		}

		console.log("response from protected: ", r.data);
	} catch (error) {
		console.error(error);
	}

	return (
		<>
			<GlobalErrorHandler />
			<section className="max-w-full h-full flex items-center justify-center p-4">
				<div className="flex flex-col bg-secondary h-fit p-4 rounded break-words w-96">
					<h1 className="mb-4">DASHBOARD</h1>
					{/* <span>{session?.refresh_token}</span> */}
				</div>
			</section>
		</>
	);
};

export default Page;
