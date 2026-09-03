import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../services/orderService';
import type { OrderResponse } from '../types/order';
import { useApp } from '../contexts/AppContext';
import { currency } from '../data/products';
import { Package, ExternalLink, Calendar, Truck, AlertCircle, Loader2, ShoppingBag } from 'lucide-react';

export const MyOrdersPage: React.FC = () => {
  const { isAuthenticated } = useApp();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    getMyOrders()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else if (res.data && Array.isArray((res.data as any).orders)) {
          setOrders((res.data as any).orders);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching my orders:', err);
        setError(err.response?.data?.message || 'Unable to retrieve order history.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] px-6">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--aesop-ochre)] mb-4" />
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--text-h)]">
          Redirecting to authentication...
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text-h)] px-6">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--aesop-ochre)] mb-4" />
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--aesop-ochre)]">
          Amberis Clientèle
        </p>
        <p className="mt-2 text-sm text-[var(--taupe)] font-light">
          Retrieving your formulation history...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-svh bg-[var(--bg)] py-12 lg:py-20 px-[clamp(20px,5vw,72px)] font-sans text-[var(--text)]">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
              Private Clientèle History
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-h)]">
              Your Orders.
            </h1>
          </div>
          <a
            href="/products"
            className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--text-h)] hover:text-[var(--aesop-ochre)] underline inline-flex items-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Explore Formulations
          </a>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-[#fcf3f2] border border-[#e8c0bb] text-[#8a241b] text-xs flex items-center gap-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-[var(--surface)] border border-[var(--border)] p-12 text-center space-y-4">
            <Package className="w-12 h-12 text-[var(--taupe)] mx-auto opacity-50" />
            <h2 className="font-heading text-2xl text-[var(--text-h)] font-normal">
              No previous orders registered.
            </h2>
            <p className="text-sm text-[var(--taupe)] font-light max-w-md mx-auto">
              When you purchase our botanical formulations, your order records and delivery details will appear here.
            </p>
            <div className="pt-4">
              <a
                href="/products"
                className="btn-primary !text-white bg-[#22201d] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold inline-block"
              >
                <span className="!text-white">Discover Autumn Formulations</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isPaid = order.paymentInfo?.status === 'PAID';
              return (
                <div
                  key={order._id}
                  className="bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 space-y-6 shadow-[var(--shadow-subtle)] transition-all hover:border-[var(--aesop-dark)]"
                >
                  {/* Top order bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)] text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[var(--text-h)]">
                          #{order.orderNumber || order._id}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                            isPaid
                              ? 'bg-[#eef5ec] text-[#285430]'
                              : 'bg-[#fef8ed] text-[#b88a44]'
                          }`}
                        >
                          {order.paymentInfo?.status || order.status}
                        </span>
                      </div>
                      <p className="text-[var(--taupe)] text-[0.7rem] flex items-center gap-1 font-light">
                        <Calendar className="w-3 h-3" />
                        Placed on{' '}
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[0.65rem] uppercase tracking-wider text-[var(--taupe)]">Total</p>
                        <p className="font-heading font-semibold text-base text-[var(--text-h)]">
                          {currency.format(order.total)}
                        </p>
                      </div>
                      <a
                        href={`/order-success?order_id=${order._id}`}
                        className="btn-secondary px-4 py-2 text-xs uppercase tracking-wider font-semibold"
                      >
                        <span>Details</span>
                      </a>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.map((item, idx) => {
                      const img = item.image || item.product?.images?.[0] || '';
                      return (
                        <div key={idx} className="flex gap-3 items-center text-xs bg-[var(--surface-muted)] p-3 border border-[var(--border)]">
                          <div className="w-12 h-12 shrink-0 bg-white p-1 border border-[var(--border)] flex items-center justify-center">
                            {img ? (
                              <img src={img} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                            ) : (
                              <Package className="w-5 h-5 text-[var(--taupe)]" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-heading text-xs text-[var(--text-h)] truncate font-medium">{item.name}</p>
                            <p className="text-[var(--taupe)] text-[0.68rem]">Qty: {item.quantity} × {currency.format(item.price)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer address & receipt */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--taupe)] border-t border-[rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-1 text-[0.7rem]">
                      <Truck className="w-3.5 h-3.5 text-[var(--aesop-ochre)]" />
                      <span>
                        Shipping to {order.shippingAddress.fullName}, {order.shippingAddress.city}, {order.shippingAddress.country}
                      </span>
                    </div>

                    {order.paymentInfo?.receiptUrl && (
                      <a
                        href={order.paymentInfo.receiptUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--aesop-ochre)] hover:underline font-semibold text-[0.7rem]"
                      >
                        Stripe Receipt <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default MyOrdersPage;
