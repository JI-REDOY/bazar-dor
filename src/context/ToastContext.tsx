"use client";

import {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
};

type ToastContextType = {
    toasts: Toast[];
    showToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        if (timers.current[id]) {
            clearTimeout(timers.current[id]);
            delete timers.current[id];
        }
    }, []);

    const showToast = useCallback(
        (toast: Omit<Toast, "id">) => {
            const id = Math.random().toString(36).substring(2, 9);
            const duration = toast.duration ?? 3000;

            setToasts((prev) => [...prev, { ...toast, id, duration }]);

            timers.current[id] = setTimeout(() => {
                removeToast(id);
            }, duration);
        },
        [removeToast]
    );

    const success = useCallback(
        (title: string, description?: string) =>
            showToast({ type: "success", title, description }),
        [showToast]
    );

    const error = useCallback(
        (title: string, description?: string) =>
            showToast({ type: "error", title, description }),
        [showToast]
    );

    const warning = useCallback(
        (title: string, description?: string) =>
            showToast({ type: "warning", title, description }),
        [showToast]
    );

    const info = useCallback(
        (title: string, description?: string) =>
            showToast({ type: "info", title, description }),
        [showToast]
    );

    return (
        <ToastContext.Provider
            value={{
                toasts,
                showToast,
                removeToast,
                success,
                error,
                warning,
                info,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
};