import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import AntdRegistry from "@/lib/AntdRegistry";

import Header from "@/components/admin/Header";
import StoreProvider from "@/providers/StoreProvider";
import AntdProvider from "@/providers/AntdProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "#ccc" }}>
        <StoreProvider>
          <AntdProvider>
            <AntdRegistry>
              <Header />
              {children}
            </AntdRegistry>
          </AntdProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
