import type { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
	return (
		<section className="min-h-screen min-w-screen bg-accent-foreground flex items-center justify-center">
			{children}
		</section>
	);
};

export default layout;
