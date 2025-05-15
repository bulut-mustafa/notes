import React from 'react';
import SignUpForm from '@/components/signup-page/signup-form';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import Image from 'next/image';
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
            className={`${montserrat.variable} ${nunitoSans.variable} font-sans h-screen flex flex-col md:flex-row items-center relative z-10`}
        >
            {/* Left side info panel */}
            <div className=" w-full md:w-1/2 p-10 md:p-12 text-gray-800 flex flex-col justify-center items-start bg-opacity-75 ml-8">
                <h1 className="text-4xl font-extrabold mb-6 leading-tight font-[var(--font-montserrat)]">
                    Join Wrytrai Today
                </h1>
                <p className=" hidden md:block text-lg font-light mb-4 font-[var(--font-nunito-sans)]">
                    Organize your thoughts, capture ideas, and stay productive — all in one place.
                </p>
                <p className="text-md text-gray-600 font-[var(--font-nunito-sans)]">
                    Create your free account in seconds and start writing smarter.
                </p>
                <Image
                    src="/signup-illustration.svg"
                    alt="SignUp Illustration"
                    width={500}
                    height={500}    
                    className="hidden md:block w-full mt-8 max-w-xs sm:max-w-sm md:max-w-md"
                />
            </div>

            {/* Signup form */}
            <SignUpForm />
        </main>
    );
};

export default SignUpPage;
