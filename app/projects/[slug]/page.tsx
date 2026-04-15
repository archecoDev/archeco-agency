import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import ScriptRunner from "@/components/ScriptRunner";
import ProjectHero from "@/components/ProjectHero";
import siteData from "@/site_data.json";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return Object.keys(siteData.projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = (siteData.projects as any)[params.slug];
  if (!p) return { title: "Not Found" };
  return {
    title: p.title,
    description: p.description || "",
    alternates: { canonical: `/projects/${params.slug}` },
    openGraph: {
      title: `${p.title} — ARCHECO`,
      description: p.description || "",
      url: `https://archeco.eu/projects/${params.slug}`,
      images: p.img ? [{ url: p.img, width: 1200, height: 630, alt: p.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} — ARCHECO`,
      images: p.img ? [p.img] : [],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = (siteData.projects as any)[params.slug];
  if (!project) notFound();

  // Strip legacy hero from content to avoid duplication
  const contentWithoutHero = project.content.replace(/<section class="pd-hero">[\s\S]*?<\/section>/, "");

  // Determine Next Project
  const projectKeys = Object.keys(siteData.projects).filter(k => (siteData.projects as any)[k].status !== "draft");
  const curIdx = projectKeys.indexOf(params.slug);
  const nextSlug = curIdx !== -1 ? projectKeys[(curIdx + 1) % projectKeys.length] : null;
  const nextProject = nextSlug ? (siteData.projects as any)[nextSlug] : null;

  return (
    <div className="pd-article-light" style={{ background: "var(--bg)", color: "var(--black)", minHeight: "100vh" }}>
      <Nav onLight={true} />
      <ProjectHero 
        title={project.title} 
        image={project.img} 
        tags={project.tags} 
        isLight={true}
      />
      <ScriptRunner html={contentWithoutHero} />
      
      {/* Next Project Navigation */}
      {nextSlug && nextProject && (
        <section className="pd-next" style={{ background: "var(--bg2)", borderTop: "1px solid var(--line)" }}>
          <Link href={`/projects/${nextSlug}`} className="pd-next-link">
            <div className="pd-next-img">
              <img src={nextProject.img || "/media/projects/placeholder.jpg"} alt="" />
            </div>
            <div className="pd-next-info">
              <span className="pd-next-label" style={{ color: "var(--mid)" }}>Next Project</span>
              <div className="pd-next-title" style={{ color: "var(--black)" }}>{nextProject.title}</div>
            </div>
          </Link>
        </section>
      )}

      <Footer />
      <ImageLightbox />
    </div>
  );
}
