"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";

const EditProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const toast = useToast();

    const [name, setName] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [imageBase64, setImageBase64] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            if (session.user.image) {
                setImagePreview(session.user.image);
            }
        }
    }, [session]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 1 * 1024 * 1024) {
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
        setLoading(true);

        const { error } = await authClient.updateUser({
            name: name,
            image: imageBase64 || session?.user?.image || undefined,
        });

        setLoading(false);

        if (error) {
            toast.error("আপডেট ব্যর্থ", error.message || "আবার চেষ্টা করুন");
            return;
        }

        toast.success("আপডেট সফল!", "আপনার তথ্য আপডেট হয়েছে");
        setTimeout(() => {
            router.push("/profile");
            router.refresh();
        }, 800);
    };

    if (isPending) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <div className="h-12 bg-gray-100 rounded-lg animate-pulse mb-4" />
                    <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                </div>
            </div>
        );
    }

    const user = session?.user;

    if (!user) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    আপনি লগ ইন করেননি
                </h1>
                <Link
                    href="/signin"
                    className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                    সাইন ইন করুন
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-2xl mx-auto px-4 py-10">
            <div className="mb-6">
                <Link
                    href="/profile"
                    className="text-sm text-gray-500 hover:text-[#16a34a]"
                >
                    ← প্রোফাইলে ফিরে যান
                </Link>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                তথ্য আপডেট
            </h1>
            <p className="text-sm text-gray-500 mb-6">
                আপনার নাম ও প্রোফাইল ছবি পরিবর্তন করতে পারবেন।
            </p>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            প্রোফাইল ছবি
                        </label>

                        <div className="flex items-center gap-4">
                            {imagePreview ? (
                                imagePreview.startsWith("data:") ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                    />
                                ) : (
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                    />
                                )
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    📷
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="inline-block cursor-pointer text-sm font-medium text-[#16a34a] hover:underline">
                                    নতুন ছবি আপলোড
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-gray-400">
                                    JPG, PNG (max 1MB)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            নাম
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition bg-white"
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        {loading ? "অপেক্ষা করুন..." : "আপডেট করুন"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default EditProfilePage;