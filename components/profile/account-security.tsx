'use client';
import { useState } from "react";
import { authUser } from "@/lib/types";
import Modal from "./modal";
import { getAuth, updateProfile, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth-context";
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
    const [authPassword, setAuthPassword] = useState("");
    const { refreshUser } = useAuth();
    const [step, setStep] = useState<1 | 2>(1);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleAuthPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthPassword(e.target.value);
    };

    const closeModal = () => {
        setEditingField(null);
        setStep(1);
        setAuthPassword("");
    };

    const handleNext = () => {
        // If editing name, skip auth step
        if (editingField === "name") {
            handleSave();
        }
        if (editingField === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formValues.email || !emailRegex.test(formValues.email)) {
                toast("Please enter a valid email address.");
                return;
            }
        }

        // Add more validations if needed for other fields in the future
        setStep(2);
    };

    const handleSave = async () => {
        console.log("Saving changes:", {
            field: editingField,
            newValue: formValues,
            authPassword: editingField === "name" ? "N/A" : authPassword,
        });

        if (editingField === "name") {
            if (!formValues.name) {
                toast("Please don't leave it empty.");
                return;
            }
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (!user || !user.email) {
                    toast("No authenticated user found.");
                    return;
                }
                const newName = formValues.name;
                await updateProfile(user, { displayName: newName });
                await refreshUser();
                toast("Name updated successfully.");
            }
            catch (error) {
                console.error("Error updating name:", error);
                toast("Failed to update name.");
            }
            finally {
                setEditingField(null);
                setStep(1);
            }
        }
        if (editingField === "email") {
            if (!formValues.email) {
                toast("Please don't leave it empty.");
                return;
            }
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (!user || !user.email) {
                    toast("No authenticated user found.");
                    return;
                }
                const newEmail = formValues.email;
                const credential = EmailAuthProvider.credential(user.email, authPassword);
                try {
                    await reauthenticateWithCredential(user, credential);
                } catch (error) {
                    console.error("Reauthentication failed:", error);
                    toast.error("Reauthentication failed. Please check your current password.");
                    return; 
                }              
                await updateEmail(auth.currentUser, newEmail)
                await refreshUser();
                toast("Email updated successfully.");
            }
            catch (error) {
                console.error("Error updating email:", error);
                toast("Failed to update email.");
            }
            finally {
                setEditingField(null);
                setStep(1);
            }
        }
        if (editingField === "password") {
            if (!formValues.password) {
                toast("Please don't leave the new password empty.");
                return;
            }
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (!user || !user.email) {
                    toast("No authenticated user found.");
                    return;
                }

                const newPassword = formValues.password;
                const credential = EmailAuthProvider.credential(user.email, authPassword);

                try {
                    await reauthenticateWithCredential(user, credential);
                } catch (error) {
                    console.error("Reauthentication failed:", error);
                    toast.error("Reauthentication failed. Please check your current password.");
                    return;
                }

                await updatePassword(user, newPassword);
                toast.success("Password updated successfully.");
            } catch (error) {
                console.error("Error updating password:", error);
                toast.error("Failed to update password.");
            } finally {
                setEditingField(null);
                setStep(1);
            }
        }

        // Firebase update logic would go here...

        closeModal();
    };

    const getModalContent = () => {
        if (step === 1) {
            switch (editingField) {
                case "name":
                    return (
                        <input
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            className="border px-3 py-2 w-full text-sm rounded"
                            placeholder="Enter new name"
                        />
                    );
                case "email":
                    return (
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            className="border px-3 py-2 w-full text-sm rounded"
                            placeholder="Enter new email"
                        />
                    );
                case "password":
                    return (
                        <input
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            className="border px-3 py-2 w-full text-sm rounded"
                            placeholder="Enter new password"
                        />
                    );
                default:
                    return null;
            }
        } else {
            return (
                <input
                    type="password"
                    value={authPassword}
                    onChange={handleAuthPasswordChange}
                    className="border px-3 py-2 w-full text-sm rounded"
                    placeholder="Enter your current password to confirm"
                />
            );
        }
    };

    const getModalTitle = () => {
        if (step === 1) return `Change ${editingField}`;
        return "Confirm Your Password";
    };

    return (
        <div className="mt-8 w-full">
            <h1 className="text-lg font-bold w-full border-b border-slate-200 mb-4">Account Security</h1>
            <div className="flex flex-col gap-6">
                <SettingRow label="Name" value={user?.displayName || ""} onEdit={() => setEditingField("name")} />
                <SettingRow label="Email" value={user?.email || ""} onEdit={() => setEditingField("email")} />
                <SettingRow
                    label="Password"
                    value="Change your password to login to your account."
                    onEdit={() => setEditingField("password")}
                />
            </div>

            <Modal
                isOpen={editingField !== null}
                onClose={closeModal}
                onPrimary={step === 1 ? handleNext : handleSave}
                primaryLabel={step === 1 && editingField !== "name" ? "Next" : "Save"}
                title={getModalTitle()}
            >
                {getModalContent()}
            </Modal>
        </div>
    );
}

function SettingRow({
    label,
    value,
    onEdit,
}: {
    label: string;
    value: string;
    onEdit: () => void;
}) {
    return (
        <div className="flex items-center w-full justify-between gap-4">
            <div className="flex flex-col gap-1 w-full">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-gray-500">{value}</p>
            </div>
            <div className="shrink-0">
                <button
                    onClick={onEdit}
                    className="text-sm border border-[#937b70] text-gray-600 px-3 py-1 rounded-md hover:bg-[#937b70] hover:text-white transition"
                >
                    Change {label}
                </button>
            </div>
        </div>
    );
}
