"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useToast } from "@/context/ToastContext";

const AuthSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useToast();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const redirect = searchParams.get("redirect") || "/";

        toast.success("সাইন ইন সফল!", "স্বাগতম!");

        setTimeout(() => {
            router.replace(redirect);
            router.refresh();
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">লগ ইন হচ্ছে...</p>
            </div>
        </div>
    );
};

export default AuthSuccessPage;