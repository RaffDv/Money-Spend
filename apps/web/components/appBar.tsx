import Image from "next/image";
import { Button } from "./ui/button";
const AppBar = () => {
	return (
		<nav className="max-h-28 flex border-b border-b-white/10 p-4 items-center justify-center bg-background/20 bg-opacity-80 backdrop-blur-md">
			<section className="grid grid-cols-3 w-full items-center mx-20">
				<a href="/" className="flex justify-start space-x-5 items-center">
					<Image
						alt="BankBlend logo"
						src={"/logo.svg"}
						width={36}
						height={36}
					/>
					<span className="font-bold text-2xl">BankBlend</span>
				</a>

				<ul className="flex justify-center gap-x-6">
					{" "}
					{/* Aumentei o gap para um melhor espaçamento */}
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
					<a href="/auth/login">
						<Button variant={"outline"} className="cursor-pointer">
							<span>Login</span>
						</Button>
					</a>
				</div>
			</section>
		</nav>
	);
};

export default AppBar;
