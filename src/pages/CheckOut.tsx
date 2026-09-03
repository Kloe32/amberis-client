import React, { useState, useEffect, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createOrder, createPaymentIntent, previewOrderPrice } from '../services/orderService';
import { StripePaymentForm } from '../components/Checkout/StripePaymentForm';
import type { ShippingAddress, PriceReviewResponse } from '../types/order';
import { useApp } from '../contexts/AppContext';
import { currency } from '../data/products';
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';
const stripePromise = loadStripe(stripePublishableKey);

export const CheckOut: React.FC = () => {
  const { cart, clearCart, isAuthenticated, user } = useApp();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '',
    phone: '',
    email: user?.email || '',
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Singapore',
  });

  const [note, setNote] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live Price Review & Quotation Preview states
  const [priceReview, setPriceReview] = useState<PriceReviewResponse | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  // Update initial name/email if user loads late
  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: prev.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  // Fallback local calculations
  const localSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const localShipping = localSubtotal >= 50 ? 0 : 5.0;
  const localTotal = localSubtotal + localShipping;

  // Live Price Review Effect on Cart Changes
  useEffect(() => {
    if (cart.length === 0) {
      setPriceReview(null);
      return;
    }

    const fetchReview = async () => {
      setIsLoadingPrice(true);
      setPriceError(null);
      try {
        const res = await previewOrderPrice({
          items: cart.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
          })),
        });
        setPriceReview(res.data);
      } catch (err: any) {
        console.error('Price review error:', err);
        setPriceError(err.response?.data?.message || 'Failed to calculate live price preview.');
      } finally {
        setIsLoadingPrice(false);
      }
    };

    fetchReview();
  }, [cart]);

  // Values using live price review if available, fallback to local
  const displaySubtotal = priceReview?.subtotal ?? localSubtotal;
  const displayShippingCost = priceReview ? priceReview.shippingCost : localShipping;
  const displayDiscount = priceReview?.discount ?? 0;
  const displayTax = priceReview?.tax ?? 0;
  const displayTotal = priceReview?.total ?? localTotal;

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || isLoadingPrice || priceError) return;

    setIsSubmittingOrder(true);
    setErrorMessage(null);

    try {
      // 1. Create Order in MongoDB
      const orderPayload = {
        items: cart.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: address.fullName.trim(),
          phone: address.phone.trim(),
          email: address.email?.trim() || user?.email,
          street: address.street.trim(),
          addressLine2: address.addressLine2?.trim() || undefined,
          city: address.city.trim(),
          state: address.state?.trim() || undefined,
          zipCode: address.zipCode?.trim() || undefined,
          country: address.country.trim() || 'Singapore',
        },
        shippingCost: displayShippingCost,
        discount: displayDiscount > 0 ? displayDiscount : undefined,
        customerNote: note.trim() || undefined,
      };

      const orderRes = await createOrder(orderPayload);
      const createdId = orderRes.data._id;
      setOrderId(createdId);
      setOrderNumber(orderRes.data.orderNumber);

      // 2. Generate Stripe PaymentIntent
      const intentRes = await createPaymentIntent(createdId);
      if (intentRes.data && intentRes.data.clientSecret) {
        setClientSecret(intentRes.data.clientSecret);
      } else {
        throw new Error('Payment service did not return a valid client secret.');
      }
    } catch (err: any) {
      console.error('Order creation error:', err);
      const backendMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unable to initialize order. Please check item stock or try again.';
      setErrorMessage(backendMsg);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-[var(--aesop-cream)] text-[var(--text)] px-6 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--aesop-ochre)] mb-4" />
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--aesop-dark)]">
          Redirecting to authentication...
        </p>
      </div>
    );
  }

  if (cart.length === 0 && !clientSecret) {
    return (
      <div className="min-h-svh bg-[var(--bg)] text-[var(--text)] flex flex-col justify-center items-center text-center px-6">
        <p className="mb-3 text-[0.68rem] uppercase tracking-[0.2em] font-semibold text-[var(--aesop-ochre)]">
          Order Finalisation
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--text-h)] mb-4">
          There are no formulations in your bag.
        </h1>
        <p className="max-w-md text-sm text-[var(--taupe)] font-light leading-relaxed mb-8">
          Please add items to your cart before proceeding to checkout.
        </p>
        <a
          href="/products"
          className="btn-primary !text-white bg-[#22201d] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold"
        >
          <span className="!text-white">Return to Formulations</span>
        </a>
      </div>
    );
  }

  return (
    <section className="min-h-svh bg-[var(--bg)] py-12 lg:py-20 px-[clamp(20px,5vw,72px)] font-sans text-[var(--text)]">
      <div className="mx-auto max-w-6xl">

        {/* Checkout Header & Steps */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
              Secure Checkout & Verification
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-h)]">
              {clientSecret ? 'Payment Formulation.' : 'Delivery & Review.'}
            </h1>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-medium">
            <div className={`flex items-center gap-2 ${!clientSecret ? 'text-[var(--text-h)] font-bold' : 'text-[#285430]'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${!clientSecret ? 'bg-[#22201d] text-white' : 'bg-[#285430] text-white'}`}>
                {clientSecret ? '✓' : '1'}
              </span>
              <span>1. Shipping</span>
            </div>
            <span className="text-[var(--border)]">—</span>
            <div className={`flex items-center gap-2 ${clientSecret ? 'text-[var(--text-h)] font-bold' : 'text-[var(--taupe)]'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${clientSecret ? 'bg-[#22201d] text-white' : 'bg-[var(--surface-strong)] text-[var(--taupe)]'}`}>
                2
              </span>
              <span>2. Payment</span>
            </div>
          </div>
        </div>

        {/* Price Review Error Banner */}
        {priceError && (
          <div className="mb-8 p-5 bg-[#fcf3f2] border border-[#e8c0bb] text-[#8a241b] text-xs sm:text-sm flex items-start gap-3 rounded-sm animate-shake">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Price Quotation Notice</p>
              <p className="font-light">{priceError}</p>
            </div>
          </div>
        )}

        {/* Global Order Creation Error Banner */}
        {errorMessage && (
          <div className="mb-8 p-5 bg-[#fcf3f2] border border-[#e8c0bb] text-[#8a241b] text-xs sm:text-sm flex items-start gap-3 rounded-sm">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Order Preparation Issue</p>
              <p className="font-light">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Main Content Column */}
          <div className="lg:col-span-7">
            {!clientSecret ? (
              /* STEP 1: Shipping Address Form */
              <form onSubmit={handleCreateOrder} className="bg-[var(--surface)] border border-[var(--border)] p-8 sm:p-10 space-y-8">
                <div>
                  <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-h)] mb-4 pb-2 border-b border-[var(--border)] flex items-center justify-between">
                    <span>1. Shipping Address</span>
                    <span className="text-[var(--taupe)] font-normal text-[0.65rem] lowercase tracking-normal">all fields required unless specified</span>
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[0.68rem] uppercase tracking-wider font-semibold mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={address.fullName}
                          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                          placeholder="Eleanor Vance"
                          className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-2.5 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.68rem] uppercase tracking-wider font-semibold mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={address.phone}
                          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                          placeholder="+65 9123 4567"
                          className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-2.5 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[0.68rem] uppercase tracking-wider font-semibold mb-1">
                        Email Address <span className="text-[var(--taupe)] font-normal">(for tracking & receipt)</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        placeholder="eleanor@example.com"
                        className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-2.5 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[0.68rem] uppercase tracking-wider font-semibold mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        placeholder="10 Orchard Road, Suite 04-12"
                        className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-2.5 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[0.68rem] uppercase tracking-wider font-semibold mb-1">
                        Apartment, Suite, Unit <span className="text-[var(--taupe)] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={address.addressLine2 || ''}
                        onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                        placeholder="Tower 2, #14-08"
                        className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-2.5 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[0.68rem] uppercase tracking-wider font-semibold mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          placeholder="Singapore"
                          className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-2.5 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.68rem] uppercase tracking-wider font-semibold mb-1">
                          State / Region <span className="text-[var(--taupe)] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={address.state || ''}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          placeholder="Central Region"
                          className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-2.5 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.68rem] uppercase tracking-wider font-semibold mb-1">
                          Postal / Zip Code
                        </label>
                        <input
                          type="text"
                          value={address.zipCode || ''}
                          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                          placeholder="238888"
                          className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-2.5 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[0.68rem] uppercase tracking-wider font-semibold mb-1">
                        Country / Territory
                      </label>
                      <input
                        type="text"
                        required
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        placeholder="Singapore"
                        className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-2.5 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Notes */}
                <div>
                  <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-h)] mb-4 pb-2 border-b border-[var(--border)]">
                    2. Delivery Instructions & Ritual Notes
                  </h2>
                  <textarea
                    placeholder="Leave with concierge, gate access code, or specific delivery preferences..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-[#ffffff] border border-[#ded7cc] p-4 text-xs text-[var(--text-h)] focus:outline-none focus:border-[var(--aesop-dark)] h-24 resize-none"
                  />
                </div>

                {/* Submit button for Step 1 */}
                <button
                  type="submit"
                  disabled={isSubmittingOrder || isLoadingPrice || cart.length === 0 || !!priceError}
                  className="btn-primary !text-white bg-[#22201d] w-full py-4 px-6 text-xs uppercase tracking-[0.18em] font-semibold disabled:opacity-50 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isLoadingPrice ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span className="!text-white">Calculating Live Quotation...</span>
                    </>
                  ) : isSubmittingOrder ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span className="!text-white">Preparing Order & Payment Intent...</span>
                    </>
                  ) : (
                    <span className="!text-white">Proceed to Payment &rarr;</span>
                  )}
                </button>
              </form>
            ) : (
              /* STEP 2: Stripe Embedded Payment Form */
              <div className="bg-[var(--surface)] border border-[var(--border)] p-8 sm:p-10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                  <div>
                    <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-h)]">
                      Order #{orderNumber || orderId}
                    </h2>
                    <p className="text-xs text-[var(--taupe)] mt-1">
                      Shipping to {address.fullName}, {address.city}, {address.country}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setClientSecret(null)}
                    className="text-xs text-[var(--taupe)] hover:text-[var(--text-h)] underline flex items-center gap-1 cursor-pointer bg-transparent border-none"
                  >
                    <ArrowLeft className="w-3 h-3" /> Edit address
                  </button>
                </div>

                <div className="bg-[#fcfbf9] border border-[var(--border)] p-4 rounded-sm flex items-center gap-3 text-xs text-[var(--text-h)]">
                  <CheckCircle2 className="w-4 h-4 text-[#285430] shrink-0" />
                  <span>Order reserved. Complete the payment below to finalize your dispatch.</span>
                </div>

                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#22201d',
                        colorBackground: '#ffffff',
                        colorText: '#2c2925',
                        colorDanger: '#8a241b',
                        fontFamily: 'Inter, sans-serif',
                        spacingUnit: '4px',
                        borderRadius: '2px',
                      },
                    },
                  }}
                >
                  <StripePaymentForm
                    orderId={orderId!}
                    totalAmount={displayTotal}
                    onPaymentSuccess={clearCart}
                  />
                </Elements>
              </div>
            )}
          </div>

          {/* Right Sticky Order Summary */}
          <div className="lg:col-span-5 bg-[var(--surface)] border border-[var(--border)] p-8 space-y-6 sticky top-24">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--text-h)] border-b border-[var(--border)] pb-4 flex justify-between items-center">
              <span>Your Selection</span>
              <span className="text-[var(--taupe)] font-normal lowercase tracking-normal">
                {cart.reduce((s, i) => s + i.quantity, 0)} item{cart.reduce((s, i) => s + i.quantity, 0) === 1 ? '' : 's'}
              </span>
            </h2>

            {/* Item list */}
            <div className="max-h-64 overflow-y-auto space-y-4 pr-1">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-4 items-center text-xs">
                  <div className="w-12 h-12 shrink-0 bg-[var(--surface-muted)] p-1 border border-[var(--border)] flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm text-[var(--text-h)] truncate">{item.name}</p>
                    <p className="text-[var(--taupe)] font-light">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-[var(--text-h)] shrink-0">
                    {currency.format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Review Breakdown Calculations */}
            <div className="border-t border-[var(--border)] pt-4 space-y-2.5 text-xs text-[var(--taupe)]">
              <div className="flex justify-between">
                <span>Formulation Subtotal</span>
                <span className="font-medium text-[var(--text-h)]">
                  {currency.format(displaySubtotal)}
                </span>
              </div>

              {/* Promotional Discount if applied */}
              {displayDiscount > 0 && (
                <div className="flex justify-between text-[#285430]">
                  <span>Promotional Discount</span>
                  <span className="font-medium">-{currency.format(displayDiscount)}</span>
                </div>
              )}

              {/* Shipping calculation */}
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[var(--aesop-ochre)]" />
                  Carbon-Neutral Delivery
                </span>
                <span className="font-medium text-[var(--text-h)]">
                  {displayShippingCost === 0 ? 'Complimentary' : currency.format(displayShippingCost)}
                </span>
              </div>

              {/* Estimated Tax if applicable */}
              {displayTax > 0 && (
                <div className="flex justify-between text-[var(--taupe)]">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-[var(--text-h)]">{currency.format(displayTax)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Complimentary Samples</span>
                <span className="font-medium text-[var(--text-h)]">Included (x2)</span>
              </div>

              {/* Grand Total Due */}
              <div className="border-t border-[var(--border)] pt-3 flex justify-between items-baseline font-bold text-[var(--text-h)] text-sm">
                <span className="font-heading text-base">Total Due</span>
                <span className="font-heading text-lg">
                  {isLoadingPrice ? (
                    <span className="text-xs font-normal text-[var(--taupe)] animate-pulse">Calculating...</span>
                  ) : (
                    currency.format(displayTotal)
                  )}
                </span>
              </div>
            </div>

            {/* Assurances */}
            <div className="pt-4 border-t border-[var(--border)] space-y-2 text-[0.68rem] text-[var(--taupe)] font-light leading-relaxed">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--aesop-ochre)] shrink-0" />
                <span>All formulations shipped in protective recyclable unbleached packaging.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CheckOut;
