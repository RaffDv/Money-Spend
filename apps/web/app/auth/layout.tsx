import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex items-center justify-center h-screen w-screen">
			{children}
		</div>
	);
};

export default AuthLayout;
