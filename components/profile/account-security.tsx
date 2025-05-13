'use client';
import { useState } from "react";
import { authUser } from "@/lib/types";

interface SecurityProps {
    user: authUser | null;
    uid: string | undefined;
    userInfoLoading: boolean;
}

export default function AccountSecurity({ user }: SecurityProps) {
    const [editingField, setEditingField] = useState<"name" | "email" | "password" | null>(null);
    const [formValues, setFormValues] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Implement saving logic here
        console.log("Saving:", formValues);
        setEditingField(null); // Exit edit mode
    };

    return (
        <div className="mt-8 w-full">
            <h1 className="text-lg font-bold w-full border-b border-slate-200 mb-4">Account Security</h1>
            <div className="flex flex-col gap-6">

                {/* Name Section */}
                <div className="flex items-center w-full justify-between gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm font-medium">Name</p>
                        {editingField === "name" ? (
                            <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                                className="border px-3 py-1 text-sm rounded-md"
                            />
                        ) : (
                            <p className="text-xs text-gray-500">{user?.displayName}</p>
                        )}
                    </div>
                    <div className="shrink-0 flex gap-2">
                        {editingField === "name" ? (
                            <>
                                <button onClick={handleSave} className="text-sm border border-[#937b70] text-gray-600 px-3 py-1 rounded-md hover:bg-[#937b70] hover:text-white transition">
                                    Save
                                </button>
                                <button onClick={handleSave} className="text-sm border border-[#937b70] text-gray-600 px-3 py-1 rounded-md hover:bg-[#937b70] hover:text-white transition">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setEditingField("name")} className="text-sm border border-[#937b70] text-gray-600 px-3 py-1 rounded-md hover:bg-[#937b70] hover:text-white transition">
                                Change Name
                            </button>
                        )}
                    </div>
                </div>

                {/* Email Section */}
                <div className="flex items-center w-full justify-between gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm font-medium">Email</p>
                        {editingField === "email" ? (
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                className="border px-3 py-1 text-sm rounded-md"
                            />
                        ) : (
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        )}
                    </div>
                    <div className="shrink-0">
                        {editingField === "email" ? (
                            <button onClick={handleSave} className="text-sm border border-[#937b70] text-white px-3 py-1 rounded-md bg-[#937b70] hover:bg-[#7c645a] transition">
                                Save
                            </button>
                        ) : (
                            <button onClick={() => setEditingField("email")} className="text-sm border border-[#937b70] text-gray-600 px-3 py-1 rounded-md hover:bg-[#937b70] hover:text-white transition">
                                Change Email
                            </button>
                        )}
                    </div>
                </div>

                {/* Password Section */}
                <div className="flex items-center w-full justify-between gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm font-medium">Password</p>
                        {editingField === "password" ? (
                            <input
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="border px-3 py-1 text-sm rounded-md"
                            />
                        ) : (
                            <p className="text-xs text-gray-500">Change your password to login to your account.</p>
                        )}
                    </div>
                    <div className="shrink-0">
                        {editingField === "password" ? (
                            <button onClick={handleSave} className="text-sm border border-[#937b70] text-white px-3 py-1 rounded-md bg-[#937b70] hover:bg-[#7c645a] transition">
                                Save
                            </button>
                        ) : (
                            <button onClick={() => setEditingField("password")} className="text-sm border border-[#937b70] text-gray-600 px-3 py-1 rounded-md hover:bg-[#937b70] hover:text-white transition">
                                Change Password
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
