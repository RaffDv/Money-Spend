/** biome-ignore-all lint/style/useImportType: <explanation> */
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BelvoService } from "./belvo.service";
import { GenerateTokensDTO } from "./dto/generate-tokens.dto";
import { debug } from "console";

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

	@Get("sucess")
	success() {
		console.debug("account linked");
		return true;
	}
	@Get("exit")
	exit() {
		console.debug("user exit windget");
		return true;
	}
	@Get("error")
	error() {
		console.debug("error on link account");
		return true;
	}
}
