"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  types: string[];
  categories: string[];
}

export function Filters({ types, categories }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push("/");
  };

  const hasActiveFilters = currentType || currentCategory || currentSort;

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <Select value={currentType} onValueChange={(value) => updateFilter("type", value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tür seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentCategory} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentSort} onValueChange={(value) => updateFilter("sort", value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sıralama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Varsayılan</SelectItem>
            <SelectItem value="price-asc">Fiyat (Düşükten Yükseğe)</SelectItem>
            <SelectItem value="price-desc">Fiyat (Yüksekten Düşüğe)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={resetFilters}>
          Filtreleri Temizle
        </Button>
      )}
    </div>
  );
}
