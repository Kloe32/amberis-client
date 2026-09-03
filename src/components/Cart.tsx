import { useApp } from '../contexts/AppContext'
import { currency } from '../data/products'

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useApp()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const freeShippingThreshold = 50
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100)
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  if (cart.length === 0) {
    return (
      <section className="min-h-[70vh] bg-[var(--bg)] px-[clamp(20px,5vw,72px)] py-24 text-[var(--text)] flex flex-col justify-center items-center text-center font-sans">
        <p className="mb-3 text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)]">
          Your Selection
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-h)] mb-4">
          Your shopping bag is empty.
        </h1>
        <p className="max-w-md text-sm text-[var(--taupe)] font-light leading-relaxed mb-8">
          Explore our range of botanical formulations for skin, hair, and home to curate your personal routine.
        </p>
        <a
          href="/products"
          className="btn-primary !text-white bg-[#22201d] px-8 py-4 text-xs uppercase tracking-[0.18em] font-semibold shadow-sm"
        >
          <span className="!text-white">Explore Formulations</span>
        </a>
      </section>
    )
  }

  return (
    <section className="min-h-svh bg-[var(--bg)] py-12 lg:py-20 px-[clamp(20px,5vw,72px)] font-sans text-[var(--text)]">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-10">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
            Order Review
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-h)]">
            Your Cart.
          </h1>
        </div>

        {/* Free Shipping Progress Alert */}
        <div className="mb-8 p-5 bg-[var(--surface)] border border-[var(--border)]">
          <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider mb-2">
            <span>
              {remainingForFreeShipping === 0
                ? '✓ You have qualified for complimentary carbon-neutral shipping'
                : `Add $${remainingForFreeShipping.toFixed(2)} more for complimentary shipping`}
            </span>
            <span>{freeShippingProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--surface-muted)] overflow-hidden">
            <div
              className="h-full bg-[var(--aesop-ochre)] transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Grid: Line Items + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Line Items */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border-t border-[var(--border)]">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="py-6 border-b border-[var(--border)] grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                >
                  <div className="sm:col-span-3 aspect-square bg-[var(--surface-muted)] p-3 border border-[var(--border)] flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>

                  <div className="sm:col-span-5 space-y-1">
                    <h2 className="font-heading text-lg font-normal text-[var(--text-h)]">
                      <a href={`/products/${item.slug}`} className="hover:text-[var(--aesop-ochre)] transition-colors">
                        {item.name}
                      </a>
                    </h2>
                    <p className="text-xs text-[var(--taupe)] font-light">
                      Unit price: {currency.format(item.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="text-[0.68rem] uppercase tracking-widest text-[#8a241b] hover:text-[#521513] font-semibold underline cursor-pointer bg-transparent border-none pt-2"
                    >
                      Remove item
                    </button>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="sm:col-span-2 flex items-center border border-[#22201d] bg-[#ffffff] w-fit">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-base font-semibold cursor-pointer bg-transparent border-none hover:bg-[#22201d] hover:text-[#ffffff] transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#22201d]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-base font-semibold cursor-pointer bg-transparent border-none hover:bg-[#22201d] hover:text-[#ffffff] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="sm:col-span-2 text-right">
                    <span className="text-sm font-semibold text-[var(--text-h)]">
                      {currency.format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <a
                href="/products"
                className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--text-h)] hover:text-[var(--aesop-ochre)] underline"
              >
                &larr; Continue shopping
              </a>
            </div>
          </div>

          {/* Right Order Summary Box */}
          <div className="lg:col-span-4 bg-[var(--surface)] border border-[var(--border)] p-8 space-y-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--text-h)] border-b border-[var(--border)] pb-4">
              Summary
            </h2>

            <div className="space-y-3 text-xs text-[var(--taupe)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[var(--text-h)]">{currency.format(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{subtotal >= 50 ? 'Complimentary' : '$5.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Sample Selection</span>
                <span>Included (x2)</span>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-4 flex justify-between items-baseline">
              <span className="font-heading text-lg text-[var(--text-h)]">Total</span>
              <span className="font-heading text-xl font-semibold text-[var(--text-h)]">
                {currency.format(subtotal + (subtotal >= 50 ? 0 : 5))}
              </span>
            </div>

            <a
              href="/checkout"
              className="btn-primary !text-white bg-[#22201d] block w-full py-4 text-center text-xs uppercase tracking-[0.18em] font-semibold shadow-sm cursor-pointer"
            >
              <span className="!text-white">Proceed to Checkout &rarr;</span>
            </a>

            <div className="pt-4 border-t border-[var(--border)] space-y-2 text-[0.68rem] text-[var(--taupe)] font-light leading-relaxed">
              <p>• All orders packaged in recyclable unbleached cardboard.</p>
              <p>• Carbon-neutral shipping partner certified.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Cart
