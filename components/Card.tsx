import Link from "next/link";

interface CardProps {
  slug: string;
  type: "projects" | "insights" | "lab";
  title: string;
  description: string;
  tags: string[];
  img: string;
  date?: string;
  delayClass?: string;
  external?: boolean;
  status?: string;
  gridSpan?: number;
  onLight?: boolean;
}

export default function Card({
  slug,
  type,
  title,
  description,
  tags,
  img,
  date,
  delayClass = "",
  external = false,
  status = "",
  gridSpan = 3,
  onLight = false,
}: CardProps) {
  const href = external ? slug : `/${type}/${slug}`;
  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener" : undefined;

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`pj rv ${delayClass} ${onLight ? 'pj-light' : ''}`}
      style={{ 
        "--grid-span": gridSpan,
        "--grid-span-m": gridSpan === 3 ? 6 : (gridSpan === 4 ? 6 : gridSpan)
      } as React.CSSProperties}
      data-cats={(tags || []).join(" ").toLowerCase()}
      data-status={status}
    >
      <div className="pj-img">
        <img
          src={img || `/media/${type}/placeholder.png`}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="pj-body">
        <div className="pj-info">
          <div className="pj-tags">
            {(tags || []).map((tag, ti) => (
              <span key={ti} className="pj-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="pj-name">
            {(() => {
              const parts = title.split(" — ");
              if (parts.length === 2) {
                return (
                  <>
                    <span style={{ fontWeight: 500 }}>{parts[0]}</span>
                    <span className="pj-name-ctx"> — {parts[1]}</span>
                  </>
                );
              }
              return title;
            })()}
          </div>
          <div className="pj-sub">{description}</div>
        </div>
        <div className="pj-meta">
          {date && <span className="pj-yr">{date}</span>}
          <span className="pj-arr">↗</span>
        </div>
      </div>
    </Link>
  );
}
