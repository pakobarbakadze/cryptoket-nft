import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

import "@/styles/globals.css";
import { NFTProvider } from "@/context/NFTContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NFTProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen relative">
          <Navbar />
          <div className="pt-[65px] pb-[366px] md:pb-[564px]">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>

        <Script
          src="https://kit.fontawesome.com/e68b2bd531.js"
          crossOrigin="anonymous"
        ></Script>
      </ThemeProvider>
    </NFTProvider>
  );
}
