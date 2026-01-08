import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import axios from "axios";
import * as https from "https";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BelvoService {
	constructor(private readonly prisma: PrismaService) {}
	async generateWidgetToken(userId: string, fullname: string) {
		// TODO: turn this not harded coded
		const id = process.env.BELVO_SECRET_ID;
		const password = process.env.BELVO_SECRET_PASSWORD;

		const payload = {
			id,
			password,
			scopes:
				"read_institutions,write_links,read_consents,write_consents,write_consent_callback,delete_consents",
			stale_in: "300d",
			fetch_resources: ["ACCOUNTS", "TRANSACTIONS", "OWNERS"],
			widget: {
				purpose:
					"Soluções financeiras personalizadas oferecidas por meio de recomendações sob medida, visando melhores ofertas de produtos financeiros e de crédito.",
				openfinance_feature: "consent_link_creation",
				callback_urls: {
					success: "http://localhost:3000/api/success",
					exit: "http://localhost:3000/api/exit",
					event: "http://localhost:3000/api/event",
				},
				consent: {
					terms_and_conditions_url: "http://localhost:3000/terms",
					permissions: [
						"REGISTER",
						"ACCOUNTS",
						"CREDIT_CARDS",
						"CREDIT_OPERATIONS",
					],
					identification_info: [
						{
							type: "CPF",
							number: "76109277673",
							name: "Ralph Bragg",
						},
					],
				},
			},
		};
		try {
			console.debug("Requesting Belvo token...");
			const { data } = await axios.post(
				"https://sandbox.belvo.com/api/token/",
				payload,
				{
					headers: { "Content-Type": "application/json" },
					timeout: 30000,
					httpsAgent: new https.Agent({ family: 4 }),
				},
			);
			console.log("Belvo token generated successfully");

			return data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error("Belvo API Error:", error.message, error.response?.data);
			} else {
				console.error("Error generating Belvo token:", error);
			}
			throw new Error("Falha ao gerar o token de acesso da Belvo.");
		}
	}

	async saveAccountLink(userId: string, link: string): Promise<object> {
		console.log(userId, link);

		try {
			await this.prisma.accountLink.create({
				data: {
					profilesUser_id: userId,
					link,
				},
			});

			return { status: 200, message: "Account linked" };
		} catch (error) {
			return {
				status: 400,
				message: "An error ocurried",
				errorMessage: error.message,
			};
		}
	}

	async retriveUserTransactions(linkId: string) {
		const userId = await this.prisma.accountLink.findUnique({
			where: {
				link: linkId,
			},
			select: { profilesUser_id: true },
		});
	}
}
