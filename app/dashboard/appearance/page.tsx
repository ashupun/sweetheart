"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../../components/ThemeToggle";

const themes = [
  { id: "pink", name: "Pink Dreams", colors: ["#ec4899", "#db2777", "#fce7f3"], textPrimary: "#831843", textSecondary: "#be185d" },
  { id: "lavender", name: "Lavender Mist", colors: ["#a78bfa", "#8b5cf6", "#ede9fe"], textPrimary: "#4c1d95", textSecondary: "#6d28d9" },
  { id: "mint", name: "Mint Fresh", colors: ["#34d399", "#10b981", "#d1fae5"], textPrimary: "#064e3b", textSecondary: "#047857" },
  { id: "peach", name: "Peach Sunset", colors: ["#fb923c", "#f97316", "#ffedd5"], textPrimary: "#7c2d12", textSecondary: "#c2410c" },
  { id: "ocean", name: "Ocean Breeze", colors: ["#38bdf8", "#0ea5e9", "#e0f2fe"], textPrimary: "#0c4a6e", textSecondary: "#0369a1" },
  { id: "rose", name: "Rose Gold", colors: ["#f472b6", "#ec4899", "#fdf2f8"], textPrimary: "#831843", textSecondary: "#be185d" },
  { id: "galaxy", name: "Galaxy Night", colors: ["#818cf8", "#6366f1", "#1e1b4b"], textPrimary: "#e0e7ff", textSecondary: "#c7d2fe" },
  { id: "sakura", name: "Sakura Bloom", colors: ["#fda4af", "#fb7185", "#fff1f2"], textPrimary: "#881337", textSecondary: "#be123c" },
];

const gradientThemes = [
  { id: "cotton-candy", name: "Cotton Candy", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)", colors: ["#ff9a9e", "#fecfef", "#fff5f7"], textPrimary: "#831843", textSecondary: "#be185d" },
  { id: "unicorn", name: "Unicorn Magic", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 50%, #f6ceec 100%)", colors: ["#a18cd1", "#fbc2eb", "#fef6ff"], textPrimary: "#4c1d95", textSecondary: "#7c3aed" },
  { id: "sunset-vibes", name: "Sunset Vibes", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", colors: ["#fa709a", "#fee140", "#fff9e6"], textPrimary: "#7c2d12", textSecondary: "#9a3412" },
  { id: "mermaid", name: "Mermaid Tail", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", colors: ["#667eea", "#764ba2", "#fdf4ff"], textPrimary: "#1e1b4b", textSecondary: "#4338ca" },
  { id: "aurora", name: "Aurora Glow", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", colors: ["#4facfe", "#00f2fe", "#e6fffe"], textPrimary: "#0c4a6e", textSecondary: "#0e7490" },
  { id: "fairy-dust", name: "Fairy Dust", gradient: "linear-gradient(135deg, #f5576c 0%, #f093fb 50%, #f5576c 100%)", colors: ["#f5576c", "#f093fb", "#fff0f3"], textPrimary: "#831843", textSecondary: "#be185d" },
  { id: "dreamy-clouds", name: "Dreamy Clouds", gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", colors: ["#e0c3fc", "#8ec5fc", "#f5f9ff"], textPrimary: "#3730a3", textSecondary: "#4f46e5" },
  { id: "holographic", name: "Holographic", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #ffd700 50%, #4facfe 75%, #f093fb 100%)", colors: ["#f093fb", "#ffd700", "#fff0fb"], textPrimary: "#581c87", textSecondary: "#7e22ce" },
];

const buttonStyles = [
  { id: "rounded", name: "Rounded", preview: "rounded-2xl" },
  { id: "pill", name: "Pill", preview: "rounded-full" },
  { id: "sharp", name: "Sharp", preview: "rounded-lg" },
  { id: "soft", name: "Soft", preview: "rounded-xl" },
];

const fontOptions = [
  { id: "poppins", name: "Poppins", class: "font-sans" },
  { id: "fredoka", name: "Fredoka", class: "font-display" },
];

export default function AppearancePage() {
  const [selectedTheme, setSelectedTheme] = useState("pink");
  const [selectedGradient, setSelectedGradient] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState("rounded");
  const [selectedFont, setSelectedFont] = useState("poppins");
  const [showBackground, setShowBackground] = useState(true);
  const [showSocialIcons, setShowSocialIcons] = useState(true);

  const currentTheme = selectedGradient
    ? gradientThemes.find(t => t.id === selectedGradient)
    : themes.find(t => t.id === selectedTheme);
  const currentGradient = selectedGradient ? gradientThemes.find(t => t.id === selectedGradient) : null;

  const selectTheme = (id: string) => {
    setSelectedTheme(id);
    setSelectedGradient(null);
  };

  const selectGradient = (id: string) => {
    setSelectedGradient(id);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full blur-3xl opacity-30 animate-float-slow" />
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-pink-200 to-pink-300 rounded-full blur-3xl opacity-20 animate-float" />
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 glass border-r border-pink-200 p-6 hidden lg:block">
        <Link href="/" className="text-2xl font-bold gradient-text font-display block mb-8">
          sweetheart
        </Link>

        <nav className="space-y-2">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-pink-700 hover:bg-pink-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Links
          </a>
          <a href="/dashboard/appearance" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-100 text-pink-900 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Appearance
          </a>
          <a href="/dashboard/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-pink-700 hover:bg-pink-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </a>
          <a href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-pink-700 hover:bg-pink-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-pink-600 text-sm mb-2">Your page is live at:</p>
            <a href="/sakura" target="_blank" className="text-pink-800 font-medium hover:text-pink-900 break-all">
              sweetheart.link/sakura
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 glass border-b border-pink-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              <Link href="/" className="text-xl font-bold gradient-text font-display">
                sweetheart
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-pink-900 hidden lg:block font-display">Appearance</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a href="/sakura" target="_blank" className="btn-secondary px-4 py-2 rounded-full text-sm font-medium text-pink-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </a>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Settings Panel */}
              <div className="lg:col-span-3 space-y-6">
                {/* Themes Section */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-pink-900 mb-4 font-display flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Themes
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => selectTheme(theme.id)}
                        className={`relative p-3 rounded-xl border-2 transition-all ${
                          selectedTheme === theme.id && !selectedGradient
                            ? "border-pink-500 bg-pink-50"
                            : "border-pink-200 hover:border-pink-300"
                        }`}
                      >
                        <div className="flex gap-1 mb-2">
                          {theme.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <p className="text-xs font-medium text-pink-800 truncate">{theme.name}</p>
                        {selectedTheme === theme.id && !selectedGradient && (
                          <div className="absolute top-2 right-2">
                            <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gradient Themes Section - Pro */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-pink-900 mb-4 font-display flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Gradient Themes
                    <span className="ml-auto text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-0.5 rounded-full">
                      Pro
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {gradientThemes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => selectGradient(theme.id)}
                        className={`relative p-3 rounded-xl border-2 transition-all ${
                          selectedGradient === theme.id
                            ? "border-pink-500 bg-pink-50"
                            : "border-pink-200 hover:border-pink-300"
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded-lg mb-2"
                          style={{ background: theme.gradient }}
                        />
                        <p className="text-xs font-medium text-pink-800 truncate">{theme.name}</p>
                        {selectedGradient === theme.id && (
                          <div className="absolute top-2 right-2">
                            <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Button Style Section */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-pink-900 mb-4 font-display flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                    </svg>
                    Button Style
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {buttonStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedButton(style.id)}
                        className={`p-4 border-2 transition-all ${
                          selectedButton === style.id
                            ? "border-pink-500 bg-pink-50"
                            : "border-pink-200 hover:border-pink-300"
                        } rounded-xl`}
                      >
                        <div
                          className={`w-full h-10 bg-gradient-to-r from-pink-400 to-pink-500 ${style.preview} mb-2`}
                        />
                        <p className="text-xs font-medium text-pink-800">{style.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Section */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-pink-900 mb-4 font-display flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    Font
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {fontOptions.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font.id)}
                        className={`p-4 border-2 transition-all ${
                          selectedFont === font.id
                            ? "border-pink-500 bg-pink-50"
                            : "border-pink-200 hover:border-pink-300"
                        } rounded-xl`}
                      >
                        <p className={`text-xl text-pink-900 mb-1 ${font.class}`}>{font.name}</p>
                        <p className={`text-xs text-pink-600 ${font.class}`}>The quick brown fox</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Options */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-pink-900 mb-4 font-display flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Display Options
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-pink-100">
                      <div>
                        <p className="font-medium text-pink-900">Animated Background</p>
                        <p className="text-sm text-pink-600">Show floating blobs animation</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showBackground}
                          onChange={(e) => setShowBackground(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-pink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-pink-900">Social Icons</p>
                        <p className="text-sm text-pink-600">Display social media icons below bio</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showSocialIcons}
                          onChange={(e) => setShowSocialIcons(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-pink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <button className="w-full btn-primary py-4 rounded-xl text-white font-semibold text-lg">
                  Save Changes
                </button>
              </div>

              {/* Preview Panel */}
              <div className="lg:col-span-2">
                <div className="sticky top-24">
                  <h3 className="text-sm font-medium text-pink-700 mb-3">Live Preview</h3>
                  <div
                    className="rounded-3xl overflow-hidden shadow-xl border-4 border-pink-200"
                    style={{
                      background: currentGradient
                        ? currentGradient.gradient
                        : currentTheme
                        ? `linear-gradient(135deg, ${currentTheme.colors[2]} 0%, ${currentTheme.colors[2]} 100%)`
                        : undefined
                    }}
                  >
                    <div className="p-6 min-h-[500px]">
                      {/* Preview Blobs */}
                      {showBackground && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                          <div
                            className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl"
                            style={{ backgroundColor: currentTheme?.colors[0] }}
                          />
                          <div
                            className="absolute bottom-10 -left-10 w-24 h-24 rounded-full blur-2xl"
                            style={{ backgroundColor: currentTheme?.colors[1] }}
                          />
                        </div>
                      )}

                      {/* Preview Avatar */}
                      <div className="text-center relative z-10">
                        <div
                          className="w-16 h-16 mx-auto mb-3 rounded-full p-0.5"
                          style={{ background: `linear-gradient(135deg, ${currentTheme?.colors[0]}, ${currentTheme?.colors[1]})` }}
                        >
                          <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center">
                            <span className="text-xl font-bold" style={{ color: currentTheme?.textPrimary }}>S</span>
                          </div>
                        </div>
                        <h4 className={`text-lg font-bold mb-1 ${selectedFont === 'fredoka' ? 'font-display' : ''}`} style={{ color: currentTheme?.textPrimary }}>Sakura</h4>
                        <p className="text-xs mb-3" style={{ color: currentTheme?.textSecondary }}>@sakura</p>
                        <p className={`text-xs mb-4 max-w-[180px] mx-auto ${selectedFont === 'fredoka' ? 'font-display' : ''}`} style={{ color: currentTheme?.textSecondary }}>
                          Gamer girl & pink enthusiast
                        </p>

                        {/* Preview Social Icons */}
                        {showSocialIcons && (
                          <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center"
                              >
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme?.textSecondary }} />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Preview Links */}
                        <div className="space-y-2">
                          {['My Twitch', 'YouTube', 'Discord'].map((link) => (
                            <div
                              key={link}
                              className={`bg-white/60 backdrop-blur-sm p-3 ${
                                buttonStyles.find(s => s.id === selectedButton)?.preview
                              }`}
                            >
                              <span className={`text-sm font-medium ${selectedFont === 'fredoka' ? 'font-display' : ''}`} style={{ color: currentTheme?.textPrimary }}>
                                {link}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
