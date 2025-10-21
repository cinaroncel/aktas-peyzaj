import QRCode from 'qrcode';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getProducts } from '../lib/sheets';

async function generateQRCodes() {
  console.log('🔄 Starting QR code generation...');

  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
  const outputDir = join(process.cwd(), 'public', 'qrs');

  // Ensure output directory exists
  try {
    mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error('Error creating output directory:', error);
    process.exit(1);
  }

  try {
    // Fetch products
    console.log('📡 Fetching products from Google Sheets...');
    const products = await getProducts();
    console.log(`✅ Found ${products.length} products`);

    // Generate QR codes
    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
      try {
        const productUrl = `${baseUrl}/p/${product.id}`;
        const outputPath = join(outputDir, `${product.id}.png`);

        await QRCode.toFile(outputPath, productUrl, {
          errorCorrectionLevel: 'M',
          margin: 2,
          width: 512,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });

        console.log(`✓ Generated QR for ${product.id}: ${product.name}`);
        successCount++;
      } catch (error) {
        console.error(`✗ Failed to generate QR for ${product.id}:`, error);
        errorCount++;
      }
    }

    console.log('\n📊 Generation Summary:');
    console.log(`   Total products: ${products.length}`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    console.log(`\n📁 QR codes saved to: ${outputDir}`);

    if (errorCount > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error generating QR codes:', error);
    process.exit(1);
  }
}

// Run the script
generateQRCodes()
  .then(() => {
    console.log('\n✨ QR code generation complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
