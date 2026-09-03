export interface ShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  street: string;
  addressLine2?: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
}

export interface OrderItemInput {
  product: string; // Product MongoDB ObjectId
  variant?: string; // ProductVariant ObjectId (optional)
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItemInput[];
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  shippingCost?: number;
  discount?: number;
  customerNote?: string;
}

export interface OrderResponse {
  _id: string;
  orderNumber: string;
  status: "PENDING" | "PROCESSING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  items: Array<{
    product: {
      _id: string;
      name: string;
      slug: string;
      images: string[];
      basePrice: number;
    };
    variant?: {
      _id: string;
      sku: string;
      attributes: Record<string, string>;
    };
    name: string;
    sku?: string;
    image?: string;
    price: number;
    quantity: number;
  }>;
  shippingAddress: ShippingAddress;
  paymentInfo: {
    method: string;
    transactionId?: string;
    status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
    paidAt?: string;
    receiptUrl?: string;
  };
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
  customerNote?: string;
  createdAt: string;
}

export interface PaymentIntentResponse {
  success: boolean;
  data: {
    clientSecret: string;
    paymentIntentId: string;
    amount: number;
    currency: string;
    orderId: string;
    orderNumber: string;
  };
}

export interface PriceReviewResponse {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
}

export interface PreviewOrderPayload {
  items: Array<{
    product: string;
    quantity: number;
    variant?: string;
  }>;
  discount?: number;
  shippingCost?: number;
}

