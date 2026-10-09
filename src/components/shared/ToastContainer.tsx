"use client";

import { useToast } from "@/context/ToastContext";

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    const theme = (type: string) => {
        if (type === "success")
            return {
                icon: "✓",
                gradient: "from-green-500 to-emerald-600",
                glow: "shadow-green-500/30",
                bar: "bg-green-500",
            };
        if (type === "error")
            return {
                icon: "✕",
                gradient: "from-red-500 to-rose-600",
                glow: "shadow-red-500/30",
                bar: "bg-red-500",
            };
        if (type === "warning")
            return {
                icon: "!",
                gradient: "from-amber-400 to-orange-500",
                glow: "shadow-amber-500/30",
                bar: "bg-amber-500",
            };
        return {
            icon: "i",
            gradient: "from-blue-500 to-indigo-600",
            glow: "shadow-blue-500/30",
            bar: "bg-blue-500",
        };
    };

    return (
        <div className="fixed top-1.5 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-1.5 w-[calc(100vw-2rem)] max-w-[280px] pointer-events-none">
            {toasts.map((toast) => {
                const t = theme(toast.type);
                const duration = toast.duration ?? 3000;

                return (
                    <div
                        key={toast.id}
                        onClick={() => removeToast(toast.id)}
                        className="pointer-events-auto relative overflow-hidden rounded-lg bg-white border border-gray-100 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)] px-2.5 py-2 flex items-center gap-2 cursor-pointer animate-toast-in"
                    >
                        <div
                            className={`w-7 h-7 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-md ${t.glow}`}
                        >
                            {t.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-xs leading-tight truncate">
                                {toast.title}
                            </p>
                            {toast.description && (
                                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight truncate">
                                    {toast.description}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeToast(toast.id);
                            }}
                            className="text-gray-400 hover:text-gray-700 transition-colors text-xs leading-none shrink-0"
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100">
                            <div
                                className={`h-full ${t.bar} animate-toast-progress`}
                                style={{
                                    animationDuration: `${duration}ms`,
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ToastContainer;