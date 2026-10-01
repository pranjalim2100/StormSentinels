import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:5173';
const outputDir = path.resolve('public');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pngPath = path.join(outputDir, 'stormsentinels_qr.png');
const svgPath = path.join(outputDir, 'stormsentinels_qr.svg');

const qrOptions = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  quality: 1.0,
  margin: 2,
  color: {
    dark: '#20C7B7',   // AI Teal QR modules
    light: '#071A2B',  // Midnight Blue background
  },
  width: 1024,
};

async function generate() {
  console.log(`Generating presentation QR code for URL: ${url}`);
  
  // Save high-resolution PNG (1024x1024)
  await QRCode.toFile(pngPath, url, qrOptions);
  console.log(`Saved PNG QR Code to: ${pngPath}`);

  // Save SVG
  const svgString = await QRCode.toString(url, { ...qrOptions, type: 'svg' });
  fs.writeFileSync(svgPath, svgString);
  console.log(`Saved SVG QR Code to: ${svgPath}`);
}

generate().catch(console.error);
