"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";

const sections = [
  {
    id: "getting-started",
    title: "getting started",
    items: [
      { id: "create-account", title: "create your account" },
      { id: "setup-profile", title: "setup your profile" },
      { id: "add-links", title: "add your links" },
    ],
  },
  {
    id: "customization",
    title: "customization",
    items: [
      { id: "templates", title: "choosing a template" },
      { id: "themes", title: "color themes" },
      { id: "fonts", title: "typography" },
    ],
  },
  {
    id: "pro-features",
    title: "pro features",
    items: [
      { id: "backgrounds", title: "custom backgrounds" },
      { id: "music", title: "profile music" },
      { id: "animations", title: "animations" },
    ],
  },
];

const docs: Record<string, { title: string; content: string; pro?: boolean }> = {
  "create-account": {
    title: "create your account",
    content: `signing up for sweetheart is quick and easy ♡

1. go to **sweethe.art/signup**
2. enter your email and create a password
3. verify your email (check your inbox!)
4. you're in! ✨

your account gives you access to:
- your own profile page at sweethe.art/username
- unlimited links
- 6 beautiful templates
- 9 color themes
- and so much more...`,
  },
  "setup-profile": {
    title: "setup your profile",
    content: `make your profile uniquely you ♡

**display name**
this is what visitors see at the top of your page. can be your real name, username, or anything you want!

**username**
your unique url: sweethe.art/username
- lowercase letters, numbers, and underscores only
- minimum 3 characters

**bio**
tell people about yourself in 150 characters or less. emojis encouraged! ✨

**avatar**
your profile picture shows in a circle. we recommend square images for best results.`,
  },
  "add-links": {
    title: "add your links",
    content: `links are the heart of your page ♡

**adding a link**
1. go to your dashboard
2. click "add new link"
3. enter a title and url
4. click "add link"

**managing links**
- drag to reorder (coming soon)
- toggle visibility with the switch
- edit anytime by clicking the pencil icon
- delete links you no longer need

**tips**
- keep titles short and clear
- put your most important links first
- use emojis to make them stand out ✨`,
  },
  "templates": {
    title: "choosing a template",
    content: `templates change the entire vibe of your page ♡

**available templates**

*minimal* - clean lines, lots of whitespace. perfect for a professional look.

*aesthetic* - dreamy blurs and sparkles. for the soft girl in you ✧

*glass* - modern glassmorphism with frosted cards. sleek and elegant.

*brutalist* - bold, raw, and unapologetic. makes a statement.

*kawaii* - super cute with emojis and decorations. embrace the cuteness!

*y2k* - retro cyber vibes with neon glows. back to the future.

**changing templates**
1. go to dashboard → templates
2. click any template to preview
3. click "apply style" to save`,
  },
  "themes": {
    title: "color themes",
    content: `colors set the mood ♡

**available themes**
- pink dreams - classic sweetheart pink
- lavender - soft purple dreams
- mint - fresh and cool
- peach - warm and cozy
- ocean - calm blue vibes
- rose gold - elegant pink
- midnight - dark and moody
- sunset - warm reds
- forest - natural greens

**changing themes**
1. go to dashboard → appearance
2. click any color palette
3. see the live preview
4. click "save changes"`,
  },
  "fonts": {
    title: "typography",
    content: `fonts add personality ♡

**available fonts**

*mono* - clean monospace font. techy and modern.

*sans* - friendly sans-serif. warm and approachable.

**tips**
- mono works great with minimal and brutalist templates
- sans pairs well with aesthetic and kawaii
- preview both before deciding!`,
  },
  "backgrounds": {
    title: "custom backgrounds",
    content: `make your page truly unique with custom backgrounds ♡

**pro feature** - $5/month

with pro, you can:
- upload custom background images
- choose from animated backgrounds
- adjust opacity and blur

**best practices**
- use high-quality images (at least 1920x1080)
- lighter images work better with light themes
- test on mobile too!`,
    pro: true,
  },
  "music": {
    title: "profile music",
    content: `add a soundtrack to your page ♡

**pro feature** - $5/month

share your vibe with background music!

**how it works**
- visitors must click to enter (no autoplay)
- music starts at 25% volume
- they can pause/adjust anytime

**adding music**
1. upgrade to pro
2. go to appearance → music
3. paste a direct audio url (.mp3)
4. save changes

**tips**
- choose something that represents you
- instrumental tracks work best
- keep file sizes small for fast loading`,
    pro: true,
  },
  "animations": {
    title: "animations",
    content: `bring your page to life ♡

**pro feature** - $5/month

add subtle animations to make your page feel alive:

- floating background elements
- smooth hover effects
- entrance animations
- particle effects

coming soon: more animation options and customization!`,
    pro: true,
  },
};

export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState("create-account");
  const currentDoc = docs[activeDoc];

  return (
    <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] font-mono transition-colors">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#fdf5f3]/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between max-w-6xl mx-auto text-xs tracking-wide">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-medium text-[#1a1a1a] dark:text-white">
              sweethe<span className="text-pink-500">.</span>art
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-pink-500">docs</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-gray-500 hover:text-pink-500 transition-colors">pricing</Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="pt-20 flex">
        <aside className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 p-6 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
          <nav className="space-y-6">
            {sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveDoc(item.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          activeDoc === item.id
                            ? "bg-pink-50 dark:bg-pink-500/10 text-pink-500"
                            : "text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                        }`}
                      >
                        {item.title}
                        {docs[item.id]?.pro && (
                          <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-pink-100 dark:bg-pink-500/20 text-pink-500 rounded">
                            pro
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 lg:ml-64 p-6 lg:p-12">
          <div className="max-w-2xl mx-auto">
            {currentDoc?.pro && (
              <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-500/10 dark:to-purple-500/10 rounded-xl border border-pink-200 dark:border-pink-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 bg-pink-500 text-white rounded-full font-medium">pro</span>
                  <span className="text-sm text-pink-600 dark:text-pink-400">this is a pro feature</span>
                </div>
              </div>
            )}

            <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-8">
              {currentDoc?.title}
            </h1>

            <div className="prose prose-sm dark:prose-invert max-w-none">
              {currentDoc?.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {paragraph.split("\n").map((line, j) => (
                    <span key={j}>
                      {line.startsWith("**") && line.endsWith("**") ? (
                        <strong className="text-[#1a1a1a] dark:text-white font-medium">
                          {line.slice(2, -2)}
                        </strong>
                      ) : line.startsWith("*") && line.endsWith("*") ? (
                        <em className="text-pink-500">{line.slice(1, -1)}</em>
                      ) : line.startsWith("- ") ? (
                        <span className="block pl-4">• {line.slice(2)}</span>
                      ) : line.match(/^\d\./) ? (
                        <span className="block pl-4">{line}</span>
                      ) : (
                        line
                      )}
                      {j < paragraph.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                need help? reach out at{" "}
                <a href="mailto:hi@sweethe.art" className="text-pink-500 hover:text-pink-400">
                  hi@sweethe.art
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

