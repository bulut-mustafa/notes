import React, {Suspense} from 'react';
import LoginForm from '@/components/login-page/login-form';
import Image from 'next/image';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login – Wrytrai",
  description: "Log in to your Wrytrai account to access your intelligent notes and AI-powered writing assistant.",
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

const LoginPage: React.FC = () => {
    return (
        <>
            <main
  className={`${montserrat.variable} ${nunitoSans.variable} font-sans h-screen flex flex-col md:flex-row items-center relative z-10 bg-white dark:bg-[#0d0d0d] transition-colors duration-300`}
>
  <div className="w-full md:w-1/2 p-12 text-gray-800 dark:text-gray-100 flex flex-col justify-center items-start bg-opacity-75 ml-8">
    <h1 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight font-[var(--font-montserrat)]">
      Your ideas, organized.
    </h1>
    <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 font-[var(--font-nunito-sans)]">
      Capture, structure, and focus — all in one calm space.
    </p>
    <Image
      src="/taking-notes.svg"
      alt="Login Illustration"
      width={500}
      height={500}
      className="w-full mt-8 max-w-xs sm:max-w-sm md:max-w-md dark:brightness-90 dark:contrast-90"
    />
  </div>

  <div className="h-full bg-white dark:bg-[#1c1c1e] opacity-70 dark:opacity-100 md:rounded-l-3xl w-full md:w-1/2 flex items-center justify-center transition-colors duration-300">
    <div className="flex flex-col items-center w-full max-w-md p-6 gap-6">
      <div className="w-full">
        <Suspense fallback={<div className="text-gray-700 dark:text-gray-300">Loading login form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  </div>
</main>

        </>
    );
};

export default LoginPage;