# Product Requirements Document: Plant Shop Website

## Overview
A production-ready Next.js catalog website for a plant shop that uses Google Sheets as a live product database and generates unique product URLs for in-store QR code scanning.

## Objectives
- Build a catalog site with hero section and product grid
- Responsive design: 2 cards per row on mobile, 4 per row on desktop
- Filter products by type and category; sort by price (ascending/descending)
- Generate unique detail pages at `/p/{id}` for QR code scanning
- Live data from Google Sheets with 5-minute cache/revalidation
- Include QR code generation script for product URLs

## Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **Data Source**: Google Sheets (via Service Account)
- **QR Generation**: qrcode npm package

## Data Model

### Product Schema
```typescript
{
  id: string;           // Short unique identifier (e.g., "1234")
  name: string;
  priceCents: number;   // Price stored in cents
  currency: string;     // Default "TRY"
  type: string;         // Product type for filtering
  category: string;     // Product category for filtering
  description: string;
  imageUrl: string;     // Public URL to product image
  inStock: boolean;
}
```

### Google Sheets Format
| id | name | priceCents | currency | type | category | description | imageUrl | inStock |
|----|------|------------|----------|------|----------|-------------|----------|---------|

## Features

### Homepage (`/`)
- Hero section
- Filter controls (type, category)
- Sort controls (price ascending/descending)
- Reset filters button
- Product grid (responsive)
- URL search params for filters/sort state

### Product Detail Page (`/p/[id]`)
- Large product image
- Product name and formatted price
- Type and category badges
- Full description
- 404 handling for invalid IDs

### API Route (`/api/products`)
- Returns all products as JSON
- ISR with 5-minute revalidation
- Server-side data fetching

### QR Code Generation
- Node script at `scripts/generate-qrs.ts`
- Generates PNG QR codes for each product
- Outputs to `public/qrs/{id}.png`
- Configurable base URL via environment variable

## Google Sheets Integration

### Authentication
- Service Account credentials via environment variables:
  - `GOOGLE_SA_CLIENT_EMAIL`
  - `GOOGLE_SA_PRIVATE_KEY`
  - `GOOGLE_SHEETS_SPREADSHEET_ID`
  - `GOOGLE_SHEETS_RANGE`

### Data Flow
1. Service account reads Google Sheet
2. Parse rows into Product objects
3. Cache for 5 minutes (ISR)
4. Server components fetch directly from sheets helper

## User Experience

### Accessibility
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly
- ARIA labels where appropriate

### Performance
- Optimized images (Next.js Image component)
- ISR for fast page loads
- Mobile-first responsive design
- Minimal client-side JavaScript

## Deployment
- Vercel (recommended)
- Environment variables configured in platform
- Automatic ISR support

## Success Criteria
✅ Products display correctly from Google Sheets
✅ Filters and sorting work via URL params
✅ Product detail pages load with correct data
✅ QR codes generate successfully
✅ Mobile responsive (2-up grid)
✅ Desktop responsive (4-up grid)
✅ 5-minute cache/revalidation works
✅ 404 handling for invalid product IDs
✅ Fast load times (<3s on mobile)
