import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import WizardIain from "@/components/people/WizardIain";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D&D Character Concept Builder",
  description: "Answer a few questions to build your D&D 5e character concept.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <div className="2xl:absolute w-full flex space-between px-4 pt-4">
        <WizardIain className="h-64 mr-auto"/>
        <WizardIain className="h-64 items-end" headClass="mr-[5%]" flip/>
      </div>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
