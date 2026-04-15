const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("site_data.json", "utf8"));
const mediaDir = "public/media/projects";
const folders = fs.readdirSync(mediaDir).filter(f => fs.lstatSync(path.join(mediaDir, f)).isDirectory());

console.log("--- FINAL PORTFOLIO MEDIA INTEGRITY AUDIT ---");

const results = {
    totalSlugs: Object.keys(data.projects).length,
    brokenLinks: 0,
    projectsWithNoMedia: 0,
    unusedImages: 0,
    mappingStatus: []
};

Object.entries(data.projects).forEach(([slug, project]) => {
    // 1. Detect which folder this project is currently using
    let folderName = null;
    if (project.img && project.img.startsWith("/media/projects/")) {
        folderName = project.img.split("/")[3];
    }
    
    const folderExists = folderName && fs.existsSync(path.join(mediaDir, folderName));
    const imagesInFolder = folderExists ? fs.readdirSync(path.join(mediaDir, folderName)).filter(f => f.endsWith(".webp")) : [];
    
    // 2. Check for broken links in content and core fields
    const linksInContent = project.content ? (project.content.match(/\/media\/projects\/[^" \?]+\.webp/g) || []) : [];
    const coreLinks = [project.img, project.cover].filter(Boolean);
    const allLinks = [...new Set([...linksInContent, ...coreLinks])];
    
    const broken = allLinks.filter(link => {
        const localPath = link.replace(/^\//, "public/");
        return !fs.existsSync(localPath);
    });

    results.brokenLinks += broken.length;
    if (!folderExists) results.projectsWithNoMedia++;
    
    // 3. Check for unused images in the assigned folder
    const usedFilenames = new Set(allLinks.map(l => path.basename(l)));
    const unused = imagesInFolder.filter(f => !usedFilenames.has(f));
    results.unusedImages += unused.length;

    if (broken.length > 0 || !folderExists || unused.length > 0) {
        results.mappingStatus.push({
            slug,
            folder: folderName,
            status: folderExists ? "OK" : "MISSING_FOLDER",
            brokenLinks: broken.length,
            unusedImages: unused.length,
            unusedList: unused
        });
    }
});

console.log(`Total Projects: ${results.totalSlugs}`);
console.log(`Broken Links (404): ${results.brokenLinks}`);
console.log(`Projects w/ Missing Media Folders: ${results.projectsWithNoMedia}`);
console.log(`Global Unused Images: ${results.unusedImages}`);

if (results.mappingStatus.length > 0) {
    console.log("\n--- DETAILED DISCREPANCIES ---");
    results.mappingStatus.forEach(item => {
        console.log(`[${item.slug}] Folder: ${item.folder} | Folder: ${item.status} | Broken: ${item.brokenLinks} | Unused: ${item.unusedImages}`);
        if (item.unusedList.length > 0) console.log(`   -> Unused: ${item.unusedList.join(", ")}`);
    });
} else {
    console.log("\n[SUCCESS] 100% Synchronization Reached. All projects have valid folders, 0 broken links, and 100% image utilization.");
}
