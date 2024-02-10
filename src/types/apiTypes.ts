import { BarCharts, Coupon, DashboardStats, LineCharts, Order, PieCharts, Product, User } from "./types";

export type MessageResponse = {
    success: boolean;
    message: string;
}

export type UserResponse = {
    success: boolean;
    user: User;
}

export type AllUsersResponse = {
    success: boolean,
    users: User[]
}

export type AllProductsResponse = {
    success: boolean;
    products: Product[];
}

export type SearchProductsResponse = {
    success: boolean;
    products: Product[];
    totalPages: number;
}

export type DeleteUserRequest = {
    admin_id: string;
    user_id: string;
}

export type SearchProducts = {
    name: string;
    price: number;
    category: string;
    page: number;
    sort: string;
}

export type ProductResponse = {
    success: boolean;
    product: Product;
}

export type NewProductRequest = {
    id: string;
    formData: FormData;
}

export type UpdateProductRequest = {
    product_id: string;
    user_id: string;
    formData: FormData;
}

export type DeleteProductRequest = {
    product_id: string;
    user_id: string;
}

export type CategoriesResponse = {
    success: boolean;
    categories: string[];
}

export interface AllOrdersResponse {
    success: boolean;
    orders: Order[];
}

export interface OrderResponse {
    success: boolean;
    order: Order;
}

export interface ProcessOrderRequest {
    user_id: string;
    order_id: string;
}

export interface CouponsResponse {
    success: boolean;
    coupons: Coupon[];
}

export interface CouponValidateResponse {
    success: boolean;
    coupon: string;
}

export type PaymentIntentResponse = {
    success: boolean;
    clientSecret: string;
}

export type DashboardStatsResponse = {
    success: boolean;
    stats: DashboardStats;
}

export type BarChartsResponse = {
    success: boolean;
    barCharts: BarCharts;
}

export type LineChartsResponse = {
    success: boolean;
    lineCharts: LineCharts;
}

export type PieChartsResponse = {
    success: boolean;
    pieCharts: PieCharts;
}


