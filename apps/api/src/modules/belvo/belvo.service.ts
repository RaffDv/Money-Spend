import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import axios from "axios";
import * as https from "node:https";
import { PrismaService } from "../prisma/prisma.service";
import { Transaction } from "src/utils/types/transaction.type";
import { Prisma } from "generated/prisma";

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
							number: "96644087000",
							name: "Janice Santana Matos",
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

	async retrieveUserTransactions(linkId: string) {
		try {
			const linkRecord = await this.prisma.accountLink.findUnique({
				where: {
					link: linkId,
				},
				select: { profilesUser_id: true },
			});

			if (!linkRecord) {
				console.error(`Link ${linkId} not found in database.`);
				throw new UnprocessableEntityException("Link not found.");
			}

			const userId = linkRecord.profilesUser_id;

			const basicAuth = Buffer.from(
				`${process.env.BELVO_SECRET_ID}:${process.env.BELVO_SECRET_PASSWORD}`,
			).toString("base64");

			const headers = {
				Authorization: `Basic ${basicAuth}`,
				"Content-Type": "application/json",
			};

			type ResponseDataType = {
				count: number;
				next: string | null;
				previous: null | string;
				results: Transaction[];
			};

			let nextUrl: string | null =
				`${process.env.BELVO_URL}/api/transactions/?page=1&link=${linkId}&page_size=1000`;

			while (nextUrl) {
				console.log(`Fetching transactions from: ${nextUrl}`);
				const { data } = await axios.get<ResponseDataType>(nextUrl, {
					headers,
				});

				const transactionsToSave: Prisma.transactionsCreateManyInput[] =
					data.results.map((transaction: Transaction) => ({
						profilesUser_id: userId,
						type: transaction.type,
						account_id: transaction.account.id,
						amount: transaction.amount,
						category: transaction.category,
						currency: transaction.currency,
						description: transaction.description,
						external_id: transaction.id,
						status: transaction.status,
						transacted_at: new Date(transaction.transacted_at),
						value_date: transaction.value_date,
					}));

				if (transactionsToSave.length > 0) {
					await this.prisma.transactions.createMany({
						data: transactionsToSave,
						skipDuplicates: true,
					});
				}

				nextUrl = data.next;
			}
			console.log("Transactions retrieved and saved successfully.");
		} catch (error) {
			console.error("Error retrieving user transactions:", error.data);
			throw new UnprocessableEntityException(
				"Failed to retrieve transactions.",
			);
		}
	}

	async manualHistoricalUpdateTrigger(linkId: string) {
		const basicAuth = Buffer.from(
			`${process.env.BELVO_SECRET_ID}:${process.env.BELVO_SECRET_PASSWORD}`,
		).toString("base64");

		const headers = {
			Authorization: `Basic ${basicAuth}`,
			"Content-Type": "application/json",
		};

		const { data } = await axios.post(
			`${process.env.BELVO_URL}/api/links/${linkId}/refresh/`,
			{
				fetch_resources: ["TRANSACTIONS"],
			},
			{
				headers,
			},
		);

		return { data: data };
	}
}
