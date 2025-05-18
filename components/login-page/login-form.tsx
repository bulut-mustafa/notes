'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import { auth } from '@/firebase';
import { EyeFilledIcon, EyeSlashFilledIcon } from "./password-input";
import Link from 'next/link';

const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <div className="h-12 bg-blue-300 rounded w-full"></div>
    </div>
);

const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get("redirect") || "/notes";
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace(redirectPath);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router, redirectPath]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const credential = await signInWithEmailAndPassword(
                getAuth(app),
                formData.email,
                formData.password
            );
            const idToken = await credential.user.getIdToken();

            await fetch("/api/login", {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
            router.replace(redirectPath);
        } catch (e: unknown) {
            const errorCode = (e as { code?: string }).code;
            let errorMessage = "An unexpected error occurred.";

            switch (errorCode) {
                case "auth/invalid-email":
                    errorMessage = "Please enter a valid email address.";
                    break;
                case "auth/user-disabled":
                    errorMessage = "This account has been disabled.";
                    break;
                case "auth/user-not-found":
                    errorMessage = "No account found with this email.";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Incorrect password. Please try again.";
                    break;
                case "auth/too-many-requests":
                    errorMessage = "Too many attempts. Try again later.";
                    break;
                default:
                    errorMessage = "Login failed. Please try again.";
            }

            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleForgetPassword = () => {
        if(!formData.email) {
            setError("Please enter your email address to reset your password.");
            return;
        }
        try {
            sendPasswordResetEmail(getAuth(app), formData.email)
                .then(() => {
                    setError("Password reset email sent. Please check your inbox.");
                })
                .catch((error) => {
                    const errorCode = (error as { code?: string }).code;
                    let errorMessage = "An unexpected error occurred.";

                    switch (errorCode) {
                        case "auth/invalid-email":
                            errorMessage = "Please enter a valid email address.";
                            break;
                        case "auth/user-not-found":
                            errorMessage = "No account found with this email.";
                            break;
                        default:
                            errorMessage = "Failed to send password reset email. Please try again.";
                    }

                    setError(errorMessage);
                }
            );
        } catch (error) {
            console.error("Error sending password reset email:", error);
            setError("Failed to send password reset email. Please try again.");
        }
        
    };

    if (loading) {
        return (
            <div className="p-6 max-w-md mx-auto">
                <SkeletonLoader />
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <Link href={'/'} >
                <p className="text-4xl text-center font-bold" style={{ fontFamily: '"DM Serif Display", serif' }}>
                    Wrytrai
                </p>
            </Link>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    required
                    name="email"
                    type="email"
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <input
                        required
                        name="password"
                        type={isVisible ? "text" : "password"}
                        className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <button
                        aria-label="toggle password visibility"
                        className="absolute inset-y-0 right-3 flex items-center"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {isVisible ? <EyeSlashFilledIcon className="text-2xl text-gray-500" /> : <EyeFilledIcon className="text-2xl text-gray-500" />}
                    </button>
                </div>
                <p onClick={handleForgetPassword} className="text-sm text-end mt-1 font-light text-blue-600 hover:underline cursor-pointer">
                Forgot  password?{' '}
                </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white rounded-lg p-2.5 font-semibold flex items-center justify-center
    ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}
    focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out
    transform hover:scale-[1.02] active:scale-95`}
            >
                {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                ) : (
                    "Log In"
                )}
            </button>
            <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{' '}
                <Link href="/signup" className="font-medium text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
