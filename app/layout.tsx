import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AutoPrice",
  description: "Automações da Pricemet",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR"className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}<Toaster position="top-right" /></body>
    </html>
  );
}
