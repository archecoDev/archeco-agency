const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("site_data.json", "utf8"));
const mediaDir = "public/media/projects";
const folders = fs.readdirSync(mediaDir).filter(f => fs.lstatSync(path.join(mediaDir, f)).isDirectory());

const mapping = {
  "work4": "work-04-ux-strategy",
  "kddi_wallet_market": "kddi-wallet-fintech-marketplace",
  "kddi_austar": "kddi-au-star-loyalty-programme",
  "ntt_chat_bot": "ntt-conversational-ai-bot",
  "trans_cosmos": "transcosmos-cx-operations",
  "fuji0x": "fuji-0x-digital-art-platform",
  "trip_reservation_site": "trip-reservation-journey-app",
  "couger_hp": "couger-corporate-website",
  "car_design_gorilla": "gorilla-glass-in-car-hmi",
  "Leggmason": "legg-mason-asset-management-ui",
  "clientwork13": "client-work-confidential-project",
  "mobile-order-app": "mobile-order-f-b-ordering-app",
  "icon_samba": "samba-icon-system-design",
  "tscale_train": "t-scale-rail-operations-ui",
  "rakutenmusic01": "rakuten-music-streaming-ux",
  "kipposocialpetservicea": "kippo-social-pet-network",
  "work1": "work-01-digital-product",
  "Recruit_lecture_about_UX": "recruit-ux-lecture-series",
  "car_design_cloth": "cloth-interior-concept-design",
  "service_ec_platform": "ec-platform-service-commerce",
  "fujitsu_shopping_app": "fujitsu-smart-shopping-app",
  "scsk_hiroshima_bank": "hiroshima-bank-digital-branch",
  "watch_icon_nixon": "watch-icon-nixon",
  "ai-service-research-saas": "ai-research-saas-b2b-platform",
  "llm-content-saas": "llm-saas-content-generation",
  "p-and-l-generator": "p-l-generator-finance-tool",
  "presentation-generator": "presentation-generator-ai-tool"
};

// Auto-fill mapping for exact matches or other descriptive ones
Object.keys(data.projects).forEach(slug => {
    if (!mapping[slug]) {
        if (folders.includes(slug)) {
            mapping[slug] = slug;
        } else {
            const fuzzy = folders.find(f => f.includes(slug.toLowerCase().replace(/_/g, "-")));
            if (fuzzy) mapping[slug] = fuzzy;
        }
    }
});

console.log("--- RECONSTRUCTION: PHASE 1 (CLEANING & MAPPING) ---");

Object.entries(mapping).forEach(([slug, folder]) => {
    if (!folder) return;
    const project = data.projects[slug];
    if (!project) return;
    const folderPath = path.join(mediaDir, folder);
    if (!fs.existsSync(folderPath)) return;
    
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".webp"));
    
    // 1. Update Core Fields
    project.img = `/media/projects/${folder}/COVER.webp`;
    project.cover = `/media/projects/${folder}/COVER.webp`;
    
    // 2. Identify Secondary Images
    const secondaryImages = files.filter(f => f !== "COVER.webp").sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
    
    // 3. Clear existing image grids from content to prevent duplication
    // We target <div class="pd-flow-item">...grid...</div> and <div class="pd-flow-item pd-image-full">
    if (project.content) {
        // Remove all current images/grids to rebuild fresh
        // Matches any div with class pd-flow-item containing an img tag
        project.content = project.content.replace(/<div class="pd-flow-item[^"]*"[^>]*>[\s\S]*?<img[\s\S]*?<\/div>[\s\S]*?<\/div>/g, "");
    } else {
        project.content = `<section class="pd-flow"><div class="pd-flow-grid"></div></section>`;
    }
    
    // 4. Rebuild Image Layout
    let imagesHtml = `
    <div class="pd-flow-item pd-image-full rv is-reveal in">
      <div class="pd-flow-content"><img src="/media/projects/${folder}/COVER.webp" alt="${slug} cover" loading="lazy" /></div>
    </div>`;
    
    for (let i = 0; i < secondaryImages.length; i += 2) {
        if (i + 1 < secondaryImages.length) {
            imagesHtml += `
    <div class="pd-flow-item">
      <div class="pd-flow-grid">
        <div class="pd-flow-grid-item rv is-reveal in">
          <img src="/media/projects/${folder}/${secondaryImages[i]}" alt="${slug} documentation ${i+1}" loading="lazy" />
        </div>
        <div class="pd-flow-grid-item rv is-reveal in">
          <img src="/media/projects/${folder}/${secondaryImages[i+1]}" alt="${slug} documentation ${i+2}" loading="lazy" />
        </div>
      </div>
    </div>`;
        } else {
            imagesHtml += `
    <div class="pd-flow-item pd-image-full rv is-reveal in">
      <div class="pd-flow-content"><img src="/media/projects/${folder}/${secondaryImages[i]}" alt="${slug} documentation ${i+1}" loading="lazy" /></div>
    </div>`;
        }
    }
    
    // 5. Inject back into content
    if (project.content.includes("</div></section>")) {
        project.content = project.content.replace("</div></section>", `${imagesHtml}</div></section>`);
    } else if (project.content.includes("</section>")) {
        project.content = project.content.replace("</section>", `${imagesHtml}</section>`);
    } else {
        project.content += `<section class="pd-flow"><div class="pd-flow-grid">${imagesHtml}</div></section>`;
    }
    
    // 6. Final Path Standardization
    const oldSlugPath = new RegExp(`/media/projects/${slug}/`, "g");
    project.content = project.content.split(oldSlugPath).join(`/media/projects/${folder}/`);

    console.log(`[RECONSTRUCTED] ${slug} -> ${folder} (${files.length} images installed)`);
});

fs.writeFileSync("site_data.json", JSON.stringify(data, null, 2));
console.log("--- RECONSTRUCTION COMPLETE ---");
