"use client";
import AnimatedPath from "@/components/animatedPath";
import ContentCard from "@/components/contentCard";
import PulsingLine from "@/components/pulsingLine";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import {
	PlugsConnectedIcon,
	ShieldIcon,
	ChartBarIcon,
	DevicesIcon,
	RocketLaunchIcon,
	LightningIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function HomePage() {
	return (
		<div className="space-y-8 mt-20 w-full">
			<section className="relative text-center flex flex-col items-center justify-center ">
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-radial from-indigo-500/30 via-accent/10 to-transparent blur-3xl opacity-60"
					aria-hidden="true"
				/>

				<div className="relative z-10 flex flex-col items-center justify-center">
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
								href="/auth/login"
								className="w-full cursor-pointer flex items-center justify-center text-center space-x-4"
							>
								<Button className="p-4 bg-gradient-to-br from-primary via-chart-3 to-accent w-full cursor-pointer">
									<span>Começar Agora </span>
									<ArrowUpRightIcon size={42} weight="bold" />
								</Button>
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-secondary mt-32 text-center flex flex-col items-center justify-center h-fit p-6">
				<h2 className="font-bold text-xl m-10">
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
			<svg viewBox="0 0 500 500">
				<PulsingLine
					d="M 5 5 v 100 h 100"
					pulseLength={20}
					duration={10}
					delay={1}
				/>
			</svg>
		</div>
	);
}
