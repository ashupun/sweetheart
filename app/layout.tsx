import type { Metadata, Viewport } from "next";
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
  title: {
    default: "sweetheart | your cute link-in-bio",
    template: "%s | sweetheart",
  },
  description: "create your dreamy profile page. the prettiest link-in-bio for everyone ♡",
  keywords: ["link in bio", "linktree alternative", "profile page", "social links", "aesthetic", "cute"],
  authors: [{ name: "sweetheart", url: "https://sweethe.art" }],
  creator: "sweetheart",
  metadataBase: new URL("https://sweethe.art"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sweethe.art",
    siteName: "sweetheart",
    title: "sweetheart | your cute link-in-bio",
    description: "create your dreamy profile page. the prettiest link-in-bio for everyone ♡",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "sweetheart - your cute link-in-bio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "sweetheart | your cute link-in-bio",
    description: "create your dreamy profile page. the prettiest link-in-bio for everyone ♡",
    images: ["/og.png"],
    creator: "@ashubun",
  },
  icons: {
    icon: "/sweethearticon.png",
    shortcut: "/sweethearticon.png",
    apple: "/sweethearticon.png",
  },
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#ec4899",
  },
};

export const viewport: Viewport = {
  themeColor: "#ec4899",
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
