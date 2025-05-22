'use client';

import { FormEvent, useState, useEffect } from "react";
import Link from 'next/link';
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../login-page/password-input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addNoteToDB } from "@/lib/actions";

const SkeletonLoader = () => {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/3 dark:bg-gray-600"></div>
            <div className="h-10 bg-gray-300 rounded w-full dark:bg-gray-600"></div>
            <div className="h-10 bg-gray-300 rounded w-full dark:bg-gray-600"></div>
            <div className="h-12 bg-blue-300 rounded w-full dark:bg-blue-600"></div>
        </div>
    );
};

const SignUpForm: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        passwordcheck: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.passwordcheck) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setIsSubmitting(true);
            setIsNewUser(true);
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const newUser = userCredential.user;

            await updateProfile(newUser, {
                displayName: `${formData.name} ${formData.lastname}`,
                photoURL: "",
            });

            const result = await addNoteToDB(newUser.uid, {
                content: `<h1>👋 Welcome to Wrytrai!</h1>
                    <p>We're excited to have you here, <strong>note-taker</strong>!</p>
                    <p>This is your first note. Here's what you can do with Wrytrai:</p>
                    <ul>
                    <li><strong>Create notes</strong> to capture your thoughts, ideas, or tasks.</li>
                    <li><strong>Use formatting</strong> like <em>italic</em>, <strong>bold</strong>, and <code>code blocks</code>.</li>
                    <li><strong>Organize</strong> your notes into folders, favorites, or archives.</li>
                    <li><strong>Ask our AI Assistant</strong> to summarize or help with your content.</li>
                    </ul>
                    <blockquote>
                    “The faintest ink is more powerful than the strongest memory.” – Chinese Proverb
                    </blockquote>
                    <p>Need inspiration? Try writing a daily journal entry, planning your next trip, or dumping ideas for your next big project!</p>
                    <hr />
                    <p style="color: gray; font-size: 0.9em;">This is a demo note — you can delete or edit it anytime.</p>`,
                image: [],
                tags: [],
                archived: false,
                isDeleted: false,
                newsAttached: [],
                isFavorite: false,
            });

            await fetch('/api/signup-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    name: `${formData.name} ${formData.lastname}`,
                }),
            });

            const noteId = result.note?.id;
            router.push('/notes/' + noteId);
        } catch (e: unknown) {
            const errorCode = (e as { code?: string }).code;
            let errorMessage = "An unexpected error occurred.";

            switch (errorCode) {
                case 'auth/email-already-in-use':
                    errorMessage = "Email address is already in use.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Email address is invalid.";
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = "Error during sign up.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Password is not strong enough.";
                    break;
                default:
                    errorMessage = "Sign up failed. Please try again.";
                    break;
            }

            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && !isNewUser) {
                router.push('/notes');
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router, isNewUser]);

    if (loading) {
        return (
            <div className="p-6 max-w-md mx-auto">
                <SkeletonLoader />
            </div>
        );
    }

    return (
        <div className="h-full bg-white dark:bg-[#1c1c1e] dark:opacity-100 opacity-90 md:rounded-l-3xl w-full md:w-1/2 flex items-center justify-center transition-colors duration-300">
            <div className="flex flex-col items-center w-full max-w-md p-6 gap-6">
                <div className="w-full">
                    <Link href={'/'}>
                        <h1
                            className="text-4xl text-center font-bold text-gray-900 dark:text-gray-100"
                            style={{ fontFamily: '"DM Serif Display", serif' }}
                        >
                            Wrytrai
                        </h1>
                    </Link>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                required
                                name="name"
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="lastname"
                                className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
                            >
                                Last Name
                            </label>
                            <input
                                id="lastname"
                                required
                                name="lastname"
                                type="text"
                                placeholder="Enter your last name"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.lastname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                required
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    required
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-600 dark:text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeSlashFilledIcon className="text-2xl" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="passwordcheck"
                                className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="passwordcheck"
                                    required
                                    name="passwordcheck"
                                    type={showPasswordCheck ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.passwordcheck}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-600 dark:text-gray-400"
                                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                                    aria-label={showPasswordCheck ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showPasswordCheck ? (
                                        <EyeSlashFilledIcon className="text-2xl" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-semibold rounded-lg px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? "Creating account..." : "Sign Up"}
                        </button>
                        <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                        {error && (
                            <p className="text-red-600 dark:text-red-400 text-sm mt-2 font-medium">
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
