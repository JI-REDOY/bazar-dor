import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/shared/ToastContainer";

const notoSerifBengali = Noto_Serif_Bengali({
    variable: "--font-noto-serif-bengali",
    subsets: ["bengali", "latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    description:
        "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত।",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="bn">
            <body className={`${notoSerifBengali.variable} antialiased`}>
                <ToastProvider>
                    <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <ToastContainer />
                </ToastProvider>
            </body>
        </html>
    );
}