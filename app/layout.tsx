import type { Metadata } from "next";
import { Poppins, Fredoka } from "next/font/google";
import { Databuddy } from "@databuddy/sdk/react";
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
      document.documentElement.style.colorScheme = 'light dark';
      var theme = localStorage.getItem('theme');
      var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
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
        <style dangerouslySetInnerHTML={{ __html: `
          html { background-color: #fdf5f3; }
          html.dark { background-color: #1a1a1a; }
        `}} />
      </head>
      <body className={`${poppins.variable} ${fredoka.variable} font-sans antialiased bg-[#fdf5f3] dark:bg-[#1a1a1a] transition-colors`}>
        <Databuddy
          clientId="dadda45c-2adf-4db9-911b-4ae9f1f1de4e"
          trackWebVitals
          trackOutgoingLinks
          trackErrors
          enableBatching
          disabled={process.env.NODE_ENV === "development"}
        />
        {children}
      </body>
    </html>
  );
}
