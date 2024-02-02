import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Product } from '@/app/data/types/product'
import { api } from '@/app/data/api'
import { formatCurrencyInBRL } from '@/app/utils/format-currency'

interface SearchProps {
  searchParams: {
    query: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60,
    },
  })
  const products = await response.json()

  return products
}

export default async function Search({ searchParams }: SearchProps) {
  const { query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products?.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative rounded-lg bg-zinc-900 overflow-hidden flex items-end justify-center"
          >
            <Image
              className="group-hover:scale-105 transition-transform duration-500"
              src={product.image}
              alt={product.description}
              width={480}
              height={480}
              quality={100}
            />
            <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[320px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {formatCurrencyInBRL(product.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
