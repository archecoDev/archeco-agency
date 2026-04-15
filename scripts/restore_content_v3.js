const fs = require('fs');
const path = require('path');

const SITE_DATA_PATH = path.resolve(__dirname, '../site_data.json');
const RESTORED_CONTENT_PATH = '/tmp/restored_content.json';

function restoreContent() {
    if (!fs.existsSync(RESTORED_CONTENT_PATH)) {
        console.error("[ERROR] Restored content not found at /tmp/restored_content.json");
        return;
    }

    const currentData = JSON.parse(fs.readFileSync(SITE_DATA_PATH, 'utf8'));
    const restoredData = JSON.parse(fs.readFileSync(RESTORED_CONTENT_PATH, 'utf8'));

    console.log("--- STARTING SURGICAL CONTENT RESTORATION ---");

    Object.entries(restoredData).forEach(([slug, content]) => {
        if (!content) {
            console.warn(`[SKIP] No content found for slug: ${slug}`);
            return;
        }

        if (currentData.projects[slug]) {
            // 1. Update extensions in the archived content (PNG/JPG -> WEBP)
            let updatedContent = content.replace(/\.(png|jpg|jpeg)(?=["\?])/gi, ".webp");
            
            // 2. Inject back into active JSON
            currentData.projects[slug].content = updatedContent;
            console.log(`[SUCCESS] Restored text for: ${slug}`);
        } else {
            console.warn(`[WARN] Project ${slug} missing in active site_data.json`);
        }
    });

    fs.writeFileSync(SITE_DATA_PATH, JSON.stringify(currentData, null, 2));
    console.log("--- RESTORATION COMPLETE ---");
}

restoreContent();
