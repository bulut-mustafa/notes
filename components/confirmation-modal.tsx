
interface ModalProps {
    text: string;
    onClose: () => void;
    onConfirm: () => void;
}
export default function ConfirmationModal(modalProps: ModalProps) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-blur shadow-lg border bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                    <h2 className="text-lg font-semibold mb-4 text-center">{modalProps.text}</h2>
                    <p className="text-sm text-gray-600 mb-6 text-center">This action cannot be undone.</p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => modalProps.onClose()}
                            className="px-4 py-1.5 rounded-md text-sm border border-gray-300 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                modalProps.onConfirm();
                                modalProps.onClose();
                            }}
                            className="px-4 py-1.5 rounded-md text-sm text-white bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>)
}