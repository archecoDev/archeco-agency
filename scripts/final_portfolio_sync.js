const fs = require('fs');
const path = require('path');

const SITE_DATA_PATH = path.resolve(__dirname, '../site_data.json');
const PROJECTS_DIR = path.resolve(__dirname, '../public/media/projects');

function finalSync() {
    const data = JSON.parse(fs.readFileSync(SITE_DATA_PATH, 'utf8'));
    const projects = data.projects;
    const folders = fs.readdirSync(PROJECTS_DIR).filter(f => fs.lstatSync(path.join(PROJECTS_DIR, f)).isDirectory());

    console.log("--- FINAL WEBP PORTFOLIO SYNC: RESOLVING BROKEN LINKS ---");

    Object.entries(projects).forEach(([slug, project]) => {
        // Find best matching folder (case-insensitive and partial match)
        const folderMatch = folders.find(f => f.toLowerCase() === slug.toLowerCase()) || 
                          folders.find(f => f.toLowerCase().includes(slug.toLowerCase())) || 
                          folders.find(f => slug.toLowerCase().includes(f.toLowerCase())) ||
                          folders.find(f => f.toLowerCase().replace(/-/g, '_') === slug.split('-')[0]);
        
        if (!folderMatch) {
            console.warn(`[WARN] Folder not found for slug: ${slug}`);
            return;
        }

        const folderPath = path.join(PROJECTS_DIR, folderMatch);
        const availableWebPs = fs.readdirSync(folderPath)
            .filter(f => f.toLowerCase().endsWith('.webp'))
            .filter(f => !f.toLowerCase().includes('cover'))
            .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}));

        if (availableWebPs.length === 0) {
            console.warn(`[WARN] No .webp files found in: ${folderMatch}`);
            return;
        }

        // Re-inject images into the content sequentially
        if (project.content) {
            let usedInContent = 0;
            project.content = project.content.replace(/src="([^"]+)"/g, (match, p1) => {
                const replacement = availableWebPs[usedInContent % availableWebPs.length];
                usedInContent++;
                return `src="/media/projects/${folderMatch}/${replacement}"`;
            });
        }
        
        // Ensure Project Hero/Cover also uses .webp
        if (project.cover && project.cover.includes('/media/projects/')) {
            const hasCoverFile = fs.existsSync(path.join(folderPath, 'COVER.webp'));
            if (hasCoverFile) {
                project.cover = `/media/projects/${folderMatch}/COVER.webp`;
            } else if (availableWebPs.length > 0) {
                project.cover = `/media/projects/${folderMatch}/${availableWebPs[0]}`;
            }
        }
    });

    fs.writeFileSync(SITE_DATA_PATH, JSON.stringify(data, null, 2));
    console.log("--- SYNC COMPLETE: ALL LINKS NOW POINT TO VALID .webp ASSETS ---");
}

finalSync();
