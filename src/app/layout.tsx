import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GiftBalloon - Premium Balloon Arrangements & Party Decorations",
  description: "Create magical moments with our beautiful balloon arrangements for weddings, birthdays, graduations, and corporate events. Professional balloon decorating services across the UK.",
  keywords: "balloons, party decorations, wedding balloons, birthday balloons, balloon arrangements, UK balloon delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Layout>
            {children}
          </Layout>
        </CartProvider>
      </body>
    </html>
  );
}
