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

// Add successful existing mappings to the definitive list
Object.keys(data.projects).forEach(slug => {
    if (!mapping[slug]) {
        if (folders.includes(slug)) {
            mapping[slug] = slug;
        } else {
            // Try automatic fuzzy match if not predefined
            const fuzzy = folders.find(f => f.includes(slug.toLowerCase().replace(/_/g, "-")));
            if (fuzzy) mapping[slug] = fuzzy;
        }
    }
});

console.log("--- STARTING MEDIA RECONCILIATION ---");

Object.entries(mapping).forEach(([slug, folder]) => {
    if (!folder) {
        console.log(`[SKIPPING] No folder found for ${slug}`);
        return;
    }
    
    const project = data.projects[slug];
    if (!project) return;
    
    const projectPath = path.join(mediaDir, folder);
    if (!fs.existsSync(projectPath)) return;
    
    const files = fs.readdirSync(projectPath).filter(f => f.endsWith(".webp"));
    if (files.length === 0) return;

    // 1. Update Core Fields
    project.img = `/media/projects/${folder}/COVER.webp`;
    project.cover = `/media/projects/${folder}/COVER.webp`;

    // 2. Identify All Available Images (Excluding Layout Boilerplates)
    const secondaryImages = files.filter(f => f !== "COVER.webp").sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
    
    // 3. Update Content - Inject images in 2-column grid
    if (secondaryImages.length > 0) {
        let additionalHtml = "";
        
        // Group into pairs for 2-column layout
        for (let i = 0; i < secondaryImages.length; i += 2) {
            if (i + 1 < secondaryImages.length) {
                // Pair found - 2 columns
                additionalHtml += `
    <div class="pd-flow-item">
      <div class="pd-flow-grid">
        <div class="pd-flow-grid-item rv is-reveal in">
          <img src="/media/projects/${folder}/${secondaryImages[i]}" alt="${slug} process ${i+1}" loading="lazy" />
        </div>
        <div class="pd-flow-grid-item rv is-reveal in">
          <img src="/media/projects/${folder}/${secondaryImages[i+1]}" alt="${slug} process ${i+2}" loading="lazy" />
        </div>
      </div>
    </div>`;
            } else {
                // Odd one out - Full width
                additionalHtml += `
    <div class="pd-flow-item pd-image-full rv is-reveal in">
      <div class="pd-flow-content"><img src="/media/projects/${folder}/${secondaryImages[i]}" alt="${slug} detail" loading="lazy" /></div>
    </div>`;
            }
        }
        
        // Append to content before the closing tag, or create if missing
        if (project.content && project.content.includes("</section>")) {
            // Check if we already injected images to avoid duplication (simple check)
            if (!project.content.includes(secondaryImages[0])) {
                project.content = project.content.replace("</section>", `${additionalHtml}</section>`);
            }
        } else {
            project.content = `<section class="pd-flow"><div class="pd-flow-grid">${additionalHtml}</div></section>`;
        }
    }
    
    // 4. Global Path Standardization (Safety Fix for Existing Content)
    if (project.content) {
        // Fix any legacy slug-based paths in existing content to point to the correct descriptive folder
        const oldSlugPath = new RegExp(`/media/projects/${slug}/`, "g");
        project.content = project.content.split(oldSlugPath).join(`/media/projects/${folder}/`);
    }

    console.log(`[SYNCHRONIZED] ${slug} -> ${folder} (${files.length} images)`);
});

fs.writeFileSync("site_data.json", JSON.stringify(data, null, 2));
console.log("--- RECONCILIATION COMPLETE ---");
