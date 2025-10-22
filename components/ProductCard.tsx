import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Check if imageUrl is valid (starts with http:// or https:// or /)
  const isValidUrl = product.imageUrl &&
    (product.imageUrl.startsWith('http://') ||
     product.imageUrl.startsWith('https://') ||
     product.imageUrl.startsWith('/'));

  const imageSrc: string = isValidUrl ? product.imageUrl : "/placeholder.jpg";

  return (
    <Link href={`/p/${product.id}`} className="group">
      <Card className="overflow-hidden transition-transform hover:scale-105">
        <div className="aspect-square relative bg-slate-100">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-xl font-bold text-green-600">
            {formatPrice(product.priceCents, product.currency)}
          </p>
          <div className="flex gap-2 flex-wrap">
            {product.type && (
              <Badge variant="secondary" className="text-xs">
                {product.type}
              </Badge>
            )}
            {product.category && (
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            )}
          </div>
          {!product.inStock && (
            <p className="text-xs text-red-600 font-medium">Stokta Yok</p>
          )}
        </div>
      </Card>
    </Link>
  );
}