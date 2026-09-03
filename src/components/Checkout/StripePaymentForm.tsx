import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Lock, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

interface Props {
  orderId: string;
  totalAmount: number;
  onPaymentSuccess?: () => void;
}

export const StripePaymentForm: React.FC<Props> = ({ orderId, totalAmount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success?order_id=${orderId}`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "An unexpected error occurred during payment processing.");
        setIsProcessing(false);
      } else if (paymentIntent && (paymentIntent.status === "succeeded" || paymentIntent.status === "processing")) {
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
        // Direct navigation to order success page
        window.location.href = `/order-success?order_id=${orderId}`;
      } else {
        // Fallback redirect if status is requires_action or completed
        window.location.href = `/order-success?order_id=${orderId}`;
      }
    } catch (err: any) {
      setErrorMessage(err.message || "A network or processing error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe Payment Element */}
      <div className="p-4 sm:p-6 bg-[#ffffff] border border-[var(--border)] rounded-sm">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 bg-[#fcf3f2] border border-[#e8c0bb] text-[#8a241b] text-xs flex items-start gap-3 rounded-sm animate-shake">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <div className="leading-relaxed">
            <span className="font-semibold">Payment declined: </span>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Security note */}
      <div className="flex items-center justify-between text-[0.68rem] text-[var(--taupe)] px-1">
        <span className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[var(--aesop-ochre)]" />
          256-bit SSL Encrypted & PCI Compliant
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#285430]" />
          Direct Stripe Authentication
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn-primary !text-white bg-[#22201d] w-full py-4 px-6 text-xs uppercase tracking-[0.18em] font-semibold disabled:opacity-50 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span className="!text-white">Processing Secure Payment...</span>
          </>
        ) : (
          <span className="!text-white">
            Pay ${totalAmount.toFixed(2)} USD
          </span>
        )}
      </button>
    </form>
  );
};

export default StripePaymentForm;
