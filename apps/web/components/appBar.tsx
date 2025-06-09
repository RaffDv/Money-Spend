import UserHero from "./userHero";

const AppBar = () => {
	return (
		<div className=" max-h-10 flex  bg-card p-4 items-center">
			<div className="space-x-3">
				<a href={"/"}>Home</a>
				<a href={"/dashboard"}>Dashboard</a>
			</div>
			<UserHero />
		</div>
	);
};

export default AppBar;
