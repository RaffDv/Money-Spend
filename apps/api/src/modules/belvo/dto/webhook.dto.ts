import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsObject, IsNumber, IsDefined } from "class-validator";

export class WebhookDTO {
	@ApiProperty({
		description: "Unique identifier for the webhook event",
		example: "3fdb58ab35954d50991271dc4c897293",
	})
	@IsString()
	webhook_id: string;

	@ApiProperty({
		description: "Type of webhook event",
		example: "TRANSACTIONS",
	})
	@IsString()
	webhook_type: string;

	@ApiProperty({
		description: "Code indicating the specific webhook event",
		example: "new_transactions_available",
	})
	@IsString()
	webhook_code: string;

	@ApiProperty({
		description: "Type of process that triggered the webhook",
		example: "recurrent_update",
	})
	@IsString()
	process_type: string;

	@ApiProperty({
		description: "ID of the linked Belvo account",
		example: "e2f18483-5680-41d7-a9f3-4a8d267ab581",
	})
	@IsString()
	link_id: string;

	@ApiProperty({
		description: "External ID associated with the Belvo link",
		example: "belvo_test_janice",
	})
	@IsString()
	external_id: string;

	@ApiProperty({
		description: "Data specific to the webhook event",
	})
	@IsDefined()
	@IsObject()
	data: { [key: string]: any };

	@ApiProperty({
		description: "Request ID associated with the webhook event",
		example: "7f477f3f1b0e43daba951f7b2a727878",
	})
	@IsString()
	request_id: string;
}
