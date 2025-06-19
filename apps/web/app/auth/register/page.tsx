"use client";
import Link from "next/link";
import SignUpForm from "@/components/signupForm";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import GoogleLoginButton from "@/components/googleButton";
import { Separator } from "@/components/ui/separator";

const Page = () => {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<Card className="min-w-96 ">
				<CardHeader>
					<CardTitle>Register Page</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center justify-center">
					<SignUpForm />
					<div className="flex w-full items-center gap-4 my-2">
						<Separator className="bg-border flex-1" />
						<span className="text-muted-foreground text-sm px-2">or</span>
						<Separator className="bg-border flex-1" />
					</div>
					<GoogleLoginButton />
				</CardContent>
				<CardFooter>
					<div className="flex justify-between text-sm space-x-0.5">
						<p>Already have an account? </p>
						<Link href={"/auth/login"}>
							<span className="underline"> Sign In</span>
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Page;
