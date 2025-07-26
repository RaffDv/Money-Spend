"use client";
import Link from "next/link";
import SignInForm from "@/components/signinForm";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "@/components/googleButton";

const Page = () => {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<Card className="min-w-96">
				<CardHeader>
					<CardTitle>Login Page</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center justify-center">
					<SignInForm />
					<div className="flex w-full items-center gap-4 my-2">
						<Separator className="bg-border flex-1" />
						<span className="text-muted-foreground text-sm px-2">or</span>
						<Separator className="bg-border flex-1" />
					</div>
					<GoogleLoginButton />
				</CardContent>
				<CardFooter>
					<div className="flex justify-between text-sm space-x-0.5">
						<p> Don't have an account? </p>
						<Link href={"/auth/register"}>
							<span className="underline"> Register</span>
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Page;
