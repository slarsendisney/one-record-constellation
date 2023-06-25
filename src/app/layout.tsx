import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { AnimationProvider } from "@/providers/AnimationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Constellation",
  description: "Navigate the ONE Record API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-one-record-dark">
        <AnimationProvider>
          <body className={inter.className}>{children}</body>
        </AnimationProvider>
      </html>
    </ClerkProvider>
  );
}
