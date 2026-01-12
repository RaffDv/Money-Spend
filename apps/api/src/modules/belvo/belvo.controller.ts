/** biome-ignore-all lint/style/useImportType: <explanation> */
import { Body, Controller, Post, Get, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { BelvoService } from "./belvo.service";
import { createAccountLinkDTO } from "./dto/create-account-link.dto";
import { GenerateTokensDTO } from "./dto/generate-tokens.dto";
import { WebhookDTO } from "./dto/webhook.dto";

@ApiTags("belvo")
@Controller("belvo")
export class BelvoController {
	constructor(private readonly belvoService: BelvoService) {}

	@Post("generateTokens")
	@ApiResponse({
		status: 201,
		description: "The tokens has been successfully generated.",
	})
	@ApiResponse({ status: 400, description: "Bad Request." })
	@ApiOperation({
		summary: "Generate a Belvo widget token",
		operationId: "belvoGenerateTokens",
	})
	async generateTokens(@Body() generateTokensDto: GenerateTokensDTO) {
		return await this.belvoService.generateWidgetToken(
			generateTokensDto.userId,
			generateTokensDto.fullname,
		);
	}

	@Post("linkAccount")
	@ApiResponse({
		status: 201,
		description: "Account Link has been saved",
	})
	@ApiResponse({ status: 400, description: "Incorrect data" })
	@ApiOperation({
		summary: "Save a belvo account link",
		operationId: "belvoSaveAccountLink",
	})
	async accountLink(@Body() dto: createAccountLinkDTO) {
		// TODO: Add institution from DTO if available in future
		return await this.belvoService.saveAccountLink(dto.userId, dto.link);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	@Get("links")
	@ApiOperation({
		summary: "Get all user connected links",
		operationId: "getBelvoLinks",
	})
	async getLinks(@Req() req: any) {
		const userId = req.user.sub || req.user.id;
		return await this.belvoService.getLinksByUser(userId);
	}

	@Post("/webhook")
	@ApiResponse({
		status: 200,
		description: "Webhook event processed successfully.",
	})
	@ApiResponse({ status: 400, description: "Bad Request." })
	@ApiOperation({
		summary: "Handle Belvo webhook events",
		operationId: "belvoWebhook",
	})
	async webhook(@Body() dto: WebhookDTO) {
		console.log("data receivied: ", dto);

		// Handle Link Errors
		if (dto.data?.errors) {
			console.error(`Link ${dto.link_id} has errors:`, dto.data.errors);
			await this.belvoService.updateLinkStatus(
				dto.link_id,
				"INVALID_CREDENTIALS",
				JSON.stringify(dto.data.errors),
			);
			return true;
		}

		switch (dto.webhook_type) {
			case "TRANSACTIONS":
				switch (dto.webhook_code) {
					case "new_transactions_avaliable":
						await this.belvoService.updateLinkStatus(dto.link_id, "ACTIVE");
						this.belvoService.retrieveUserTransactions(dto.link_id);
						break;
					case "historical_update":
						await this.belvoService.updateLinkStatus(dto.link_id, "ACTIVE");
						this.belvoService.retrieveUserTransactions(dto.link_id);
						break;

					default:
						break;
				}

				break;

			default:
				break;
		}
		return true;
	}
}
