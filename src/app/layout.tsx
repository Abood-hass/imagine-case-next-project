import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Provider from '../components/ui/provider'

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImagienCase - Create your own Case",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className} id="root">
        <NavBar />
        <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex flex-1 flex-col h-full">
            <Provider>
              {children}
            </Provider>
          </div>
          <Footer />
          <Toaster />
        </main>
      </body>
    </html>
  );
}
