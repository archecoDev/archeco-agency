#!/usr/bin/env node
/**
 * scripts/generate-og.js
 * Convertit public/og-default.svg en public/og-default.jpg (1200x630)
 *
 * Usage : node scripts/generate-og.js
 * Dépendances : npm install sharp  (une seule fois)
 */

const sharp = require("sharp");
const path = require("path");

const src = path.join(__dirname, "../public/og-default.svg");
const dst = path.join(__dirname, "../public/og-default.jpg");

sharp(src)
  .resize(1200, 630)
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(dst)
  .then((info) => {
    console.log(`✅ og-default.jpg généré — ${(info.size / 1024).toFixed(1)} KB`);
    console.log(`   Dimensions : ${info.width}×${info.height}`);
  })
  .catch((err) => {
    console.error("❌ Erreur :", err.message);
    console.log("Installe sharp avec : npm install sharp");
  });
