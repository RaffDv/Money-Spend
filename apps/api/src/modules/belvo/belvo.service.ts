import { Injectable } from "@nestjs/common";

@Injectable()
export class BelvoService {
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
			fetch_resources: [
				"ACCOUNTS",
				"TRANSACTIONS",
				"OWNERS",
				"BILLS",
				"INVESTMENTS",
				"INVESTMENT_TRANSACTIONS",
			],
			widget: {
				purpose:
					"Soluções financeiras personalizadas oferecidas por meio de recomendações sob medida, visando melhores ofertas de produtos financeiros e de crédito.",
				openfinance_feature: "consent_link_creation",
				callback_urls: {
					success: "http://localhost:3000/api/belvo/success",
					exit: "http://localhost:3000/api/belvo/exit",
					event: "http://localhost:3000/api/belvo/error",
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
							number: "03645127097",
							name: "Rafael Mattos",
						},
					],
				},
				branding: {
					company_icon: "https://localhost:3000/icon.svg",
					company_logo: "https://localhost:3000/icon.svg",
					company_name: "BankBlend",
					company_terms_url: "https://belvo.com/terms-service/",
					overlay_background_color: "#F0F2F4",
					social_proof: true,
				},
				theme: [],
			},
		};
		try {
			const response = await fetch("https://sandbox.belvo.com/api/token/", {
				method: "POST",
				headers: {
					"Content-Type": " application/json",
				},
				body: JSON.stringify(payload),
			});
			const tokens = await response.json();

			return tokens;
		} catch (error) {
			console.error("Erro ao gerar token da Belvo:", error);
			throw new Error("Falha ao gerar o token de acesso da Belvo.");
		}
	}
}
