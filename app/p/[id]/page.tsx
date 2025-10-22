import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/lib/sheets';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const revalidate = 300; // ISR: revalidate every 5 minutes

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const products = await getProducts();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: 'Ürün Bulunamadı',
    };
  }

  return {
    title: `${product.name} - Aktaş Peyzaj`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const products = await getProducts();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  // Check if imageUrl is valid
  const isValidUrl = product.imageUrl &&
    (product.imageUrl.startsWith('http://') ||
     product.imageUrl.startsWith('https://') ||
     product.imageUrl.startsWith('/'));

  const imageSrc: string = isValidUrl ? product.imageUrl : "/placeholder.jpg";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            ← Ana Sayfaya Dön
          </Button>
        </Link>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Product Image */}
            <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Stokta Yok</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-3xl md:text-4xl font-bold text-green-600">
                  {formatPrice(product.priceCents, product.currency)}
                </p>
              </div>

              {/* Badges */}
              <div className="flex gap-3 flex-wrap">
                {product.type && (
                  <Badge variant="secondary" className="text-sm px-4 py-1">
                    Tür: {product.type}
                  </Badge>
                )}
                {product.category && (
                  <Badge variant="outline" className="text-sm px-4 py-1">
                    Kategori: {product.category}
                  </Badge>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-slate max-w-none">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Açıklama</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {product.description || 'Açıklama mevcut değil.'}
                </p>
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-slate-200">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Ürün ID:</dt>
                    <dd className="font-medium text-slate-900">{product.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Para Birimi:</dt>
                    <dd className="font-medium text-slate-900">{product.currency}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Stok Durumu:</dt>
                    <dd className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'Stokta Var' : 'Stokta Yok'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}