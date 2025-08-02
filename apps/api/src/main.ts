import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser(process.env.COOKIE_SECRET));
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	});

	const config = new DocumentBuilder()
		.setTitle("BankBlend API")
		.setDescription("BankBlend API Swegger docs")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("api", app, document);

	await app.listen(process.env.PORT, process.env.API_HOSTNAME);
}
bootstrap();
