const fs = require('fs');
const path = require('path');

const SITE_DATA_PATH = path.resolve(__dirname, '../site_data.json');
const PROJECTS_DIR = path.resolve(__dirname, '../public/media/projects');

const EXPLICIT_MAP = {
    "kddi_wallet_market": "kddi-wallet-fintech-marketplace",
    "kddi_austar": "kddi-au-star-loyalty-programme",
    "ntt_chat_bot": "ntt-conversational-ai-bot",
    "trans_cosmos": "transcosmos-cx-operations",
    "fuji0x": "fuji-0x-digital-art-platform",
    "trip_reservation_site": "trip-reservation-journey-app",
    "couger_hp": "couger-corporate-website",
    "Leggmason": "legg-mason-asset-management-ui",
    "clientwork13": "client-work-confidential-project",
    "EC_Bargain_Sale": "ec-bargain-sale-e-commerce-ux",
    "mobile-order-app": "mobile-order-f-b-ordering-app",
    "rakutenmusic01": "rakuten-music-streaming-ux",
    "kipposocialpetservicea": "kippo-social-pet-network",
    "Recruit_lecture_about_UX": "recruit-ux-lecture-series",
    "service_ec_platform": "ec-platform-service-commerce",
    "fujitsu_shopping_app": "fujitsu-smart-shopping-app",
    "scsk_hiroshima_bank": "scsk-banking-platform-ux",
    "scsk_bank": "scsk-banking-platform-ux",
    "tscale_train": "t-scale-rail-operations-ui",
    "ai-service-research-saas": "ai-research-saas-b2b-platform",
    "prototyping": "prototyping"
};

function syncMediaFinal() {
    const data = JSON.parse(fs.readFileSync(SITE_DATA_PATH, 'utf8'));
    const projects = data.projects;
    const folders = fs.readdirSync(PROJECTS_DIR).filter(f => fs.lstatSync(path.join(PROJECTS_DIR, f)).isDirectory());

    let fixesCount = 0;

    Object.entries(projects).forEach(([slug, project]) => {
        // Find best matching folder (using explicit map first)
        const folderMatch = EXPLICIT_MAP[slug] || 
                          folders.find(f => f.toLowerCase() === slug.toLowerCase()) || 
                          folders.find(f => f.toLowerCase().includes(slug.toLowerCase())) || 
                          folders.find(f => slug.toLowerCase().includes(f.toLowerCase()));
        
        if (!folderMatch) return;

        const folderPath = path.join(PROJECTS_DIR, folderMatch);
        if (!fs.existsSync(folderPath)) return;
        
        const availableFiles = fs.readdirSync(folderPath).filter(f => !f.startsWith('.'));
        if (availableFiles.length === 0) return;

        // Sort to favor COVER or 1, 2, 3
        const sortedFiles = availableFiles.slice().sort((a, b) => {
            if (a.toLowerCase().includes('cover')) return -1;
            if (b.toLowerCase().includes('cover')) return 1;
            return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'});
        });

        const getValidPath = (originalPath) => {
            if (!originalPath || typeof originalPath !== 'string') return null;
            const fullPath = path.join(__dirname, '../public', originalPath);
            if (fs.existsSync(fullPath)) return originalPath;

            // Mapping to folderMatch
            const baseName = path.basename(originalPath).split('.')[0];
            const matchingFile = sortedFiles.find(f => f.toLowerCase().split('.')[0] === baseName.toLowerCase()) || 
                               sortedFiles.find(f => f.toLowerCase().startsWith(baseName.toLowerCase())) ||
                               sortedFiles[0];

            fixesCount++;
            return `/media/projects/${folderMatch}/${matchingFile}`;
        };

        // Update Img & Cover
        project.img = getValidPath(project.img);
        project.cover = getValidPath(project.cover);

        // Update Content
        if (project.content) {
            let usedInContent = 0;
            project.content = project.content.replace(/src="([^"]+)"/g, (match, p1) => {
                const fullPath = path.join(__dirname, '../public', p1);
                if (fs.existsSync(fullPath)) return match;
                
                // Pick next best file
                const replacement = sortedFiles[usedInContent % sortedFiles.length];
                usedInContent++;
                fixesCount++;
                return `src="/media/projects/${folderMatch}/${replacement}"`;
            });
        }
    });

    fs.writeFileSync(SITE_DATA_PATH, JSON.stringify(data, null, 2));
    console.log(`--- FINAL SYNC COMPLETE: Fixed ${fixesCount} media links. ---`);
}

syncMediaFinal();
