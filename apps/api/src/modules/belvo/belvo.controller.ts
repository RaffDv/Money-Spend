/** biome-ignore-all lint/style/useImportType: <explanation> */
import { Body, Controller, Post } from "@nestjs/common";
import { BelvoService } from "./belvo.service";

@Controller("belvo")
export class BelvoController {
	constructor(private readonly belvoService: BelvoService) {}

	@Post("generateWidget")
	async generateWidget(@Body() body: { userId: string }) {
		return await this.belvoService.generateWidgetToken(body.userId);
	}
}
