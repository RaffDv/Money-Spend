import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser(process.env.COOKIE_SECRET));
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: "https://bankblend.com.br",
		credentials: true,
	});
  await app.listen(4000,'0.0.0.0')
}
bootstrap();
