import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { CONTAINS } from "class-validator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(private readonly reflector: Reflector) {
		super();
	}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) return true;

		return super.canActivate(context);
	}

	handleRequest(err: any, user: any, info: any, context: any) {
		if (info?.message && info.message === "No auth token") {
			console.log("------------------------------------------------------");
			console.log("jwt.guard on auth module");
			console.log(
				"the route requested is private, and user not have an access_token",
			);
			console.log("the route need be public?");
			console.log("------------------------------------------------------");
		}

		if (err || !user) {
			if (info.message) throw new UnauthorizedException(info.message);
		}

		return user;
	}
}
