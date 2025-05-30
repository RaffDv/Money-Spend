"use client";
import Link from "next/link";
import SignUpForm from "@/components/signupForm";

const Page = () => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
			<h1 className="text-center text-2xl font-bold mb-4">Register Page</h1>
			<SignUpForm />
			<div className="flex justify-between text-sm">
				<p>Already have an account? </p>
				<Link href={"/auth/signin"}>
					<span className="underline"> Sign In</span>
				</Link>
			</div>
		</div>
	);
};

export default Page;
