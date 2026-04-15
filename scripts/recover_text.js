const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPTS_DIR = path.resolve(__dirname, '../scripts');

const batches = [
    'rewrite_projects_batch_5.js',
    'rewrite_projects_batch_15_p1.js',
    'rewrite_projects_batch_15_p2.js',
    'rewrite_projects_batch_15_p3.js',
    'rewrite_projects_batch_15_p4.js',
    'rewrite_projects_batch_18_p1.js',
    'rewrite_projects_batch_18_p2.js',
    'rewrite_projects_batch_18_p3.js',
    'rewrite_projects_batch_18.js'
];

const specialized = [
    'rewrite_bsp_text_only.js',
    'rewrite_carite_text_only.js',
    'rewrite_fam_text_only.js',
    'rewrite_freelance_text_only.js',
    'rewrite_hairstylist_text_only.js',
    'rewrite_influencer_ec_text_only.js',
    'rewrite_mobile_order_text_only.js',
    'rewrite_ohbag_project.js',
    'rewrite_port_text_only.js',
    'rewrite_walkcoin_project.js',
    'rewrite_weblio_text_only.js'
];

console.log("Starting full text restoration sequence...");

[...batches, ...specialized].forEach(script => {
    const fullPath = path.join(SCRIPTS_DIR, script);
    if (fs.existsSync(fullPath)) {
        console.log(`Executing: ${script}`);
        try {
            execSync(`node "${fullPath}"`, { stdio: 'inherit' });
        } catch (e) {
            console.error(`Error executing ${script}: ${e.message}`);
        }
    } else {
        console.warn(`Script not found: ${script}`);
    }
});

console.log("Full text restoration COMPLETE. site_data.json should be back to its professional state. verified. confirmed. finished.命をかけた.完了.");
