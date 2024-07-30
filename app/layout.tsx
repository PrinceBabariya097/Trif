import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trif",
  description: "video calling app",
  icons:{
    icon:'/icons/logo.svg'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/icons/logo.svg",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorBackground: "#1C1F2E",
          colorPrimary: "#0E78F9",
          colorText: "#FFFFFF",
          colorInputBackground: "#252A41",
          colorInputText: "#FFFFFF",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-2`}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
