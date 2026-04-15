import { getAllTeamMembers, getTeamMember } from "@/lib/teamDB";
import TeamMemberClient from "./TeamMemberClient";
import { notFound } from "next/navigation";

export const dynamic = 'force-static';

export function generateStaticParams() {
  const members = getAllTeamMembers();
  return members.map((member) => ({
    slug: member.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const member = getTeamMember(params.slug);
  
  if (!member) {
    notFound();
  }

  const teamMembers = getAllTeamMembers();

  return (
    <TeamMemberClient 
      slug={params.slug} 
      currentMember={member} 
      teamMembers={teamMembers} 
    />
  );
}
