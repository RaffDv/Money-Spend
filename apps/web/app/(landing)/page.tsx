"use client";
import ContentCard from "@/components/contentCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import {
	PlugsConnectedIcon,
	ShieldIcon,
	ChartBarIcon,
	DevicesIcon,
	RocketLaunchIcon,
	LightningIcon,
	ShieldCheckIcon,
	BrainIcon,
	HourglassIcon,
	FingerprintIcon,
	SecurityCameraIcon,
	SealCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
	const router = useRouter();
	const iconAnimationVariants: Variants = {
		initial: {
			scale: 1,
		},
		hover: {
			scale: 1.2,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 15,
			},
		},
	};
	return (
		<div className="space-y-8 mt-20 w-svw md:w-full ">
			<section className="relative text-center flex flex-col items-center justify-items-center justify-start h-screen">
				<div className="relative z-10 flex flex-col items-center justify-center animate-slide">
					<div
						className="absolute w-2/3 h-2/3 bg-radial from-indigo-500/30 via-accent/10 to-transparent blur-3xl opacity-60"
						aria-hidden="true"
					/>
					<h1 className="text-6xl font-bold tracking-tight text-white max-w-4xl">
						Seu controle financeiro fácil e descomplicado
					</h1>
					<p className="my-16 leading-8 text-muted-foreground max-w-2xl">
						Conecte suas contas bancárias e tenha todos os seus gastos
						organizados automaticamente. Sem cadastros manuais, sem complicação.
					</p>
					<div className="relative group cursor-pointer hover:scale-110 transition-all w-64">
						<div className="absolute -inset-1 bg-gradient-to-br from-indigo-600/60 via-chart-3/60 to-purple-500/60 cursor-pointer rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
						<div className="relative h-fit ring-1 ring-gray-900/5 rounded-lg leading-none w-full flex items-top justify-start space-x-6">
							<a
								href="/login"
								className="w-full cursor-pointer flex items-center justify-center text-center space-x-4"
							>
								<Button className="p-4 bg-gradient-to-br from-primary via-chart-3 to-accent w-full cursor-pointer">
									{" "}
									<span>Começar Agora </span>{" "}
									<ArrowUpRightIcon size={42} weight="bold" />
								</Button>
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="relative w-full h-fit p-6 my-4 bg-background/90 ackdrop-blur-lg flex items-center justify-center text-center">
				<div className="border z-10 rounded-lg bg-white/5 border-white/25 backdrop-blur-lg w-11/12 space-x-4 p-6 grid grid-rows-[auto_1fr_auto] space-y-10">
					<div className=" flex flex-col items-center justify-center text-center z-20">
						<h2 className="w-full text-3xl font-bold">
							Suas finanças finalmente em ordem
						</h2>
						<p className="w-3/4">
							Cansado de planilhas complicadas e de adivinhar para onde seu
							dinheiro foi? Relaxe, nós entendemos você. Por isso, criamos a
							BankBlend.
						</p>
					</div>
					<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 md:px-10">
						<motion.div
							initial="initial"
							whileHover="hover"
							className="min-w-full min-h-full"
						>
							<ContentCard>
								<ContentCard.Title>
									<motion.div variants={iconAnimationVariants}>
										<ShieldCheckIcon size={36} weight="light" />
									</motion.div>
								</ContentCard.Title>
								<ContentCard.Description>
									Organização Inteligente
								</ContentCard.Description>
								<ContentCard.Content>
									<span>
										Com nossa integração segura, viabilizada pela 
										<strong>Pluggy</strong>, seus gastos são organizados e
										categorizados automaticamente.
									</span>
								</ContentCard.Content>
							</ContentCard>
						</motion.div>
						<motion.div
							initial="initial"
							whileHover="hover"
							className="min-w-full min-h-full"
						>
							<ContentCard>
								<ContentCard.Title>
									<motion.div variants={iconAnimationVariants}>
										<BrainIcon size={36} weight="light" />
									</motion.div>
								</ContentCard.Title>
								<ContentCard.Description>
									Análise com IA
								</ContentCard.Description>
								<ContentCard.Content>
									<span>
										Nosso agente de IA exclusivo analisa seus dados e te diz o
										que os números realmente significam.
									</span>
								</ContentCard.Content>
							</ContentCard>
						</motion.div>
						<motion.div
							initial="initial"
							whileHover="hover"
							className="min-w-full min-h-full"
						>
							<ContentCard>
								<ContentCard.Title>
									<motion.div variants={iconAnimationVariants}>
										<HourglassIcon size={36} color="#ffffff" weight="light" />
									</motion.div>
								</ContentCard.Title>
								<ContentCard.Description>
									Clareza e Mais Tempo
								</ContentCard.Description>
								<ContentCard.Content>
									<span>
										Chega de trabalho manual e incertezas. Ganhe clareza,
										inteligência e tempo para viver seus planos.
									</span>
								</ContentCard.Content>
							</ContentCard>
						</motion.div>
					</div>
					<div className="cursor-default space-y-4">
						<h3 className="text-2xl">
							Com a{" "}
							<strong className=" bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
								BankBlend
							</strong>
							, você está no controle
						</h3>
						<Button
							onClick={() => router.push("/auth/register")}
							className="p-5 w-fit cursor-pointer bg-indigo-500 font-semibold text-lg hover:scale-105 hover:bg-indigo-600"
						>
							Começar Agora!
						</Button>{" "}
					</div>
				</div>
			</section>
			<section className="bg-secondary mt-32 text-center flex flex-col items-center justify-center h-fit p-6">
				<h2 className="font-bold text-3xl m-10">
					Tudo que você precisa para controlar suas finanças!
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-4/5 mt-10">
					<ContentCard>
						<ContentCard.Title>
							<PlugsConnectedIcon color="#FFFFFF" weight="bold" size={36} />
						</ContentCard.Title>

						<ContentCard.Description>
							Integração Bancária Automática
						</ContentCard.Description>

						<ContentCard.Content>
							<span className="text-muted-foreground text-sm">
								Conecte todas as suas contas bancárias e cartões de crédito.
								Seus gastos são categorizados automaticamente, sem você precisar
								fazer nada.
							</span>
						</ContentCard.Content>
					</ContentCard>
					<ContentCard>
						<ContentCard.Title>
							<ShieldIcon size={36} weight="bold" />
						</ContentCard.Title>
						<ContentCard.Description>Segurança Máxima</ContentCard.Description>

						<ContentCard.Content>
							<span className="text-muted-foreground text-sm">
								Criptografia de ponta a ponta e certificações bancárias garantem
								que seus dados estão sempre protegidos.
							</span>
						</ContentCard.Content>
					</ContentCard>
					<ContentCard>
						<ContentCard.Title>
							<RocketLaunchIcon size={36} weight="bold" />
						</ContentCard.Title>
						<ContentCard.Description>
							Metas e Orçamentos
						</ContentCard.Description>
						<ContentCard.Content>
							<span className="text-muted-foreground text-sm">
								Defina metas de gastos por categoria e acompanhe seu progresso.
								Receba alertas quando estiver próximo do limite.
							</span>
						</ContentCard.Content>
					</ContentCard>
					<ContentCard>
						<ContentCard.Title>
							<DevicesIcon size={36} weight="bold" />
						</ContentCard.Title>
						<ContentCard.Description>
							Acesso Multiplataforma
						</ContentCard.Description>
						<ContentCard.Content>
							<span className="text-muted-foreground text-sm">
								Use no computador, tablet ou celular. Seus dados ficam sempre
								sincronizados e acessíveis onde você estiver.
							</span>
						</ContentCard.Content>
					</ContentCard>
					<ContentCard>
						<ContentCard.Title>
							<ChartBarIcon size={32} weight="bold" />
						</ContentCard.Title>
						<ContentCard.Description>
							Dashboard Intuitivo
						</ContentCard.Description>

						<ContentCard.Content>
							<span className="text-muted-foreground text-sm">
								Visualize seus gastos, receitas e saldo em tempo real com
								gráficos claros e fáceis de entender. Tudo em uma única tela.
							</span>
						</ContentCard.Content>
					</ContentCard>
					<ContentCard>
						<ContentCard.Title>
							<LightningIcon size={36} weight="bold" />
						</ContentCard.Title>
						<ContentCard.Description>
							Atualizações em Tempo Real
						</ContentCard.Description>
						<ContentCard.Content>
							<span className="text-muted-foreground text-sm">
								Suas transações aparecem automaticamente assim que são
								processadas pelo banco. Controle financeiro sempre atualizado.
							</span>
						</ContentCard.Content>
					</ContentCard>
				</div>
			</section>
			<section className="bg-background/20 bg-opacity-80 w-full h-fit p-6 grid grid-[auto_1fr_auto] space-y-10 my-20">
				<div className="flex flex-col items-center justify-center h-fit space-y-3">
					<h2 className="text-5xl font-bold w-2/3 text-center h-fit p-3">
						Seus dados estão{" "}
						<p className="bg-indigo-500 text-transparent bg-clip-text p-2">
							100% seguros
						</p>
					</h2>
					<p className="  text-muted-foreground">
						Utilizamos os mesmos protocolos de segurança dos maiores bancos do
						mundo
					</p>
				</div>
				<div className="grid grid-cols-3 text-center gap-8 mx-32">
					<ContentCard>
						<ContentCard.Title>
							<FingerprintIcon size={36} color="#fffafa" weight="light" />
						</ContentCard.Title>
						<ContentCard.Description>
							Criptografia de Ponta
						</ContentCard.Description>
						<ContentCard.Content>
							<span className="text-muted-foreground">
								Todos os dados são criptografados com AES-256, o mesmo padrão
								usado por bancos e governos.
							</span>
						</ContentCard.Content>
					</ContentCard>
					<ContentCard>
						<ContentCard.Title>
							<SecurityCameraIcon size={36} color="#fffafa" weight="light" />
						</ContentCard.Title>
						<ContentCard.Description>
							Acesso Somente Leitura
						</ContentCard.Description>
						<ContentCard.Content>
							<span className="text-muted-foreground">
								Nunca conseguimos mover ou alterar seu dinheiro. Apenas
								visualizamos suas transações.
							</span>
						</ContentCard.Content>
					</ContentCard>
					<ContentCard>
						<ContentCard.Title>
							<SealCheckIcon size={36} color="#fffafa" weight="light" />
						</ContentCard.Title>
						<ContentCard.Description>
							Segurança Nível Bancário
						</ContentCard.Description>
						<ContentCard.Content>
							<span className="text-muted-foreground">
								Em parceria com líderes de mercado em Open Finance, nossa
								plataforma atende às mais rigorosas certificações de segurança,
								as mesmas exigidas pelos grandes bancos.
							</span>
						</ContentCard.Content>
					</ContentCard>
				</div>
				<div className="w-full flex items-center justify-center">
					<div className="flex w-2/3 flex-col items-center justify-center text-center mt-20 border border-border rounded bg-card/20 backdrop-blur-xs p-10 space-y-5">
						<h3 className="font-semibold text-3xl">
							Pronto para transformar sua vida financeira?
						</h3>
						<p className="text-muted-foreground">
							Junte-se a milhares de pessoas que já controlam suas finanças sem
							esforço
						</p>
						<Button className="bg-indigo-500 mt-12 w-1/3 py-6 text-lg hover:scale-105 cursor-pointer hover:bg-indigo-600">
							Começar gratuitamente
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
