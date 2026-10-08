"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";
import UserDropdown from "./UserDropdown";

const AuthButtons = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const toast = useToast();

    const handleLogout = async () => {
        await authClient.signOut();
        toast.info("লগআউট সফল", "আবার আসবেন!");
        setTimeout(() => {
            router.push("/");
            router.refresh();
        }, 800);
    };

    if (isPending) {
        return (
            <div className="flex items-center gap-3">
                <div className="h-9 w-20 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-9 w-24 bg-gray-100 rounded-lg animate-pulse" />
            </div>
        );
    }

    const user = session?.user;

    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Link
                    href="/signin"
                    className="text-sm font-medium text-gray-700 hover:text-[#16a34a] px-3 py-2 transition-colors duration-200"
                >
                    সাইন ইন
                </Link>
                <Link
                    href="/signup"
                    className="text-sm font-medium bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    return <UserDropdown user={user} onLogout={handleLogout} />;
};

export default AuthButtons;