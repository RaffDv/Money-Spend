import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";
import LogoutButton from "./logoutButton";

const AppBar = async () => {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	console.log(user.data.user);

	return (
		<nav className="max-h-28 w-svw md:w-full flex border-b border-b-white/10 p-4 items-center justify-center bg-background/20 bg-opacity-80 backdrop-blur-md">
			<section className="grid grid-cols-3 w-full items-center mx-20">
				<a href="/" className="flex justify-start space-x-5 items-center">
					<Image
						alt="BankBlend logo"
						src={"/logo.svg"}
						width={24}
						height={41}
					/>
					<span className="font-bold text-2xl">BankBlend</span>
				</a>

				<ul className="flex justify-center gap-x-6">
					{" "}
					<li className="text-foreground hover:underline hover:text-white/80 transition-colors cursor-pointer">
						Produto
					</li>
					<li className="text-foreground hover:underline hover:text-white/80 transition-colors cursor-pointer">
						Segurança
					</li>
					<li className="text-foreground hover:underline hover:text-white/80 transition-colors cursor-pointer">
						Preços
					</li>
				</ul>

				<div className="flex justify-end">
					{!user.data.user ? (
						<a href="/login">
							<Button variant={"outline"} className="cursor-pointer">
								<span>Login</span>
							</Button>
						</a>
					) : (
						<div className="border-2 space-x-3 border-gray-400 p-2 rounded-xl">
							<span>{user.data.user.user_metadata.username}</span>
							<LogoutButton />
						</div>
					)}
				</div>
			</section>
		</nav>
	);
};

export default AppBar;
