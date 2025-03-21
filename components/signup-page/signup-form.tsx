'use client';

import { FormEvent, useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import {  auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../login-page/password-input";
import {registerNewUser} from "@/lib/firebaseAuth";
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
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
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
        if (formData.password !== formData.passwordcheck) {
            setError('Passwords do not match');
            return;
        }
    
        try {   
            await registerNewUser(formData.email, formData.password, formData.name, formData.lastname);
            router.push('/notes'); // 🔹 Redirect from the client side
        } catch (e) {
            setError((e as Error).message);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.push('/notes');
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

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
                <Link href="/" aria-label="Home" className="flex items-center justify-center gap-8 no-underline">
                    <Image src="/favicon.png" alt="Time to go" width={128} height={128} priority className="mb-6" />
                </Link>
                <div className="w-full">
                    <p className="text-center text-lg font-semibold mb-4">Create your account</p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input required name='name' type="text" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200" value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input required name='lastname' type="text" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200" value={formData.lastname} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input required name='email' type="email" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <div className="relative">
                                <input required name='password' type={isVisible ? "text" : "password"} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200" value={formData.password} onChange={handleInputChange} />
                                <button type="button" className="absolute right-3 top-2 text-gray-600" onClick={toggleVisibility}>
                                    {isVisible ? <EyeSlashFilledIcon className="text-2xl" /> : <EyeFilledIcon className="text-2xl" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input required name='passwordcheck' type={isVisible ? "text" : "password"} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200" value={formData.passwordcheck} onChange={handleInputChange} />
                                <button type="button" className="absolute right-3 top-2 text-gray-600" onClick={toggleVisibility}>
                                    {isVisible ? <EyeSlashFilledIcon className="text-2xl" /> : <EyeFilledIcon className="text-2xl" />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Sign Up
                        </button>
                        <p className="text-sm font-light text-gray-500">Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:underline">Log in</Link></p>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
