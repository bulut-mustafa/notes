'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace('/notes'); // ✅ Use `replace` to prevent navigating back to /login
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        } catch (e) {
            setError((e as Error).message);
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
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="w-full text-white bg-blue-500 rounded-lg p-2.5">
                Log In
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
