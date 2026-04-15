const fs = require("fs");
const path = require("path");

const backupPath = "../ARCHECO_BACKUPS/json_backups/site_data_BACKUP_AVANT_PERFECTION.json";
const currentPath = "site_data.json";
const mediaDir = "public/media/projects";

const backupData = JSON.parse(fs.readFileSync(backupPath, "utf8"));
const currentData = JSON.parse(fs.readFileSync(currentPath, "utf8"));

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

// Auto-fill mapping
Object.keys(currentData.projects).forEach(slug => {
    if (!mapping[slug]) {
        if (folders.includes(slug)) {
            mapping[slug] = slug;
        } else {
            const fuzzy = folders.find(f => f.includes(slug.toLowerCase().replace(/_/g, "-")));
            if (fuzzy) mapping[slug] = fuzzy;
        }
    }
});

console.log("--- REPAIRING PORTFOLIO NARRATIVES ---");

Object.keys(currentData.projects).forEach(slug => {
    const backupProject = backupData.projects[slug];
    const currentProject = currentData.projects[slug];
    const folderName = mapping[slug];

    if (!backupProject || !backupProject.content || backupProject.content.length < 100) {
        console.log(`[SKIPPED] No valid narrative in backup for ${slug}`);
        return;
    }

    // 1. Recover the high-fidelity narrative
    let narrative = backupProject.content;

    // 2. Clear all image blocks from narrative to avoid old duplicates (careful regex)
    narrative = narrative.replace(/<div class="pd-flow-item[^"]*"[^>]*>\s*<div class="pd-flow-content">\s*<img[\s\S]*?<\/div>[\s\S]*?<\/div>/g, "");
    narrative = narrative.replace(/<div class="pd-flow-item pd-image-full[^"]*"[^>]*>[\s\S]*?<img[\s\S]*?<\/div>[\s\S]*?<\/div>/g, "");
    narrative = narrative.replace(/<div class="pd-flow-item">\s*<div class="pd-flow-grid">[\s\S]*?<\/div>\s*<\/div>/g, "");

    // 3. Rebuild Media Grid
    if (folderName) {
        const projectPath = path.join(mediaDir, folderName);
        if (fs.existsSync(projectPath)) {
            const files = fs.readdirSync(projectPath).filter(f => f.endsWith(".webp"));
            const secondaryImages = files.filter(f => f !== "COVER.webp").sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));

            let mediaHtml = `
    <div class="pd-flow-item pd-image-full rv is-reveal in">
      <div class="pd-flow-content"><img src="/media/projects/${folderName}/COVER.webp" alt="${slug} cover" loading="lazy" /></div>
    </div>`;

            for (let i = 0; i < secondaryImages.length; i += 2) {
                if (i + 1 < secondaryImages.length) {
                    mediaHtml += `
    <div class="pd-flow-item">
      <div class="pd-flow-grid">
        <div class="pd-flow-grid-item rv is-reveal in">
          <img src="/media/projects/${folderName}/${secondaryImages[i]}" alt="${slug} detail ${i+1}" loading="lazy" />
        </div>
        <div class="pd-flow-grid-item rv is-reveal in">
          <img src="/media/projects/${folderName}/${secondaryImages[i+1]}" alt="${slug} detail ${i+2}" loading="lazy" />
        </div>
      </div>
    </div>`;
                } else {
                    mediaHtml += `
    <div class="pd-flow-item pd-image-full rv is-reveal in">
      <div class="pd-flow-content"><img src="/media/projects/${folderName}/${secondaryImages[i]}" alt="${slug} documentation" loading="lazy" /></div>
    </div>`;
                }
            }

            // 4. Append media to narrative
            if (narrative.includes("</div></section>")) {
                narrative = narrative.replace("</div></section>", `${mediaHtml}</div></section>`);
            } else if (narrative.includes("</section>")) {
                narrative = narrative.replace("</section>", `${mediaHtml}</section>`);
            } else {
                narrative = narrative + `<section class="pd-flow"><div class="pd-flow-grid">${mediaHtml}</div></section>`;
            }
        }
    }

    // 5. Commit Repair
    currentProject.content = narrative;
    console.log(`[REPAIRED] ${slug} -> Text and ${folderName} media merged.`);
});

fs.writeFileSync("site_data.json", JSON.stringify(currentData, null, 2));
console.log("--- NARRATIVE REPAIR COMPLETE ---");
