# Implementation Checklist

## Setup & Configuration
- [x] Initialize Next.js project structure
- [x] Configure TypeScript
- [x] Set up TailwindCSS
- [x] Install shadcn/ui dependencies
- [x] Create environment variable template

## Data Layer
- [x] Define Product TypeScript type
- [x] Implement Google Sheets authentication
- [x] Create sheets data fetching utility
- [x] Add row parsing and validation
- [x] Handle private key newline conversion

## API & Data Fetching
- [x] Create `/api/products` route
- [x] Implement ISR with 5-minute revalidation
- [x] Add error handling for sheet access
- [x] Test data parsing accuracy

## UI Components
- [x] Install required shadcn/ui components (Card, Badge, Select, Button)
- [x] Create `ProductCard` component
- [x] Create `Filters` component
- [x] Style components with Tailwind
- [x] Ensure mobile responsiveness

## Pages
- [x] Build homepage layout with hero
- [x] Implement filter logic (type, category)
- [x] Implement sort logic (price asc/desc)
- [x] Create responsive product grid (2-up mobile, 4-up desktop)
- [x] Build product detail page at `/p/[id]`
- [x] Add 404 handling for invalid IDs
- [x] Optimize images with Next.js Image

## QR Code Generation
- [x] Create `scripts/generate-qrs.ts`
- [x] Implement QR generation with qrcode package
- [x] Configure QR settings (error correction M, margin 2, width 512)
- [x] Create output directory structure
- [x] Add npm script for QR generation

## Documentation
- [x] Write comprehensive README
- [x] Document environment variables
- [x] Add setup instructions
- [x] Include deployment guide
- [x] Create `.env.example`

## Testing & QA
- [ ] Test filter combinations
- [ ] Test sort functionality
- [ ] Verify mobile responsive layout
- [ ] Test QR code generation
- [ ] Verify ISR revalidation
- [ ] Test with empty/invalid sheet data
- [ ] Check accessibility with screen reader
- [ ] Test 404 handling

## Deployment
- [ ] Configure Vercel environment variables
- [ ] Deploy to production
- [ ] Verify live data updates
- [ ] Test QR codes in production
- [ ] Monitor performance metrics
