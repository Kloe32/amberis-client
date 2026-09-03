import { useMemo, useState } from 'react'
import { findProductBySlug, productPrice, productPriceValue, products, productTags } from '../data/products'
import { useApp } from '../contexts/AppContext'

function ProductDetail() {
  const slug = decodeURIComponent(window.location.pathname.replace('/products/', ''))
  const product = findProductBySlug(slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart, isAuthenticated } = useApp()

  const relatedProducts = useMemo(
    () =>
      product
        ? products
            .filter((item) => item._id !== product._id && item.category.slug === product.category.slug)
            .concat(products.filter((item) => item._id !== product._id))
            .slice(0, 3)
        : [],
    [product],
  )

  if (!product) {
    return (
      <section className="min-h-[70vh] bg-[var(--surface)] px-[clamp(20px,5vw,72px)] py-24 text-[var(--text)] flex flex-col items-center justify-center text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-3">
          Formulation Not Found
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl text-[var(--text-h)] mb-6">
          This formulation is currently unavailable.
        </h1>
        <a
          href="/products"
          className="btn-primary !text-white bg-[#22201d] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold"
        >
          <span className="!text-white">Return to Catalog</span>
        </a>
      </section>
    )
  }

  const currentImage = product.images[selectedImage] ?? product.category.image
  const unitPrice = productPriceValue(product)
  const subtotal = unitPrice * quantity
  const tags = productTags(product)

  function handleAddToCart() {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }

    if (product) {
      addToCart({
        productId: product._id,
        name: product.name,
        slug: product.slug,
        price: unitPrice,
        image: product.images[0] || product.category.image,
        quantity,
      })
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  return (
    <div className="min-h-svh bg-[var(--bg)] text-[var(--text)] font-sans">
      
      {/* Breadcrumb Bar */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)] py-3 px-[clamp(20px,5vw,72px)] text-[0.68rem] uppercase tracking-[0.18em] text-[var(--taupe)]">
        <div className="mx-auto max-w-7xl flex items-center gap-2">
          <a href="/products" className="hover:text-[var(--text-h)]">Products</a>
          <span>/</span>
          <a href="/products" className="hover:text-[var(--text-h)]">{product.category.name}</a>
          <span>/</span>
          <span className="text-[var(--text-h)] font-semibold truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-12 lg:py-20 px-[clamp(20px,5vw,72px)]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="w-full aspect-square sm:aspect-[4/3] bg-[var(--surface-muted)] flex items-center justify-center p-8 sm:p-12 border border-[var(--border)] overflow-hidden">
              <img
                src={currentImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-105"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 p-2 bg-[var(--surface-muted)] border transition-all cursor-pointer ${
                      selectedImage === idx
                        ? 'border-[#22201d] ring-2 ring-[#22201d]'
                        : 'border-[var(--border)] opacity-60 hover:opacity-100 hover:border-[#22201d]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Dossier */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2.5">
                {product.category.name}
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-h)] tracking-tight leading-[1.1] mb-5">
                {product.name}
              </h1>
              <p className="text-2xl font-light text-[var(--text-h)] mb-6">
                ${unitPrice.toFixed(2)}
              </p>
              <p className="text-sm leading-[1.8] text-[var(--taupe)] font-light my-6">
                {product.description}
              </p>
            </div>

            {/* Sensory & Formulation Profile */}
            <div className="border-y border-[var(--border)] py-7 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-4">
                <span className="font-semibold uppercase tracking-[0.16em] text-[var(--text-h)]">Aroma</span>
                <span className="col-span-2 text-[var(--taupe)] font-light leading-relaxed">Herbaceous, crisp floral, warm woody undertones</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-[rgba(0,0,0,0.05)] pt-3.5">
                <span className="font-semibold uppercase tracking-[0.16em] text-[var(--text-h)]">Skin Feel</span>
                <span className="col-span-2 text-[var(--taupe)] font-light leading-relaxed">Nourished, deeply hydrated, supple and protected</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-[rgba(0,0,0,0.05)] pt-3.5">
                <span className="font-semibold uppercase tracking-[0.16em] text-[var(--text-h)]">Texture</span>
                <span className="col-span-2 text-[var(--taupe)] font-light leading-relaxed">Lightweight fluid gel absorption</span>
              </div>
              {tags.length > 0 && (
                <div className="grid grid-cols-3 gap-4 border-t border-[rgba(0,0,0,0.05)] pt-3.5 items-center">
                  <span className="font-semibold uppercase tracking-[0.16em] text-[var(--text-h)]">Key Actives</span>
                  <div className="col-span-2 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-[#f3ede2] text-[0.65rem] uppercase tracking-wider text-[#22201d] font-medium border border-[#ded7cc]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Usage Ritual */}
            <div className="bg-[var(--aesop-cream)] p-6 sm:p-7 border border-[var(--border)] space-y-2.5">
              <h2 className="text-[0.68rem] uppercase tracking-[0.18em] font-semibold text-[var(--aesop-dark)]">
                Application Ritual
              </h2>
              <p className="text-xs leading-[1.8] text-[var(--taupe)] font-light mt-2">
                Dispense three to five drops into the palm of your hand. Gently press across cleansed and toned face and neck each morning and evening.
              </p>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#22201d] bg-[#ffffff]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 flex items-center justify-center text-lg font-medium hover:bg-[#22201d] hover:text-[#ffffff] cursor-pointer bg-transparent border-none transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-12 flex items-center justify-center text-lg font-medium hover:bg-[#22201d] hover:text-[#ffffff] cursor-pointer bg-transparent border-none transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`btn-primary !text-white flex-1 min-h-12 px-6 text-xs uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer shadow-sm ${
                    added
                      ? 'btn-action-added !bg-[#285430]'
                      : 'bg-[#22201d]'
                  }`}
                >
                  <span className="!text-white">{added ? 'Added to Bag ✓' : `Add to Bag — $${subtotal.toFixed(2)}`}</span>
                </button>
              </div>

              <p className="text-[0.68rem] text-center text-[var(--taupe)] uppercase tracking-wider pt-1">
                Complimentary delivery on orders over $50 • 30-day returns
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Related Formulations Recommendations */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-[clamp(20px,5vw,72px)] bg-[var(--aesop-cream)]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
                Accompanying Care
              </p>
              <h2 className="font-heading text-3xl font-normal text-[var(--text-h)]">
                Harmonious Formulations.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((item) => (
                <a
                  key={item._id}
                  href={`/products/${item.slug}`}
                  className="bg-[var(--surface)] border border-[var(--border)] p-6 block group hover:shadow-[var(--shadow-card)] transition-all"
                >
                  <div className="w-full aspect-square bg-[var(--surface-muted)] mb-5 flex items-center justify-center p-6 overflow-hidden">
                    <img
                      src={item.images[0] || item.category.image}
                      alt={item.name}
                      className="max-h-full w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--aesop-ochre)] font-semibold mb-1">
                    {item.category.name}
                  </p>
                  <h3 className="font-heading text-lg font-normal text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] transition-colors mb-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--text-h)] mt-3 pt-2 border-t border-[var(--border)]">
                    {productPrice(item)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}

export default ProductDetail
