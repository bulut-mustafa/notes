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
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-12 bg-blue-300 rounded w-full"></div>
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
            // Only redirect if the user is really authenticated
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
        <div className="h-full bg-white opacity-70 md:rounded-l-3xl w-full md:w-1/2 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-md p-6 gap-6">
                <div className="w-full">
                    <Link href={'/'}>
                        <p className="text-4xl text-center font-bold" style={{ fontFamily: '"DM Serif Display", serif'  }}>
                            Wrytrai
                        </p>
                    </Link>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                required
                                name='name'
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                required
                                name='lastname'
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                                value={formData.lastname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                required
                                name='email'
                                type="email"
                                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    required
                                    name='password'
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeSlashFilledIcon className="text-2xl" /> : <EyeFilledIcon className="text-2xl" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    required
                                    name='passwordcheck'
                                    type={showPasswordCheck ? "text" : "password"}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                                    value={formData.passwordcheck}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-600"
                                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                                >
                                    {showPasswordCheck ? <EyeSlashFilledIcon className="text-2xl" /> : <EyeFilledIcon className="text-2xl" />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating account...' : 'Sign Up'}
                        </button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-blue-600 hover:underline">
                                Log in
                            </Link>
                        </p>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
