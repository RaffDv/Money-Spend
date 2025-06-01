"use client";
import Link from "next/link";
import SignInForm from "@/components/signinForm";

const Page = () => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
			<h1 className="text-center text-2xl font-bold mb-4">Login Page</h1>
			<SignInForm />
			<div className="flex justify-between text-sm">
				<p> Don't have an account? </p>
				<Link href={"/auth/register"}>
					<span className="underline"> Register</span>
				</Link>
			</div>
		</div>
	);
};

export default Page;
