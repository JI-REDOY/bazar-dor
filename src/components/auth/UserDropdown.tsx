"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type User = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

type Props = {
    user: User;
    onLogout: () => void;
};

const UserDropdown = ({ user, onLogout }: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const initial = user.name?.charAt(0) || "U";

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
            >
                {user.image ? (
                    <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center font-semibold">
                        {initial}
                    </div>
                )}
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.name}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-gray-500 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user.email}
                        </p>
                    </div>

                    <Link
                        href="/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        <span>👤</span>
                        <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                        onClick={() => {
                            setOpen(false);
                            onLogout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        <span>↩</span>
                        <span>সাইন আউট</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;