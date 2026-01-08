/** biome-ignore-all lint/style/useImportType: <explanation> */
import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BelvoService } from "./belvo.service";
import { createAccountLinkDTO } from "./dto/create-account-link.dto";
import { GenerateTokensDTO } from "./dto/generate-tokens.dto";

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
		return await this.belvoService.saveAccountLink(dto.userId, dto.link);
	}

	@Post("/webhook")
	async webhook(@Body() body: any) {
		console.log("data receivied: ", body);
		return true;
	}
}
