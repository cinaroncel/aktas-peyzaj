# UI Design Specification

## Design Principles
- **Mobile-first**: Optimized for phone browsing in-store
- **Fast loading**: Minimal assets, optimized images
- **Clean & readable**: Clear product information
- **Accessible**: WCAG 2.1 AA compliant

## Color Palette
```
Primary: Tailwind Green (nature/plant theme)
- green-600: Primary actions
- green-50: Light backgrounds

Secondary: Neutral grays
- slate-900: Text
- slate-600: Secondary text
- slate-200: Borders
- white: Backgrounds
```

## Typography
- **Font**: System font stack (fast loading)
- **Headings**: font-bold
- **Body**: font-normal
- **Sizes**: Tailwind default scale

## Layout

### Homepage (`/`)

#### Hero Section
```
+----------------------------------+
|                                  |
|   PLANT SHOP HERO                |
|   Heading + Subtitle             |
|   (Full width, centered)         |
|                                  |
+----------------------------------+
```

#### Filters Bar
```
+----------------------------------+
| [Type ▼] [Category ▼] [Sort ▼]  |
| [Reset Filters]                  |
+----------------------------------+
```

#### Product Grid

**Mobile (< 768px)**: 2 columns
```
+----------------+----------------+
| Product Card   | Product Card   |
+----------------+----------------+
| Product Card   | Product Card   |
+----------------+----------------+
```

**Desktop (≥ 768px)**: 4 columns
```
+--------+--------+--------+--------+
| Card   | Card   | Card   | Card   |
+--------+--------+--------+--------+
| Card   | Card   | Card   | Card   |
+--------+--------+--------+--------+
```

### Product Card Component
```
+----------------------+
|                      |
|   [Product Image]    |
|      (1:1 ratio)     |
|                      |
+----------------------+
| Product Name         |
| ₺XX.XX               |
| [Type] [Category]    |
+----------------------+
```

**Card Specs:**
- Image: aspect-square, object-cover
- Border: rounded-lg, subtle shadow
- Hover: scale-105 transition
- Padding: p-4
- Badges: text-xs, rounded-full

### Product Detail Page (`/p/[id]`)

**Mobile Layout (Stacked)**
```
+----------------------------------+
|                                  |
|      [Large Product Image]       |
|         (max-w-2xl)              |
|                                  |
+----------------------------------+
|  Product Name (text-3xl)         |
|  ₺XXX.XX (text-2xl)              |
|  [Type Badge] [Category Badge]   |
+----------------------------------+
|  Description                     |
|  (text-slate-600)                |
+----------------------------------+
```

**Desktop Layout (Side-by-side)**
```
+------------------+------------------------+
|                  |  Product Name          |
|  [Product Image] |  ₺XXX.XX               |
|                  |  [Type] [Category]     |
|                  |                        |
|                  |  Description text...   |
+------------------+------------------------+
```

## Components

### Filters Component
- **Layout**: Horizontal flex on desktop, vertical stack on mobile
- **Selects**: shadcn/ui Select component
- **Reset Button**: Outlined variant, secondary color
- **Spacing**: gap-4

### ProductCard Component
- **Container**: Card from shadcn/ui
- **Image**: Next.js Image, fill mode, object-cover
- **Title**: text-lg font-semibold, truncate if too long
- **Price**: text-xl font-bold, formatted with currency
- **Badges**: Badge from shadcn/ui, variant="secondary"
- **Link**: Entire card is clickable

## Responsive Breakpoints
```
sm:  640px  (tablets)
md:  768px  (small laptops)
lg:  1024px (desktops)
xl:  1280px (large screens)
```

## Interactive States

### Hover States
- Product cards: slight scale up (scale-105)
- Buttons: background color change
- Links: underline on hover

### Focus States
- All interactive elements: visible focus ring
- Color: ring-2 ring-offset-2 ring-green-600

### Loading States
- Skeleton loaders for images
- Spinner for data fetching (if needed)

## Spacing System
- **Container padding**: px-4 (mobile), px-8 (desktop)
- **Section gaps**: space-y-8
- **Grid gaps**: gap-4 (mobile), gap-6 (desktop)
- **Component internal**: p-4

## Image Optimization
- **Format**: WebP with fallback
- **Sizes**: Responsive sizes attribute
- **Loading**: lazy loading for off-screen images
- **Aspect ratio**: 1:1 for grid cards
- **Placeholder**: blur (if available)

## Accessibility Features
- Semantic HTML elements
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast (4.5:1 minimum)
- Focus indicators always visible

## Error States

### Product Not Found (404)
```
+----------------------------------+
|  [Large 404 Icon]                |
|  Product Not Found               |
|  The product you're looking      |
|  for doesn't exist.              |
|  [Back to Home] (button)         |
+----------------------------------+
```

### Empty State (No Products)
```
+----------------------------------+
|  No products found               |
|  Try adjusting your filters      |
|  [Reset Filters]                 |
+----------------------------------+
```

## Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1
