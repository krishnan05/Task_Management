import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap", // Ensures better rendering while loading
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Task Management Application",
  description: "Efficiently manage your tasks with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-gray-100 text-gray-900 font-sans"
        style={{
          fontFamily: "var(--font-geist-sans), sans-serif",
        }}
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-3xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
