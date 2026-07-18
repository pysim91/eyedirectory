import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const plausibleInitScript = `
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
`;

const themeInitScript = `
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = stored ? stored === 'dark' : systemDark;
      if (isDark) document.documentElement.classList.add('dark');

      var textSize = localStorage.getItem('textSize');
      if (textSize === 'large' || textSize === 'larger') {
        document.documentElement.setAttribute('data-text-size', textSize);
      }
    } catch (e) {}
  })();
`;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emergency Eye Care Directory | UK Eye Casualty & Ophthalmology Services",
  description:
    "A UK-wide directory of eye casualty and emergency ophthalmology services for clinicians. Search by hospital, city, or region and check walk-in, booked-referral, or no-service status before referring.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script
          async
          src="https://plausible.io/js/pa-HN1U-3TvsxhFkU_SoJtyV.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {plausibleInitScript}
        </Script>
      </head>
      <body className="flex min-h-screen flex-col">
        <div id="google_translate_element" className="notranslate hidden" />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
