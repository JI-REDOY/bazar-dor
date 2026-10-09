"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";
import GoogleIcon from "@/components/icons/GoogleIcon";
import GithubIcon from "@/components/icons/GithubIcon";

const SignUpPage = () => {
    const router = useRouter();
    const toast = useToast();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [imageBase64, setImageBase64] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 1 * 1024 * 1024) {
            setError("ছবি ১ মেগাবাইটের ছোট হতে হবে");
            toast.warning("ছবি বড়", "১ মেগাবাইটের ছোট ছবি দিন");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setImagePreview(base64);
            setImageBase64(base64);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
        };

        if (values.password !== values.confirmPassword) {
            setError("পাসওয়ার্ড দুটি মিলছে না");
            toast.warning("পাসওয়ার্ড মিলছে না", "আবার চেষ্টা করুন");
            setLoading(false);
            return;
        }

        const { data, error } = await authClient.signUp.email({
            name: values.name,
            email: values.email,
            password: values.password,
            image: imageBase64 || undefined,
        });

        if (error) {
            setLoading(false);
            setError(error.message || "সাইন আপ ব্যর্থ হয়েছে");
            toast.error("সাইন আপ ব্যর্থ", error.message || "আবার চেষ্টা করুন");
            return;
        }

        if (data?.user) {
            await authClient.signOut();

            setLoading(false);
            toast.success("সাইন আপ সফল!", "এখন সাইন ইন করুন");

            setTimeout(() => {
                router.push("/signin");
                router.refresh();
            }, 800);
        } else {
            setLoading(false);
            setError("সাইন আপ সম্পন্ন হয়নি, আবার চেষ্টা করুন");
        }
    };

    return (
        <div className="flex items-start justify-center px-4 py-16 bg-gray-50 min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            প্রোফাইল ছবি
                        </label>

                        {imagePreview ? (
                            <div className="flex items-center gap-3 mb-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview("");
                                        setImageBase64("");
                                    }}
                                    className="text-xs text-red-600 hover:underline"
                                >
                                    মুছে ফেলুন
                                </button>
                            </div>
                        ) : (
                            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#16a34a] transition-colors bg-white">
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        📷 ছবি আপলোড করতে ক্লিক করুন
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        JPG, PNG (max 1MB)
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

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

                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            minLength={6}
                            placeholder="আবার লিখুন"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition bg-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
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
                            callbackURL: "/auth-success?redirect=/",
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
                            callbackURL: "/auth-success?redirect=/",
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
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="text-[#16a34a] font-medium hover:underline"
                    >
                        সাইন ইন করুন
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

export default SignUpPage;