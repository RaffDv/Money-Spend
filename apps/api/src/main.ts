import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

	const origin = process.env.CLIENT_URL;
	console.log(origin);

	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
		{ cors: { methods, credentials: true, origin: origin } },
	);

	const swaggerConfig = new DocumentBuilder()
		.setTitle("BankBlend API")
		.setDescription("BankBlend API docs")
		.setVersion("0.1.0")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup("api", app, document);
	await app.listen(process.env.PORT ?? 2000, "0.0.0.0");
}
bootstrap();
