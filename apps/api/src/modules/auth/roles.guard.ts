import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		// Pega as roles necessárias que definimos com o @Roles(...) decorator na rota.
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		// Se não há roles definidas na rota, permite o acesso.
		if (!requiredRoles) {
			return true;
		}

		// Pega o objeto 'user' que foi anexado à requisição pelo AuthGuard.
		const { user } = context.switchToHttp().getRequest();

		// Verifica se a role do usuário está na lista de roles permitidas.
		// Importante: no Supabase, a role padrão é 'authenticated'.
		// Roles customizadas podem ser adicionadas via "custom claims" no Supabase.
		return requiredRoles.some((role) => user.role?.includes(role));
	}
}
