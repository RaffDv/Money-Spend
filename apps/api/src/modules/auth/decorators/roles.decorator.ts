import { SetMetadata } from "@nestjs/common";
import { Role } from "generated/prisma";

export const ROLES_KEY = "ROLES";
export const Roles = (...roles: [Role, ...Role[]]) =>
	SetMetadata(ROLES_KEY, roles);
