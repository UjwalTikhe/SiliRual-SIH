// Simple placeholder icon generator
// Replace this with your actual SiliRual logo-based icons

const fs = require('fs');
const path = require('path');

// This is a placeholder - you should replace with your actual logo
// For now, copy your existing favicon to all required sizes
const sourceIcon = path.join(__dirname, '../favicon.png');
const iconsDir = __dirname;

const sizes = [72, 96, 128, 144, 152, 167, 180, 192, 512];

// Copy favicon to all sizes as placeholders
sizes.forEach(size => {
  const targetPath = path.join(iconsDir, `icon-${size}x${size}.png`);
  if (fs.existsSync(sourceIcon)) {
    fs.copyFileSync(sourceIcon, targetPath);
    console.log(`Created placeholder: icon-${size}x${size}.png`);
  } else {
    console.log(`Source favicon not found, skipping ${size}x${size}`);
  }
});

console.log('Placeholder icons created. Replace with your actual SiliRual logo icons!');