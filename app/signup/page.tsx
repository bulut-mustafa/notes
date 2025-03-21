import React from 'react';
import SignUpForm from '@/components/signup-page/signup-form';
import { Montserrat, Nunito_Sans } from 'next/font/google';

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
        <>
            <main
                className={`${montserrat.variable} ${nunitoSans.variable} font-sans h-screen flex items-center relative z-10`}
            >
                <div className="hidden md:w-1/2 p-12 text-gray-800 md:flex flex-col justify-center items-start bg-opacity-75">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight font-[var(--font-montserrat)]">
                        Welcome to NoteApp
                    </h1>
                    <p className="text-xl font-light mb-4 font-[var(--font-nunito-sans)]">
                        Everything you are looking for.
                    </p>
                </div>
                <SignUpForm />
            </main>
        </>
    );
};

export default SignUpPage;