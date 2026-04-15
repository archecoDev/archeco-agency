import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import InsightContent from "@/components/InsightContent";
import siteData from "@/site_data.json";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return Object.keys(siteData.insights).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const ins = (siteData.insights as any)[params.slug];
  if (!ins) return { title: "Not Found" };
  return {
    title: ins.title,
    description: ins.description || "",
    alternates: { canonical: `/insights/${params.slug}` },
    openGraph: {
      title: `${ins.title} — ARCHECO Insights`,
      description: ins.description || "",
      url: `https://archeco.eu/insights/${params.slug}`,
      images: ins.img ? [{ url: ins.img, width: 1200, height: 630, alt: ins.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${ins.title} — ARCHECO Insights`,
      images: ins.img ? [ins.img] : [],
    },
  };
}

export default function InsightPage({ params }: { params: { slug: string } }) {
  const insight = (siteData.insights as any)[params.slug];
  if (!insight) notFound();

  const insightKeys = Object.keys(siteData.insights);
  const curIdx = insightKeys.indexOf(params.slug);
  const nextSlug = insightKeys[(curIdx + 1) % insightKeys.length];
  const nextInsight = (siteData.insights as any)[nextSlug];

  return (
    <div className="page-dark">
      <Nav />
      
      <InsightContent 
        insight={insight} 
        nextSlug={nextSlug} 
        nextInsight={nextInsight} 
      />

      <Footer />
      <ImageLightbox />
    </div>
  );
}
