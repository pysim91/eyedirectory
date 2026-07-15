import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const translateInitScript = `
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'ar,zh-CN,nl,en,fr,de,it,pl,pt,es',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    }, 'google_translate_element');
  }

  (function () {
    var originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) return child;
      return originalRemoveChild.apply(this, arguments);
    };
    var originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) return newNode;
      return originalInsertBefore.apply(this, arguments);
    };
  })();
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
      </head>
      <body className="flex min-h-screen flex-col">
        <div id="google_translate_element" className="notranslate hidden" />
        <Script id="translate-init" strategy="afterInteractive">
          {translateInitScript}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
