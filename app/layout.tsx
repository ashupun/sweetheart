import type { Metadata } from "next";
import { Poppins, Fredoka } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sweetheart | Your Cute Link-in-Bio",
  description: "Create your dreamy pink profile page. Perfect for girlies, gamers, and pink business owners.",
};

const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${poppins.variable} ${fredoka.variable} font-sans antialiased`}>
        {children}
        <Script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-client-id="dadda45c-2adf-4db9-911b-4ae9f1f1de4e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
