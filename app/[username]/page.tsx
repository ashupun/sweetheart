import ProfileContent from "./ProfileContent";

// Sample user data - in a real app this would come from a database
const sampleUser = {
  username: "sakura",
  displayName: "Sakura",
  bio: "Gamer girl, artist & pink enthusiast. Let's be friends!",
  avatar: null,
  theme: "pink",
  links: [
    { id: 1, title: "My Twitch", url: "https://twitch.tv", icon: "twitch" },
    { id: 2, title: "YouTube Channel", url: "https://youtube.com", icon: "youtube" },
    { id: 3, title: "Discord Server", url: "https://discord.gg", icon: "discord" },
    { id: 4, title: "Instagram", url: "https://instagram.com", icon: "instagram" },
    { id: 5, title: "My Shop", url: "https://etsy.com", icon: "shop" },
    { id: 6, title: "Support Me", url: "https://ko-fi.com", icon: "heart" },
  ],
  socials: {
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  }
};

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  // In a real app, fetch user data based on username
  const user = sampleUser;

  return <ProfileContent user={user} username={username} />;
}
