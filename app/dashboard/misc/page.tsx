"use client";

import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Sidebar, useSidebarWidth } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { getProfileData, getLinks } from "../actions";
import type { Profile, Link } from "@/lib/types";

export default function MiscPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [qrColor, setQrColor] = useState("#ec4899");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const [profileData, linksData] = await Promise.all([
        getProfileData(),
        getLinks(),
      ]);
      setProfile(profileData);
      setLinks(linksData);
      setLoading(false);
    }
    load();
  }, []);

  const sidebarWidth = useSidebarWidth();
  const profileUrl = `https://sweethe.art/${profile?.username}`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    canvas.width = 512;
    canvas.height = 512;
    
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 512, 512);
        ctx.drawImage(img, 0, 0, 512, 512);
        const link = document.createElement("a");
        link.download = `${profile?.username}-qr.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(data)));
  };

  const exportLinks = (format: "json" | "csv") => {
    const data = links.map(l => ({
      title: l.title,
      url: l.url,
      enabled: l.enabled,
    }));

    let content: string;
    let filename: string;
    let type: string;

    if (format === "json") {
      content = JSON.stringify(data, null, 2);
      filename = `${profile?.username}-links.json`;
      type = "application/json";
    } else {
      content = "title,url,enabled\n" + data.map(l => `"${l.title}","${l.url}",${l.enabled}`).join("\n");
      filename = `${profile?.username}-links.csv`;
      type = "text/csv";
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  const embedCode = `<iframe src="${profileUrl}/embed" width="400" height="600" frameborder="0"></iframe>`;

  const shareLinks = [
    { name: "twitter", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent("check out my link page ♡")}` },
    { name: "whatsapp", url: `https://wa.me/?text=${encodeURIComponent(profileUrl)}` },
    { name: "telegram", url: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}` },
    { name: "email", url: `mailto:?subject=${encodeURIComponent("my sweetheart page")}&body=${encodeURIComponent(profileUrl)}` },
  ];

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <Sidebar active="misc" username={profile?.username} />
      <div className={`${sidebarWidth} min-h-screen transition-all duration-200`}>
        <Header title="misc" username={profile?.username} />
        <main className="p-6 lg:p-8 max-w-2xl">
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">qr code</h2>
            <div className="flex flex-col sm:flex-row gap-8">
              <div 
                ref={qrRef}
                className="bg-white p-4 rounded-lg inline-block"
              >
                <QRCodeSVG
                  value={profileUrl}
                  size={160}
                  fgColor={qrColor}
                  bgColor="#ffffff"
                  level="H"
                  imageSettings={{
                    src: "/sweethearticon.png",
                    height: 32,
                    width: 32,
                    excavate: true,
                  }}
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">color</label>
                  <div className="flex gap-2">
                    {["#ec4899", "#a78bfa", "#34d399", "#f97316", "#1a1a1a"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setQrColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${qrColor === color ? "border-gray-400 scale-110" : "border-transparent"}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={downloadQR}
                  className="px-4 py-2 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors"
                >
                  download png
                </button>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">share</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={profileUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-[#252525] text-sm text-[#1a1a1a] dark:text-white border-0"
                />
                <button
                  onClick={() => copyToClipboard(profileUrl, "url")}
                  className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 hover:border-pink-500 hover:text-pink-500 transition-colors"
                >
                  {copied === "url" ? "copied!" : "copy"}
                </button>
              </div>
              <div className="flex gap-2">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-pink-500 hover:text-pink-500 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">embed</h2>
            <div className="space-y-4">
              <p className="text-xs text-gray-400">add your profile to any website</p>
              <div className="relative">
                <pre className="p-3 bg-gray-100 dark:bg-[#252525] text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                  {embedCode}
                </pre>
                <button
                  onClick={() => copyToClipboard(embedCode, "embed")}
                  className="absolute top-2 right-2 px-2 py-1 text-[10px] border border-gray-300 dark:border-gray-600 hover:border-pink-500 hover:text-pink-500 transition-colors bg-white dark:bg-[#1a1a1a]"
                >
                  {copied === "embed" ? "copied!" : "copy"}
                </button>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">export</h2>
            <p className="text-xs text-gray-400 mb-4">download your links</p>
            <div className="flex gap-2">
              <button
                onClick={() => exportLinks("json")}
                className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 hover:border-pink-500 hover:text-pink-500 transition-colors"
              >
                export json
              </button>
              <button
                onClick={() => exportLinks("csv")}
                className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 hover:border-pink-500 hover:text-pink-500 transition-colors"
              >
                export csv
              </button>
            </div>
            {links.length > 0 && (
              <p className="text-[10px] text-gray-400 mt-2">{links.length} links will be exported</p>
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">preview</h2>
            <p className="text-xs text-gray-400 mb-4">how your link looks when shared</p>
            <div className="p-4 bg-gray-100 dark:bg-[#252525] rounded-lg max-w-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-500/20 rounded flex items-center justify-center text-pink-500">
                  ♡
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1a1a1a] dark:text-white truncate">
                    {profile?.displayName || profile?.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{profile?.bio || "my sweetheart page"}</p>
                  <p className="text-[10px] text-gray-400 mt-1">sweethe.art</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
}

