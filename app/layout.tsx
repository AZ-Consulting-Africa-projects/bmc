import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BMC",
  description: "business management central app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className + "bg-gray-50"}>
        <ReduxProvider>
          <AntdRegistry>
            {children}
            <Toaster/>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
