import { google } from 'googleapis';
import { Product } from './types';

function getGoogleAuth() {
  const clientEmail = process.env.GOOGLE_SA_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Missing Google Service Account credentials');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return auth;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || 'Products!A2:I';

    if (!spreadsheetId) {
      throw new Error('Missing GOOGLE_SHEETS_SPREADSHEET_ID');
    }

    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.warn('No data found in Google Sheet');
      return [];
    }

    // Parse rows into Product objects
    // Expected columns: id | name | priceCents | currency | type | category | description | imageUrl | inStock
    const products: Product[] = rows
      .map((row): Product | null => {
        try {
          const id = String(row[0] || '').trim();
          const name = String(row[1] || '').trim();

          // Skip empty rows
          if (!id || !name) {
            return null;
          }

          return {
            id,
            name,
            priceCents: parseInt(String(row[2] || '0'), 10),
            currency: String(row[3] || 'TRY').trim(),
            type: String(row[4] || '').trim(),
            category: String(row[5] || '').trim(),
            description: String(row[6] || '').trim(),
            imageUrl: String(row[7] || '').trim() || undefined,
            inStock: String(row[8] || 'true').toLowerCase() === 'true',
          };
        } catch (error) {
          console.error('Error parsing row:', row, error);
          return null;
        }
      })
      .filter((product): product is Product => product !== null);

    return products;
  } catch (error) {
    console.error('Error fetching products from Google Sheets:', error);
    throw error;
  }
}
