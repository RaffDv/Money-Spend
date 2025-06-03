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

const Page = () => {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<Card className="min-w-96 ">
				<CardHeader>
					<CardTitle>Register Page</CardTitle>
				</CardHeader>
				<CardContent>
					<SignUpForm />
				</CardContent>
				<CardFooter>
					<div className="flex justify-between text-sm">
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
