import { google } from 'googleapis';
import { Product } from './types';

// Cache for memoization in serverless environments.
let cachedProducts: Product[] | null = null;
let lastFetchTime = 0;

/**
 * Reads product data from a Google Sheet via the Google Sheets API.
 * Requires the following environment variables:
 * - GOOGLE_CLIENT_EMAIL
 * - GOOGLE_PRIVATE_KEY
 * - GOOGLE_SHEET_ID
 *
 * The private key may contain literal "\n" sequences. They are
 * automatically replaced with actual newlines.
 */
async function fetchProducts(): Promise<Product[]> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !sheetId) {
    throw new Error(
      'Missing Google Sheets configuration. Ensure GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID are set.'
    );
  }

  // Instantiate auth client. We recreate this for every fetch to avoid
  // leaked credentials, though GoogleAuth caches under the hood.
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Pull all data from the first sheet starting at row 2 (to skip header).
  const range = 'A2:I';
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });

  const rows = response.data.values || [];
  const products: Product[] = rows.map((row) => {
    const [id, name, priceCentsRaw, currency, type, category, description, imageUrl, inStockRaw] = row;
    const priceCents = Number(priceCentsRaw);
    const inStock = typeof inStockRaw === 'string'
      ? /^\s*(true|1|yes)\s*$/i.test(inStockRaw)
      : Boolean(inStockRaw);
    return {
      id: String(id),
      name: String(name),
      priceCents: isNaN(priceCents) ? 0 : priceCents,
      currency: currency || 'TRY',
      type: type || '',
      category: category || '',
      description: description || '',
      imageUrl: imageUrl || undefined,
      inStock,
    } satisfies Product;
  });
  return products;
}

/**
 * Returns all products, using an in-memory cache that refreshes every
 * five minutes. The cache helps reduce latency and API calls when
 * rendering pages. In Next.js, you can pair this with ISR by
 * specifying `revalidate` in your route or fetch call.
 */
export async function getProducts(): Promise<Product[]> {
  const now = Date.now();
  const cacheDurationMs = 5 * 60 * 1000; // 5 minutes
  if (!cachedProducts || now - lastFetchTime > cacheDurationMs) {
    cachedProducts = await fetchProducts();
    lastFetchTime = now;
  }
  return cachedProducts;
}

/**
 * Returns a single product by its identifier. If the product does not
 * exist, returns undefined.
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}