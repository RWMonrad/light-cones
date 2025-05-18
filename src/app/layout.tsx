import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Light Cones",
  description: "Utforsk, utfordre og lek med lysets grenser og relativitet!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-black min-h-screen">
        <nav className="w-full flex items-center justify-center gap-6 py-6 bg-gradient-to-b from-black via-indigo-950 to-transparent mb-8 shadow-lg z-10">
          <Link href="/" className="text-white hover:text-blue-300 text-lg font-bold font-sans transition">Home</Link>
          <Link href="/simulation-lab" className="text-indigo-200 hover:text-white text-lg font-bold font-sans transition">Simulation Lab</Link>
          <Link href="/challenge-arena" className="text-purple-200 hover:text-white text-lg font-bold font-sans transition">Challenge Arena</Link>
          <Link href="/knowledge-portal" className="text-blue-200 hover:text-white text-lg font-bold font-sans transition">Knowledge Portal</Link>
          <Link href="/technology" className="text-emerald-200 hover:text-white text-lg font-bold font-sans transition">Technology</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
