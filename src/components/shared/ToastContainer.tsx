"use client";

import { useToast } from "@/context/ToastContext";

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    const bgColor = (type: string) => {
        if (type === "success") return "bg-green-600";
        if (type === "error") return "bg-red-600";
        if (type === "warning") return "bg-yellow-500";
        return "bg-blue-600";
    };

    const icon = (type: string) => {
        if (type === "success") return "✓";
        if (type === "error") return "✕";
        if (type === "warning") return "!";
        return "i";
    };

    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-80 max-w-[calc(100vw-2rem)]">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    onClick={() => removeToast(toast.id)}
                    className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex items-start gap-3 cursor-pointer animate-slide-in-right"
                >
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${bgColor(
                            toast.type
                        )}`}
                    >
                        {icon(toast.type)}
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">
                            {toast.title}
                        </p>
                        {toast.description && (
                            <p className="text-xs text-gray-600 mt-1">
                                {toast.description}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;