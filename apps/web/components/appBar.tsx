import UserHero from "./userHero";

//TODO: Change this to a 'home page navbar' and create a /overview new navbar
const AppBar = () => {
	return (
		<nav className=" max-h-10 flex  bg-card p-4 items-center">
			<div className="space-x-3">
				<a href={"/"}>Home</a>
				<a href={"/dashboard"}>Dashboard</a>
			</div>
			<UserHero />
		</nav>
	);
};

export default AppBar;
