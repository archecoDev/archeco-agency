const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MEDIA_ROOT = path.resolve(__dirname, '../public/media');
const VAULT_ROOT = path.resolve(__dirname, '../../MEDIA-VERSIONNING');

async function convertRecursively(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.relative(MEDIA_ROOT, fullPath);

        if (entry.isDirectory()) {
            await convertRecursively(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const targetDir = path.dirname(path.join(VAULT_ROOT, relPath));
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }

                const webpPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
                const vaultPath = path.join(VAULT_ROOT, relPath);

                try {
                    // 1. Convert to webp
                    await sharp(fullPath)
                        .webp({ quality: 85, effort: 6 })
                        .toFile(webpPath);

                    // 2. Move original to Vault
                    fs.renameSync(fullPath, vaultPath);
                    console.log(`[SUCCESS] Converted & Vaulted: ${relPath} -> .webp`);
                } catch (err) {
                    console.error(`[ERROR] Failed ${relPath}:`, err.message);
                }
            }
        }
    }
}

async function start() {
    console.log("--- STARTING MASS WEBP CONVERSION & VERSIONING ---");
    if (!fs.existsSync(VAULT_ROOT)) fs.mkdirSync(VAULT_ROOT, { recursive: true });
    await convertRecursively(MEDIA_ROOT);
    console.log("--- CONVERSION COMPLETE ---");
}

start();
