import React from 'react';
import SignUpForm from '@/components/signup-page/signup-form';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up – Wrytrai",
  description: "Create a free Wrytrai account and start writing smarter with our AI-enhanced note-taking app.",
};
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-montserrat',
});

const nunitoSans = Nunito_Sans({
    subsets: ['latin'],
    weight: ['400', '600'],
    variable: '--font-nunito-sans',
});

const SignUpPage = () => {
    return (
        <main
            className={`${montserrat.variable} ${nunitoSans.variable} font-sans h-screen flex flex-col md:flex-row items-center relative z-10 bg-white dark:bg-[#0d0d0d] transition-colors duration-300`}
        >
            {/* Left side info panel */}
            <div className=" w-full md:w-1/2 p-10 md:p-12 text-gray-800 dark:text-gray-100 flex flex-col justify-center items-start bg-opacity-75 ml-8">
                <h1 className="text-4xl font-semibold mb-6 leading-tight">
                    Join <span style={{ fontFamily: '"DM Serif Display", serif', color: "#856559" }}>Wrytrai</span> Today
                </h1>
                <p className=" hidden md:block text-gray-600 dark:text-gray-300 text-lg font-light mb-4 font-[var(--font-nunito-sans)]">
                    Organize your thoughts, capture ideas, and stay productive — all in one place.
                </p>
                <p className="text-md text-gray-600 dark:text-gray-300 font-[var(--font-nunito-sans)]">
                    Create your free account in seconds and start writing smarter.
                </p>
                <Image
                    src="/signup-illustration.svg"
                    alt="SignUp Illustration"
                    width={500}
                    height={500}    
                    className="hidden md:block w-full mt-8 max-w-xs sm:max-w-sm md:max-w-md dark:brightness-90 dark:contrast-90"
                />
            </div>

            {/* Signup form */}
            <SignUpForm />
        </main>
    );
};

export default SignUpPage;
