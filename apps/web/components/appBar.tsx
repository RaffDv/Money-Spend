import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import UserHero from "./userHero";

const AppBar = () => {
	return (
		<div className=" max-h-10 flex  bg-card p-4">
			<div className="space-x-3">
				<Link href={"/"}>Home</Link>
				<Link href={"/dashboard"}>Dashboard</Link>
			</div>
			<UserHero />
		</div>
	);
};

export default AppBar;
