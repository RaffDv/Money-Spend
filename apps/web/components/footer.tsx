import Image from "next/image";

const Footer = () => {
	return (
		<footer className="max-h-28 w-svw md:w-full flex p-4 items-center justify-center bg-background border-t border-t-white/10">
			<div className="grid grid-cols-3 w-full items-center mx-20">
				<a href="#top" className="flex space-x-5 items-center justify-start">
					<Image
						alt="BankBlend Logo"
						src={"/logo.svg"}
						width={24}
						height={42}
					/>
					<span className="text-xl">BankBlend</span>
				</a>
				{/* TODO: Make links functional         */}
				<ul className="flex justify-center text-center gap-x-6 text-sm text-muted-foreground">
					<li>Privacidade</li>
					<li>Termos</li>
					<li>Contato</li>
				</ul>
				<div className="flex text-center justify-end text-sm text-muted-foreground">
					<span>© 2025 BankBlend. Todos os direitos reservados.</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
