import { registerAs } from "@nestjs/config";
import type { JwtModuleOptions } from "@nestjs/jwt";

export default registerAs(
	"jwt",
	(): JwtModuleOptions => ({
		secret: process.env.JWT_SECRET_KEY,
		signOptions: {
			expiresIn: process.env.JWT_EXPIRE,
		},
	}),
);
