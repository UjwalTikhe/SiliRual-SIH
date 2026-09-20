import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy service worker files from dist to .output/public
const distDir = path.join(__dirname, 'dist');
const outputDir = path.join(__dirname, '.output/public');

try {
  // Copy sw.js
  const swSrc = path.join(distDir, 'sw.js');
  const swDest = path.join(outputDir, 'sw.js');
  if (fs.existsSync(swSrc)) {
    fs.copyFileSync(swSrc, swDest);
    console.log('Copied sw.js to .output/public/');
  }

  // Copy workbox files
  const files = fs.readdirSync(distDir).filter(file => file.startsWith('workbox-'));
  files.forEach(file => {
    const srcFile = path.join(distDir, file);
    const destFile = path.join(outputDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file} to .output/public/`);
  });

  console.log('Service worker files copied successfully');
} catch (error) {
  console.error('Error copying service worker files:', error);
  process.exit(1);
}