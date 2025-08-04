import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { PrismaService } from "./modules/prisma/prisma.service";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { FinanceModule } from './modules/finance/finance.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UserModule,
		PrismaModule,
		AuthModule,
		FinanceModule,
	],

	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
