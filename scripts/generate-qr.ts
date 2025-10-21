import fs from 'fs/promises';
import path from 'path';
import QRCode from 'qrcode';
import { getProducts } from '../lib/products';

/*
 * This script generates a QR code for each product in the catalog. Each QR
 * code points to the corresponding product detail page under `/p/{id}`.
 *
 * Usage (from project root):
 *   npx ts-node scripts/generate-qr.ts
 */

async function generate() {
  const products = await getProducts();
  const outputDir = path.join(process.cwd(), 'public', 'qrs');
  await fs.mkdir(outputDir, { recursive: true });
  for (const product of products) {
    const filename = path.join(outputDir, `${product.id}.png`);
    const url = `/p/${product.id}`;
    const pngBuffer = await QRCode.toBuffer(url, { type: 'png', errorCorrectionLevel: 'H' });
    await fs.writeFile(filename, pngBuffer);
    console.log(`Generated QR for ${product.id}`);
  }
  console.log(`Finished generating ${products.length} QR codes`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});