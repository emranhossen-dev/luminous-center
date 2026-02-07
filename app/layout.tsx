import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { EnrollmentProvider } from "@/context/EnrollmentContext";

export const metadata: Metadata = {
  title: "Luminous - দক্ষতা অর্জনের সেরা ঠিকানা",
  description: "আপনার ক্যারিয়ারের পরবর্তী ধাপের জন্য প্রস্তুত হোন। ইন্ডাস্ট্রি এক্সপার্টদের কাছ থেকে শিখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <EnrollmentProvider>
            <Navbar />
            {children}
            <Footer />
          </EnrollmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
