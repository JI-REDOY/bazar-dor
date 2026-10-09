"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";
import GoogleIcon from "@/components/icons/GoogleIcon";
import GithubIcon from "@/components/icons/GithubIcon";

const SignInPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const toast = useToast();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const hasShownToast = useRef(false);

    useEffect(() => {
        if (searchParams.get("callbackUrl") && !hasShownToast.current) {
            hasShownToast.current = true;
            toast.info("সাইন ইন প্রয়োজন", "এই পেজ দেখতে আগে সাইন ইন করুন");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        const { error } = await authClient.signIn.email({
            email: values.email,
            password: values.password,
        });

        setLoading(false);

        if (error) {
            setError(error.message || "সাইন ইন ব্যর্থ হয়েছে");
            toast.error("সাইন ইন ব্যর্থ", error.message || "আবার চেষ্টা করুন");
            return;
        }

        toast.success("সাইন ইন সফল!", "স্বাগতম!");
        setTimeout(() => {
            router.push(callbackUrl);
            router.refresh();
        }, 800);
    };

    return (
        <div className="flex items-start justify-center px-4 py-16 bg-gray-50 min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
                    সাইন ইন
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে
                    ঢুকুন।
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            placeholder="কমপক্ষে ৬ অক্ষর"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition bg-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-gray-50 text-gray-500">
                            অথবা
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        authClient.signIn.social({
                            provider: "google",
                            callbackURL: `/auth-success?redirect=${callbackUrl}`,
                        })
                    }
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <GoogleIcon size={20} />
                    <span className="text-sm font-medium text-gray-700">
                        Google দিয়ে চালিয়ে যান
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() =>
                        authClient.signIn.social({
                            provider: "github",
                            callbackURL: `/auth-success?redirect=${callbackUrl}`,
                        })
                    }
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors shadow-sm mt-3"
                >
                    <GithubIcon size={20} />
                    <span className="text-sm font-medium text-gray-700">
                        GitHub দিয়ে চালিয়ে যান
                    </span>
                </button>

                <p className="text-center mt-6 text-sm text-gray-700">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/signup"
                        className="text-[#16a34a] font-medium hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>

                <div className="text-center mt-4">
                    <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-[#16a34a]"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;