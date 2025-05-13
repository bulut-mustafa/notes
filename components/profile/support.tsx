'use client';
import { useState } from "react";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import Modal from "./modal";
import toast from "react-hot-toast";

export default function Support() {
    const [authPassword, setAuthPassword] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEmailing, setIsEmailing] = useState(false);
    const [emailForm, setEmailForm] = useState({ subject: "", message: "" });

    const handleAuthPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthPassword(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmailForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const closeModal = () => {
        setAuthPassword("");
        setEmailForm({ subject: "", message: "" });
        setIsDeleting(false);
        setIsEmailing(false);
    };

    const handleDelete = async () => {
        if (!authPassword) {
            toast("Please enter your password.");
            return;
        }
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                toast("No user is currently signed in.");
                return;
            }
            const credential = EmailAuthProvider.credential(user.email || "", authPassword);
            try {
                await reauthenticateWithCredential(user, credential);
            } catch (error) {
                console.error("Reauthentication failed:", error);
                toast.error("Reauthentication failed. Please check your current password.");
                return;
            }
            await deleteUser(user);
            toast("Account deleted successfully. Redirecting to login page...");
            // Redirect or sign out logic here
        }
        catch (error) {
            toast("Error deleting account. Please try again.");
            console.error(error);
        } finally {
            closeModal();
        }
    };

    const handleSendEmail = () => {
        if (!emailForm.subject || !emailForm.message) {
            toast("Please fill in both fields.");
            return;
        }

        console.log("Sending email:", emailForm);
        // Replace this with real logic like EmailJS, an API, etc.
        toast.success("Email sent successfully!");
        closeModal();
    };

    const renderDeleteModal = () => (
        <Modal
            isOpen={isDeleting}
            onClose={closeModal}
            onPrimary={handleDelete}
            primaryLabel="Delete"
            title="Confirm Your Password"
        >
            <input
                type="password"
                value={authPassword}
                onChange={handleAuthPasswordChange}
                className="border px-3 py-2 w-full text-sm rounded"
                placeholder="Enter your current password to delete your account"
            />
        </Modal>
    );

    const renderEmailModal = () => (
        <Modal
            isOpen={isEmailing}
            onClose={closeModal}
            onPrimary={handleSendEmail}
            primaryLabel="Send"
            title="Send Support Email"
        >
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    name="subject"
                    value={emailForm.subject}
                    onChange={handleEmailChange}
                    placeholder="Subject"
                    className="border px-3 py-2 w-full text-sm rounded"
                />
                <textarea
                    name="message"
                    value={emailForm.message}
                    onChange={handleEmailChange}
                    placeholder="Message"
                    rows={4}
                    className="border px-3 py-2 w-full text-sm rounded resize-none"
                />
            </div>
        </Modal>
    );

    return (
        <div className="mt-8 w-full">
            <h1 className="text-lg font-bold w-full border-b border-slate-200 mb-4">Support</h1>
            <div className="flex flex-col gap-4">
                <div className="flex items-center w-full justify-between gap-2 mt-4">
                    <div className="flex flex-col gap-2">
                        <p>Need help?</p>
                        <p className="text-xs text-gray-500">Reach out to me for any inquiries.</p>
                    </div>
                    <button
                        onClick={() => setIsEmailing(true)}
                        className="border border-[#937b70] text-sm text-gray-600 hover:text-white px-4 py-2 rounded-md hover:bg-[#937b70] transition duration-200"
                    >
                        Email
                    </button>
                </div>
                <div className="flex items-center w-full justify-between gap-2 mt-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-red-400">Delete my account</p>
                        <p className="text-xs text-gray-500">Permanently delete the account and remove all the notes.</p>
                    </div>
                    <button
                        onClick={() => setIsDeleting(true)}
                        className="border border-[#937b70] text-sm text-gray-600 hover:text-white px-4 py-2 rounded-md hover:bg-[#937b70] transition duration-200"
                    >
                        {">"}
                    </button>
                </div>
            </div>

            {renderDeleteModal()}
            {renderEmailModal()}
        </div>
    );
}
