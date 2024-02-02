'use client'

import { useCart } from '@/contexts/cart'
import { ShoppingBag } from 'lucide-react'

export function CartWidget() {
  const { items } = useCart()

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="h-4 w-4" />
      <span>Cart ({items.length})</span>
    </div>
  )
}
