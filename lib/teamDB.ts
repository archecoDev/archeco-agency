import data from "@/site_data.json";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  short_bio: string;
  card_image: string;
  profile_image: string;
  slug: string;
}

// Map the existing data to the new structure
const rawTeam = data.team as any;
export const teamDB: Record<string, TeamMember> = {};

Object.keys(rawTeam).forEach(key => {
  const m = rawTeam[key];
  teamDB[key] = {
    name: m.title,
    role: m.description,
    bio: m.bio,
    short_bio: m.short_bio || (m.bio || "").slice(0, 100).replace(/<[^>]*>?/gm, ""), // Strip HTML tags if any
    card_image: m.card_img || m.img,
    profile_image: m.img,
    slug: key
  };
});

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamDB[slug];
}

export function getAllTeamMembers(): TeamMember[] {
  return Object.values(teamDB).sort((a, b) => a.name.localeCompare(b.name));
}
