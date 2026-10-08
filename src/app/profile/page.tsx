"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";

const ProfilePage = () => {
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
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex-1">
                            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                            <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const user = session?.user;

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    আপনি লগ ইন করেননি
                </h1>
                <p className="text-gray-600 mb-6">
                    প্রোফাইল দেখতে সাইন ইন করুন।
                </p>
                <Link
                    href="/signin"
                    className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                    সাইন ইন করুন
                </Link>
            </div>
        );
    }

    const initial = user.name?.charAt(0) || "U";

    return (
        <main className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                আমার প্রোফাইল
            </h1>
            <p className="text-sm text-gray-500 mb-6">
                আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "User"}
                            width={72}
                            height={72}
                            className="w-18 h-18 w-[72px] h-[72px] rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-[72px] h-[72px] rounded-full bg-[#16a34a] text-white flex items-center justify-center text-2xl font-bold">
                            {initial}
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-gray-900 truncate">
                            {user.name}
                        </h2>
                        <p className="text-sm text-gray-500 truncate">
                            {user.email}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="border border-red-200 text-red-600 hover:bg-red-50 font-medium text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                        ↩ সাইন আউট
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">তথ্য</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            নাম
                        </label>
                        <input
                            type="text"
                            value={user.name || ""}
                            readOnly
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            value={user.email || ""}
                            readOnly
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
                        />
                    </div>
                </div>

                <Link
                    href="/profile/edit"
                    className="mt-5 block text-center w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    আপডেট
                </Link>
            </div>
        </main>
    );
};

export default ProfilePage;