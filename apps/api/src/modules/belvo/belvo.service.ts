import { Injectable } from "@nestjs/common";
import Belvo from "belvo";
@Injectable()
export class BelvoService {
	private readonly belvoClient: Belvo;

	constructor() {
		this.belvoClient = new Belvo(
			process.env.BELVO_SECRET_ID,
			process.env.BELVO_SECRET_PASSWORD,
			"sandbox",
		);
	}

	async generateWidgetToken(userId: string) {
		const payload = {
			link: userId,
			scopes: "transactions balances owner",
			widget: {
				branding: {
					company_name: "BankBlend",
				},
			},
		};

		try {
			const token = await this.belvoClient.widgetToken.create(payload);
			return token;
		} catch (error) {
			console.error("Erro ao gerar token da Belvo:", error);
			// É uma boa prática lançar um erro para que quem chamou a função saiba que algo deu errado
			throw new Error("Falha ao gerar o token de acesso da Belvo.");
		}
	}
}
