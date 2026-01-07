export interface Feature {
  id: string;
  name: string;
  description: string;
  pro: boolean;
  category: "appearance" | "content" | "analytics" | "branding";
}

export const features: Feature[] = [
  { id: "unlimited-links", name: "unlimited links", description: "add as many links as you want", pro: false, category: "content" },
  { id: "templates", name: "templates", description: "6 beautiful templates", pro: false, category: "appearance" },
  { id: "themes", name: "color themes", description: "9 color palettes", pro: false, category: "appearance" },
  { id: "fonts", name: "typography", description: "2 font styles", pro: false, category: "appearance" },
  { id: "social-icons", name: "social icons", description: "add your socials", pro: false, category: "content" },
  { id: "basic-analytics", name: "basic analytics", description: "see your page views", pro: false, category: "analytics" },
  { id: "background-images", name: "custom backgrounds", description: "upload custom images", pro: true, category: "appearance" },
  { id: "music", name: "profile music", description: "add background music", pro: true, category: "content" },
  { id: "animations", name: "animations", description: "animated backgrounds", pro: true, category: "appearance" },
  { id: "custom-fonts", name: "custom fonts", description: "upload your own fonts", pro: true, category: "appearance" },
  { id: "remove-branding", name: "remove branding", description: "hide sweetheart footer", pro: true, category: "branding" },
  { id: "priority-support", name: "priority support", description: "faster response times", pro: true, category: "branding" },
];

export const freeFeatures = features.filter(f => !f.pro);
export const proFeatures = features.filter(f => f.pro);

export function isFeaturePro(featureId: string): boolean {
  const feature = features.find(f => f.id === featureId);
  return feature?.pro ?? false;
}

export function getFeaturesByCategory(category: Feature["category"]) {
  return features.filter(f => f.category === category);
}

