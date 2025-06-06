import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: true,
	});
	await app.listen(process.env.PORT ?? 4000, () => {
		console.log(`Server running on http://localhost:${process.env.PORT}`);
	});
}
bootstrap();
