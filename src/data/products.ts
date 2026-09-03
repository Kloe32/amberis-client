export type ProductCategory = {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  status: string
}

export type Product = {
  _id: string
  name: string
  slug: string
  description: string
  category: ProductCategory
  basePrice: number
  discountPercentage: number
  images: string[]
  status: string
  tags: string[]
  stock: number
}
export const products: Product[] = []

export function setProducts(data: Product[]) {
  products.length = 0
  products.push(...data)
}
export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function productTags(product: Product) {
  return product.tags.flatMap((tag) => tag.split(',')).map((tag) => tag.trim()).filter(Boolean)
}

export function productPriceValue(product: Product) {
  return product.basePrice * (1 - product.discountPercentage / 100)
}

export function productPrice(product: Product) {
  return currency.format(productPriceValue(product))
}

export function findProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}
