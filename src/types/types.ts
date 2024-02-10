export type User = {
    _id: string;
    name: string;
    photo: string;
    dob: string;
    gender: string;
    role: string;
    email: string;
}

export type Product = {
    _id: string;
    name: string;
    photo: string;
    category: string;
    price: number;
    stock: number;
}

// Order Types

export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
}

export type CartItem = {
    product_id: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
    stock: number;
}

export type OrderItem = {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: string;
    _id: string;
}

export type UserOrderRequest = {
    user: string;
    shippingInfo: ShippingInfo;
    orderItems: CartItem[];
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
}

export type Order = {
    _id: string;
    shippingInfo: ShippingInfo;
    user: {
        name: string;
        _id: string;
    };
    status: string;
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    orderItems: OrderItem[];
}

export type Coupon = {
    couponCode: string;
    amount: number;
}


type PercentAndCount = {
    revenue: number;
    product: number;
    user: number;
    order: number;
}

export type DashboardStats = {
    percent: PercentAndCount;
    count: PercentAndCount;
    chart: {
        order: number[];
        revenue: number[];
    };
    categoryCount: Record<string, number>[];
    genderRatio: {
        male: number;
        female: number;
    };
    latestTransaction: Record<string, string | number>[];
}

export type BarCharts = {
    product: number[];
    user: number[];
    order: number[];
}

export type LineCharts = {
    product: number[];
    user: number[];
    discount: number[];
    revenue: number[];
}

export type PieCharts = {
    orderFullfillmentRatio: {
        processing: number;
        shipped: number;
        delievered: number;
    };
    productCategoriesRatio: Record<string, number>[];
    stockAvailability: {
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution: {
        netMargin: number;
        discount: number;
        productionCost: number;
        burnt: number;
        marketingCost: number;
    };
    usersAgeGroup: {
        teen: number;
        adult: number;
        old: number;
    };
    adminCustomer: {
        admin: number;
        user: number;
    }
}