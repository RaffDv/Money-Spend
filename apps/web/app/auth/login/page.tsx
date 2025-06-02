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

const Page = () => {
	return (
		<Card className="w-fit h-fit min-w-96">
			<CardHeader>
				<CardTitle>Login Page</CardTitle>
			</CardHeader>
			<CardContent>
				<SignInForm />
			</CardContent>
			<CardFooter>
				<div className="flex justify-between text-sm">
					<p> Don't have an account? </p>
					<Link href={"/auth/register"}>
						<span className="underline"> Register</span>
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
};

export default Page;
