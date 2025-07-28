import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { twMerge } from "tailwind-merge";
dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
