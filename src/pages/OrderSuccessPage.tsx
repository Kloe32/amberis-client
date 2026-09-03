import React, { useEffect, useState } from 'react';
import { getOrderById } from '../services/orderService';
import type { OrderResponse } from '../types/order';
import { currency } from '../data/products';
import { Check, FileText, ArrowRight, ShoppingBag, Package, Truck, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Read query parameter from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('order_id') || params.get('orderId');

    if (!id) {
      setLoading(false);
      setError('No order identification was provided in the URL.');
      return;
    }

    getOrderById(id)
      .then((res) => {
        if (res.data) {
          setOrder(res.data);
        } else {
          setError('Order details could not be retrieved.');
        }
      })
      .catch((err) => {
        console.error('Error fetching order confirmation:', err);
        setError(err.response?.data?.message || 'Unable to retrieve order details. Please verify your connection.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text-h)] font-sans px-6 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--aesop-ochre)] mb-4" />
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--aesop-ochre)]">
          Amberis
        </p>
        <p className="mt-2 text-sm text-[var(--taupe)] font-light">
          Verifying and compiling your formulation order...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text-h)] font-sans px-6 text-center">
        <div className="w-12 h-12 bg-[#fcf3f2] text-[#8a241b] rounded-full flex items-center justify-center mb-4 border border-[#e8c0bb]">
          <AlertCircle className="w-6 h-6" />
        </div>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#8a241b] mb-2">
          Verification Notice
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl text-[var(--text-h)] mb-4">
          {error || 'Order record not found.'}
        </h1>
        <p className="max-w-md text-xs sm:text-sm text-[var(--taupe)] font-light mb-8 leading-relaxed">
          If you have recently completed a payment, your confirmation email has been dispatched with full delivery details.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/products"
            className="btn-primary !text-white bg-[#22201d] px-6 py-3 text-xs uppercase tracking-widest font-semibold"
          >
            <span className="!text-white">Return to Store</span>
          </a>
          <a
            href="/my-orders"
            className="btn-secondary px-6 py-3 text-xs uppercase tracking-widest font-semibold"
          >
            <span>View All Orders</span>
          </a>
        </div>
      </div>
    );
  }

  const isPaid = order.paymentInfo?.status === 'PAID';

  return (
    <section className="min-h-svh bg-[var(--bg)] py-12 lg:py-20 px-[clamp(20px,5vw,72px)] font-sans text-[var(--text)]">
      <div className="mx-auto max-w-4xl">

        {/* Celebration Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-16 h-16 bg-[#eef5ec] text-[#285430] border border-[#c2ddbd] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Check className="w-8 h-8" />
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[#285430] mb-2">
            Order Successfully Placed
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-h)] mb-4">
            Thank you for your patronage.
          </h1>
          <p className="text-sm text-[var(--taupe)] font-light leading-relaxed">
            Order <strong className="text-[var(--text-h)] font-mono font-semibold">{order.orderNumber}</strong> has been registered. A confirmation summary has been allocated to your account.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] p-8 sm:p-10 mb-8 space-y-8 shadow-[var(--shadow-subtle)]">

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[var(--border)] text-xs">
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-[var(--taupe)] mb-1">Order Number</p>
              <p className="font-mono font-semibold text-[var(--text-h)]">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-[var(--taupe)] mb-1">Payment Status</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                isPaid ? 'bg-[#eef5ec] text-[#285430]' : 'bg-[#fef8ed] text-[#b88a44]'
              }`}>
                {order.paymentInfo?.status || 'PAID'}
              </span>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-[var(--taupe)] mb-1">Dispatch Method</p>
              <p className="font-medium text-[var(--text-h)] flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[var(--aesop-ochre)]" /> Standard Carbon-Neutral
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-[var(--taupe)] mb-1">Date</p>
              <p className="font-medium text-[var(--text-h)]">
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-h)] mb-4">
              Formulation Items
            </h2>
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {order.items.map((item, idx) => {
                const img = item.image || item.product?.images?.[0] || '';
                return (
                  <div key={idx} className="py-4 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 shrink-0 bg-[var(--surface-muted)] p-1 border border-[var(--border)] flex items-center justify-center">
                        {img ? (
                          <img src={img} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                        ) : (
                          <Package className="w-6 h-6 text-[var(--taupe)]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-heading text-sm text-[var(--text-h)] truncate">{item.name}</p>
                        {item.variant?.sku && (
                          <p className="text-[0.68rem] text-[var(--taupe)] font-mono">SKU: {item.variant.sku}</p>
                        )}
                        <p className="text-[var(--taupe)]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-medium text-[var(--text-h)]">
                      {currency.format(item.price * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Addresses & Financials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
            
            {/* Shipping Address */}
            <div className="space-y-2 text-xs">
              <h3 className="text-[0.68rem] uppercase tracking-wider font-semibold text-[var(--text-h)]">
                Recipient & Delivery Destination
              </h3>
              <p className="font-medium text-[var(--text-h)]">{order.shippingAddress.fullName}</p>
              <p className="text-[var(--taupe)] leading-relaxed">
                {order.shippingAddress.street}
                {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}
                <br />
                {order.shippingAddress.city}
                {order.shippingAddress.state ? `, ${order.shippingAddress.state}` : ''}{' '}
                {order.shippingAddress.zipCode || ''}
                <br />
                {order.shippingAddress.country}
              </p>
              <p className="text-[var(--taupe)] pt-1">Phone: {order.shippingAddress.phone}</p>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs bg-[var(--surface-muted)] p-5 border border-[var(--border)]">
              <div className="flex justify-between text-[var(--taupe)]">
                <span>Subtotal</span>
                <span>{currency.format(order.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-[var(--taupe)]">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? 'Complimentary' : currency.format(order.shippingCost || 0)}</span>
              </div>
              {order.discount ? (
                <div className="flex justify-between text-[#285430]">
                  <span>Discount</span>
                  <span>-{currency.format(order.discount)}</span>
                </div>
              ) : null}
              {order.tax ? (
                <div className="flex justify-between text-[var(--taupe)]">
                  <span>Tax</span>
                  <span>{currency.format(order.tax)}</span>
                </div>
              ) : null}
              <div className="border-t border-[var(--border)] pt-3 flex justify-between font-bold text-sm text-[var(--text-h)]">
                <span>Total Amount</span>
                <span>{currency.format(order.total || 0)}</span>
              </div>
            </div>

          </div>

          {/* Official Stripe Receipt */}
          {order.paymentInfo?.receiptUrl && (
            <div className="pt-4 border-t border-[var(--border)] text-center">
              <a
                href={order.paymentInfo.receiptUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--aesop-ochre)] hover:underline font-semibold"
              >
                <FileText className="w-4 h-4" /> View Official Stripe Tax Receipt
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="/products"
            className="btn-secondary w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.16em] font-semibold text-center flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </a>
          <a
            href="/my-orders"
            className="btn-primary !text-white bg-[#22201d] w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.16em] font-semibold text-center flex items-center justify-center gap-2"
          >
            <span className="!text-white">View Order History</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default OrderSuccessPage;
