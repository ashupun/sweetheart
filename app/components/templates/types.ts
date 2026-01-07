import type { Profile } from "@/lib/types";

export interface TemplateProps {
  profile: Profile | null;
  links: { id: string; title: string; url: string; enabled?: boolean | null }[];
  theme: { primary: string; secondary: string; bg: string };
  showSocials: boolean;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  vibe: string;
  previewBg: string;
  previewAccent: string;
  tags?: string[];
}

