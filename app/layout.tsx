import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "OMI ENTERPRISE | Suppliers & Construction",
    template: "%s | OMI ENTERPRISE",
  },
  description:
    "OMI ENTERPRISE provides construction services and quality supply solutions in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <SmoothScroll>
            <Navbar />
            <main className="pt-16 lg:pt-20">{children}</main>
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}