"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { ThemeToggle } from "../components/ThemeToggle";

interface DocItem {
  id: string;
  title: string;
  pro?: boolean;
}

interface Section {
  id: string;
  title: string;
  items: DocItem[];
}

const sections: Section[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      { id: "intro", title: "What is sweetheart?" },
      { id: "create-account", title: "Create Account" },
      { id: "setup-profile", title: "Setup Profile" },
      { id: "add-links", title: "Add Links" },
      { id: "share", title: "Share Your Page" },
    ],
  },
  {
    id: "customization",
    title: "Customization",
    items: [
      { id: "templates", title: "Templates" },
      { id: "themes", title: "Color Themes" },
      { id: "fonts", title: "Fonts" },
      { id: "buttons", title: "Button Styles" },
      { id: "socials", title: "Social Icons" },
    ],
  },
  {
    id: "pro",
    title: "Pro Features",
    items: [
      { id: "backgrounds", title: "Custom Backgrounds", pro: true },
      { id: "music", title: "Profile Music", pro: true },
      { id: "branding", title: "Remove Branding", pro: true },
      { id: "pro-templates", title: "Pro Templates", pro: true },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    items: [
      { id: "views", title: "Page Views" },
      { id: "clicks", title: "Link Clicks" },
      { id: "insights", title: "Visitor Insights" },
    ],
  },
  {
    id: "account",
    title: "Account",
    items: [
      { id: "email", title: "Change Email" },
      { id: "password", title: "Change Password" },
      { id: "delete", title: "Delete Account" },
    ],
  },
];

const docs: Record<string, { title: string; content: string }> = {
  "intro": {
    title: "What is sweetheart?",
    content: `sweetheart is a link-in-bio platform designed with aesthetics in mind ♡

**why sweetheart?**
we built sweetheart because existing link-in-bio tools felt generic and boring. we wanted something that feels personal, cute, and actually represents you.

**key features**
• beautiful templates designed for creatives
• clean, minimal interface
• fast and mobile-friendly
• privacy-focused analytics
• no ads, ever

**who is it for?**
anyone who wants a cute, customizable link page:
• content creators
• artists & designers
• musicians
• small business owners
• or just anyone who wants one link to rule them all ✨`,
  },
  "create-account": {
    title: "Create Account",
    content: `getting started takes less than a minute ♡

**steps**
1. go to sweethe.art/signup
2. enter your email address
3. create a password (min 8 characters)
4. choose your username
5. check your email for verification link
6. click the link and you're in!

**choosing a username**
• lowercase letters, numbers, underscores only
• minimum 3 characters
• this becomes your url: sweethe.art/username
• pick wisely - changing it later affects your links

**tips**
• use a real email (you'll need it for password reset)
• choose a memorable username
• keep your password secure`,
  },
  "setup-profile": {
    title: "Setup Profile",
    content: `your profile is how visitors see you ♡

**display name**
the name shown at the top of your page. can be:
• your real name
• a nickname
• your brand name
• anything you want!

**bio**
150 characters to describe yourself. make it count!
• keep it short and sweet
• emojis are encouraged ✨
• update it whenever you want

**avatar**
your profile picture. tips:
• square images work best
• minimum 200x200 pixels
• supports jpg, png, gif
• shows as a circle on your page`,
  },
  "add-links": {
    title: "Add Links",
    content: `links are the heart of your page ♡

**adding a link**
1. go to dashboard → links
2. click "+ add new link"
3. enter a title (what visitors see)
4. enter the url (where they go)
5. click "add link"

**managing links**
• toggle visibility with the switch
• edit by clicking the pencil icon
• delete with the trash icon
• drag to reorder (coming soon)

**link tips**
• keep titles short (under 30 chars)
• most important links go first
• use emojis to stand out ✨
• test your links after adding!

**url format**
• include https:// for external links
• we auto-detect if you forget
• supports any valid url`,
  },
  "share": {
    title: "Share Your Page",
    content: `time to share your link with the world ♡

**your url**
sweethe.art/yourusername

**where to use it**
• instagram bio
• twitter/x bio
• tiktok bio
• youtube about section
• email signatures
• anywhere you want!

**tips for sharing**
• add it to all your social bios
• mention it in your content
• include it in your email signature
• share it with friends

**qr codes**
qr code generation coming soon! perfect for:
• business cards
• posters
• merch
• events`,
  },
  "templates": {
    title: "Templates",
    content: `templates define the overall style of your page ♡

**free templates**

*minimal*
clean lines, lots of whitespace. perfect for a professional look.

*aesthetic*
dreamy vibes with soft gradients. for the soft girl aesthetic ✧

*glass*
modern glassmorphism with frosted effects. sleek and elegant.

*brutalist*
bold, raw design. makes a statement.

*kawaii*
super cute with playful elements. embrace the cuteness!

*y2k*
retro cyber vibes. back to the 2000s.

**pro templates**
upgrade to pro to unlock exclusive templates with unique designs and animations.

**switching templates**
1. go to dashboard → templates
2. click any template to preview
3. changes save automatically`,
  },
  "themes": {
    title: "Color Themes",
    content: `colors set the mood of your page ♡

**available themes**
• pink - classic sweetheart pink
• lavender - soft purple dreams
• mint - fresh and cool
• peach - warm and cozy
• ocean - calm blue vibes
• rose - elegant blush tones
• midnight - dark and moody
• sunset - warm oranges
• forest - natural greens

**changing themes**
1. go to dashboard → appearance
2. click any color
3. see instant preview
4. click "save changes"

**theme tips**
• match your brand colors
• consider accessibility
• test in light and dark mode
• your template affects how colors appear`,
  },
  "fonts": {
    title: "Fonts",
    content: `fonts add personality to your page ♡

**available fonts**

*mono*
clean monospace font. techy, modern vibes.
best for: minimal, brutalist templates

*sans*
friendly sans-serif. warm and approachable.
best for: aesthetic, kawaii templates

*serif*
elegant serif font. classic and refined.
best for: professional pages

**changing fonts**
1. go to dashboard → appearance
2. select a font
3. preview changes live
4. save when happy`,
  },
  "buttons": {
    title: "Button Styles",
    content: `customize how your link buttons look ♡

**available styles**

*rounded*
soft, rounded corners. friendly and approachable.

*pill*
fully rounded ends. modern and sleek.

*square*
sharp corners. bold and direct.

**changing button style**
1. go to dashboard → appearance
2. select button style
3. see live preview
4. save changes`,
  },
  "socials": {
    title: "Social Icons",
    content: `show your social presence ♡

**supported platforms**
• instagram
• twitter/x
• tiktok
• youtube
• github
• discord
• twitch
• linkedin
• spotify
• and more...

**adding socials**
1. go to dashboard → settings
2. add your social urls
3. icons appear below your bio

**display options**
• show/hide social icons
• toggle in appearance settings
• icons adapt to your theme`,
  },
  "backgrounds": {
    title: "Custom Backgrounds",
    content: `make your page truly unique ♡

**pro feature** - $5/month

**what you can do**
• upload custom background images
• choose animated backgrounds
• adjust blur and opacity
• gradient overlays

**image requirements**
• minimum 1920x1080 recommended
• max file size: 5mb
• formats: jpg, png, webp

**tips**
• lighter images for light themes
• test on mobile
• subtle patterns work well
• don't distract from your links`,
  },
  "music": {
    title: "Profile Music",
    content: `add a soundtrack to your page ♡

**pro feature** - $5/month

**how it works**
• visitors click to enter (no autoplay)
• music starts at 25% volume
• they can pause/adjust anytime
• shows song title on page

**adding music**
1. upgrade to pro
2. go to appearance settings
3. paste direct audio url (.mp3)
4. add song title
5. save changes

**tips**
• instrumental tracks work best
• keep files under 5mb
• consider your audience
• choose something that represents you`,
  },
  "branding": {
    title: "Remove Branding",
    content: `clean, unbranded pages ♡

**pro feature** - $5/month

**what gets removed**
• "made with sweetheart" badge
• powered by text in footer
• any sweetheart branding

**why remove it?**
• cleaner look
• more professional
• full ownership feel
• better for businesses

**how to remove**
1. upgrade to pro
2. go to settings
3. toggle off branding
4. save changes`,
  },
  "pro-templates": {
    title: "Pro Templates",
    content: `exclusive designs for pro users ♡

**pro feature** - $5/month

**what's special**
• unique designs not available for free
• advanced animations
• special effects
• early access to new templates

**current pro templates**
• neon - glowing cyberpunk vibes
• soft - ultra-minimal ethereal
• more coming soon...

**how to access**
1. upgrade to pro
2. go to templates
3. pro templates unlock automatically`,
  },
  "views": {
    title: "Page Views",
    content: `track your page performance ♡

**what we track**
• total page views
• views over time
• unique visitors

**privacy note**
we use privacy-focused analytics:
• no cookies
• no personal data
• aggregate stats only
• gdpr compliant

**viewing stats**
1. go to dashboard → analytics
2. see your view count
3. updated in real-time`,
  },
  "clicks": {
    title: "Link Clicks",
    content: `see which links perform best ♡

**what we track**
• total clicks per link
• click-through rate
• which links are popular

**using click data**
• put popular links higher
• remove links nobody clicks
• test different titles
• optimize your page

**viewing clicks**
1. go to dashboard → analytics
2. see clicks per link
3. identify top performers`,
  },
  "insights": {
    title: "Visitor Insights",
    content: `understand your audience ♡

**what we track**
• referral sources (where visitors come from)
• device types (mobile vs desktop)
• browser info
• geographic regions

**privacy first**
• no personal identification
• aggregate data only
• no tracking cookies
• fully anonymous

**using insights**
• optimize for mobile if mostly mobile visitors
• see which platforms drive traffic
• understand your audience better`,
  },
  "email": {
    title: "Change Email",
    content: `update your email address ♡

**how to change**
currently, email changes require support assistance.

**contact us**
join our discord and open a support ticket with:
• your current email
• your desired new email
• your username

**verification**
• we'll verify your identity
• send confirmation to both emails
• update within 24 hours

**why this process?**
• security protection
• prevent unauthorized changes
• keep your account safe`,
  },
  "password": {
    title: "Change Password",
    content: `update your password ♡

**change password**
1. go to settings
2. click "change" next to password
3. or go to /forgot directly

**reset via email**
1. go to /forgot
2. enter your email
3. check inbox for reset link
4. click link and set new password

**password requirements**
• minimum 8 characters
• mix of letters and numbers recommended
• don't reuse passwords

**tips**
• use a password manager
• don't share your password
• update regularly`,
  },
  "delete": {
    title: "Delete Account",
    content: `we're sad to see you go ♡

**what gets deleted**
• your profile page
• all your links
• your account data
• your username (released)

**what stays**
• aggregate anonymous analytics
• nothing personally identifiable

**how to delete**
1. go to dashboard → settings
2. scroll to danger zone
3. click "delete account"
4. confirm deletion

**important**
• this cannot be undone
• your username becomes available
• cancel pro subscription first
• export your data if needed`,
  },
};

const allItems = sections.flatMap(s => s.items.map(item => ({ ...item, section: s.title })));

function SidebarSection({
  section,
  activeDoc,
  onSelect,
  defaultOpen = false
}: {
  section: Section;
  activeDoc: string;
  onSelect: (id: string) => void;
  defaultOpen?: boolean;
}) {
  const hasActiveItem = section.items.some(item => item.id === activeDoc);
  const [open, setOpen] = useState(defaultOpen || hasActiveItem);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 py-2 text-sm text-[#1a1a1a] dark:text-white hover:text-pink-500 dark:hover:text-pink-500 transition-colors"
      >
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className={hasActiveItem ? "text-pink-500" : ""}>{section.title}</span>
      </button>
      {open && (
        <div className="ml-5 border-l border-gray-200 dark:border-gray-800 pl-3 space-y-0.5">
          {section.items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full text-left py-1.5 text-sm transition-colors flex items-center gap-2 ${activeDoc === item.id
                ? "text-pink-500"
                : "text-gray-500 hover:text-[#1a1a1a] dark:hover:text-white"
                }`}
            >
              {item.title}
              {item.pro && (
                <span className="text-[9px] px-1.5 py-0.5 bg-pink-500/10 text-pink-500 rounded-full">
                  pro
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState("intro");
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const currentDoc = docs[activeDoc];
  const currentItem = allItems.find(i => i.id === activeDoc);
  const isPro = currentItem?.pro === true;

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allItems.filter(item => {
      const doc = docs[item.id];
      return item.title.toLowerCase().includes(q) || doc?.content.toLowerCase().includes(q);
    }).slice(0, 5);
  }, [search]);

  const handleSelectDoc = (id: string) => {
    setActiveDoc(id);
    setMobileNav(false);
  };

  const handleSelectResult = (id: string) => {
    setActiveDoc(id);
    setSearch("");
    setSearchFocused(false);
    setMobileNav(false);
  };

  return (
    <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] font-mono transition-colors">
      <nav className="h-[57px] px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-[#fdf5f3]/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/sweethearticon.png" alt="" width={18} height={18} />
            <span className="text-sm font-medium text-[#1a1a1a] dark:text-white hidden sm:inline">
              sweethe<span className="text-pink-500">.</span>art
            </span>
          </Link>
          <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">/</span>
          <span className="text-sm text-pink-500 hidden sm:inline">docs</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="search..."
              className="w-32 sm:w-48 px-3 py-1.5 text-xs bg-gray-100 dark:bg-[#252525] border-0 text-[#1a1a1a] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500/50"
            />
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-800 shadow-lg z-50">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectResult(item.id)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <span className="text-[#1a1a1a] dark:text-white">{item.title}</span>
                    <span className="text-gray-400 ml-2">{item.section}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setMobileNav(!mobileNav)}
            className="lg:hidden text-gray-400 hover:text-pink-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </nav>

      <div className="flex">
        <aside className={`${mobileNav ? 'fixed inset-0 z-40 bg-[#fdf5f3] dark:bg-[#1a1a1a] pt-[57px]' : 'hidden'} lg:block lg:fixed lg:left-0 lg:top-[57px] lg:bottom-0 lg:w-60 lg:border-r lg:border-gray-200 lg:dark:border-gray-800 overflow-y-auto`}>
          {mobileNav && (
            <button
              onClick={() => setMobileNav(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <div className="p-5">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-4">Documentation</p>
            {sections.map((section, i) => (
              <SidebarSection
                key={section.id}
                section={section}
                activeDoc={activeDoc}
                onSelect={handleSelectDoc}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </aside>

        <main className="flex-1 lg:ml-60 px-6 py-12 max-w-2xl">
          {isPro && (
            <div className="mb-6 px-3 py-2 border border-pink-500/30 bg-pink-50 dark:bg-pink-500/5 inline-flex items-center gap-2">
              <span className="text-[10px] text-pink-500">pro feature</span>
            </div>
          )}

          <h1 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-8">
            {currentDoc?.title}
          </h1>

          <article className="space-y-4">
            {currentDoc?.content.split("\n\n").map((paragraph, i) => (
              <div key={i} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph.split("\n").map((line, j) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={j} className="text-[#1a1a1a] dark:text-white font-medium mt-6 mb-2 first:mt-0">
                        {line.slice(2, -2)}
                      </p>
                    );
                  }
                  if (line.startsWith("*") && line.endsWith("*")) {
                    return (
                      <p key={j} className="text-pink-500 mt-4 mb-1">
                        {line.slice(1, -1)}
                      </p>
                    );
                  }
                  if (line.startsWith("• ")) {
                    return <p key={j} className="pl-4 text-gray-500 dark:text-gray-400">{line}</p>;
                  }
                  if (line.match(/^\d\./)) {
                    return <p key={j} className="pl-4 text-gray-500 dark:text-gray-400">{line}</p>;
                  }
                  return <p key={j}>{line}</p>;
                })}
              </div>
            ))}
          </article>

          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              need help? <a href="https://discord.gg/ZxK7XmHyBG" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">join our discord</a>
            </p>
            <Link href="/signup" className="text-xs text-pink-500 hover:text-pink-400">
              get started →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
