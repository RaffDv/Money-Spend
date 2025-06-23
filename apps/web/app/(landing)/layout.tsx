import AppBar from "@/components/appBar";
import type { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
	return (
		<section className="grid min-h-screen grid-rows-[auto_1fr_auto] dashed-vertical-lines ">
			<header className="sticky top-0 z-50">
				<AppBar />
			</header>

			<main className="w-full max-w-screen mx-auto">{children}</main>

			{/* <Footer /> */}
		</section>
	);
};

export default layout;
