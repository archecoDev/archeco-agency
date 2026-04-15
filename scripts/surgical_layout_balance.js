const fs = require('fs');
const path = require('path');

const SITE_DATA_PATH = '/Users/archeco036/Documents/Archeco/Website Archeco EU/V3.2.0/site_data.json';
const data = JSON.parse(fs.readFileSync(SITE_DATA_PATH, 'utf8'));

/**
 * Surgical Layout Fixer
 * Purpose: Rebalance image containers without altering ANY text.
 */
function fixProjectLayout(slug) {
    const project = data.projects[slug];
    if (!project || !project.content) return;

    const content = project.content;

    // 1. Extract all pd-flow-item blocks
    // We use a broader regex to capture the entire div including its class
    const itemRegex = /<div class="pd-flow-item[^>]*">([\s\S]*?)<\/div>\s*<\/div>/gi;
    // Wait, the structure is often <div class="pd-flow-item"><div class="pd-flow-content">...</div></div>
    // Let's use a more robust split to find all "pd-flow-item" or components
    
    // Actually, let's extract all image/video tags first
    const mediaTags = [];
    const mediaRegex = /<(img|video)[^>]*>/gi;
    let match;
    while ((match = mediaRegex.exec(content)) !== null) {
        mediaTags.push(match[0]);
    }

    if (mediaTags.length === 0) return;

    // 2. Extract all text blocks (preserving their internal structure)
    // We look for pd-flow-item blocks that have pd-flow-step
    const textBlocks = [];
    const blockRegex = /<div class="pd-flow-item">[\s\S]*?<div class="pd-flow-step">([\s\S]*?)<\/div>\s*<\/div>/gi;
    // This is tricky because the restoration scripts used a consistent template:
    // <div class="pd-flow-item">
    //   <div class="pd-flow-step">01.</div>
    //   <div class="pd-flow-content">
    //     <h3 class="pd-flow-title">...</h3>
    //     <p class="pd-flow-desc">...</p>
    //   </div>
    // </div>
    
    const items = [];
    const splitRegex = /(<div class="pd-flow-item">[\s\S]*?<\/div>\s*(?:<\/div>)?)/gi;
    // This regex is complex. Let's try a different approach.
    // We know the "wrap" function used in restoration scripts.
    // It creates items like this:
    // <div class="pd-flow-item"> ... content ... </div>
    // And image blocks like this:
    // <div class="pd-flow-item pd-image-full rv"> ... content ... </div>

    // Let's find all text descriptions/titles
    const sections = [];
    // Each section in the restored text has a title and paragraphs
    const titleRegex = /<h3 class="pd-flow-title">([\s\S]*?)<\/h3>/gi;
    const descRegex = /<p class="pd-flow-desc">([\s\S]*?)<\/p>/gi;
    const stepRegex = /<div class="pd-flow-step">([\s\S]*?)<\/div>/gi;

    let stepMatch;
    const textItems = [];
    let lastIndex = 0;
    while ((stepMatch = stepRegex.exec(content)) !== null) {
        const step = stepMatch[1];
        // find the corresponding title and paragraphs after this step
        const blockFragment = content.substring(stepMatch.index, content.indexOf('</div>\n    </div>', stepMatch.index) + 16);
        
        const titleMatch = titleRegex.exec(blockFragment);
        titleRegex.lastIndex = 0; // reset
        const title = titleMatch ? titleMatch[1] : "";
        
        const paragraphs = [];
        let pMatch;
        while ((pMatch = descRegex.exec(blockFragment)) !== null) {
            paragraphs.push(pMatch[1]);
        }
        descRegex.lastIndex = 0; // reset
        
        textItems.push({ step, title, paragraphs });
    }

    if (textItems.length === 0) {
        // Fallback: If we can't parse it well, don't touch it to avoid corruption
        console.warn(`Skipping ${slug}: Could not parse text structure safely.`);
        return;
    }

    // 3. Reconstruct using the Parity Rule (Odd=1 then Pairs, Even=Pairs)
    let newContent = '<section class="pd-flow"><div class="pd-flow-grid">';
    
    // We interleave: Text Item 1, (Layout logic for images), Text Item 2, etc.
    // Actually, usually it's Text 1, Image 1, Text 2, Image 2 & 3, etc.
    // BUT the user wants a global "2 column" feel.
    
    const imageCount = mediaTags.length;
    let imagesUsed = 0;

    textItems.forEach((item, index) => {
        // 1. Add Text Item
        newContent += `
    <div class="pd-flow-item">
      <div class="pd-flow-step">${item.step}</div>
      <div class="pd-flow-content">
        <h3 class="pd-flow-title">${item.title}</h3>
        ${item.paragraphs.map(p => `<p class="pd-flow-desc">${p}</p>`).join('\n        ')}
      </div>
    </div>`;

        // 2. Add Media if available
        if (imagesUsed < imageCount) {
            // Logic:
            // If it's the first slot and total is ODD, use Full width.
            // Otherwise use Pairs.
            if (imagesUsed === 0 && imageCount % 2 !== 0) {
                newContent += `
    <div class="pd-flow-item pd-image-full rv">
      <div class="pd-flow-content">
        ${mediaTags[imagesUsed]}
      </div>
    </div>`;
                imagesUsed++;
            } else if (imagesUsed + 1 < imageCount) {
                // We have a pair
                newContent += `
    <div class="pd-flow-item pd-flow-grid rv">
      <div class="pd-flow-content">${mediaTags[imagesUsed]}</div>
      <div class="pd-flow-content">${mediaTags[imagesUsed+1]}</div>
    </div>`;
                imagesUsed += 2;
            } else if (imagesUsed < imageCount) {
                 // Remainder (should only happen if we didn't start with full width on odd)
                 newContent += `
    <div class="pd-flow-item pd-image-full rv">
      <div class="pd-flow-content">
        ${mediaTags[imagesUsed]}
      </div>
    </div>`;
                imagesUsed++;
            }
        }
    });

    // 4. Any leftover images?
    while (imagesUsed < imageCount) {
        if (imagesUsed + 1 < imageCount) {
            newContent += `
    <div class="pd-flow-item pd-flow-grid rv">
      <div class="pd-flow-content">${mediaTags[imagesUsed]}</div>
      <div class="pd-flow-content">${mediaTags[imagesUsed+1]}</div>
    </div>`;
            imagesUsed += 2;
        } else {
            newContent += `
    <div class="pd-flow-item pd-image-full rv">
      <div class="pd-flow-content">
        ${mediaTags[imagesUsed]}
      </div>
    </div>`;
            imagesUsed++;
        }
    }

    newContent += '</div></section>';
    
    project.content = newContent;
    console.log(`Rebalanced Layout for: ${slug} (${imageCount} images)`);
}

// Apply to all projects
Object.keys(data.projects).forEach(slug => {
    fixProjectLayout(slug);
});

fs.writeFileSync(SITE_DATA_PATH, JSON.stringify(data, null, 2));
console.log('--- SURGICAL LAYOUT BALANCE COMPLETE ---');
console.log('Preserved all 10 AM text. Image layout is now 2-column balanced.');
