import type { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
	return (
		<section className="min-h-screen min-w-screen flex items-center justify-center">
			{children}
		</section>
	);
};

export default layout;
