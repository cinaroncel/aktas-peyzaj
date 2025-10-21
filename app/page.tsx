import { getProducts } from '@/lib/sheets';
import { ProductCard } from '@/components/ProductCard';
import { Filters } from '@/components/Filters';
import Image from 'next/image';

export const revalidate = 300; // ISR: revalidate every 5 minutes

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const allProducts = await getProducts();

  // Extract unique types and categories
  const types = Array.from(new Set(allProducts.map((p) => p.type).filter(Boolean)));
  const categories = Array.from(new Set(allProducts.map((p) => p.category).filter(Boolean)));

  // Apply filters
  const typeFilter = typeof searchParams.type === 'string' ? searchParams.type : '';
  const categoryFilter = typeof searchParams.category === 'string' ? searchParams.category : '';
  const sortFilter = typeof searchParams.sort === 'string' ? searchParams.sort : '';

  let filteredProducts = [...allProducts];

  if (typeFilter) {
    filteredProducts = filteredProducts.filter((p) => p.type === typeFilter);
  }

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);
  }

  // Apply sorting
  if (sortFilter === 'price-asc') {
    filteredProducts.sort((a, b) => a.priceCents - b.priceCents);
  } else if (sortFilter === 'price-desc') {
    filteredProducts.sort((a, b) => b.priceCents - a.priceCents);
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[700px] md:h-[800px] lg:h-[900px] flex items-center justify-center overflow-visible">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpeg"
            alt="Aktaş Peyzaj Hero"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Overlay with smooth gradient fade at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-transparent"></div>
        </div>

        {/* Smooth gradient fade to white at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white z-[5]"></div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/logo.jpg"
                alt="Aktaş Peyzaj Logo"
                fill
                className="object-contain rounded-full shadow-2xl bg-white/10 backdrop-blur-sm p-2"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Aktaş Peyzaj
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            İç ve dış mekan bitkileri kataloğu
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Filters types={types} categories={categories} />
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600">Ürün bulunamadı</p>
            <p className="text-sm text-slate-500 mt-2">Filtreleri temizlemeyi deneyin</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}