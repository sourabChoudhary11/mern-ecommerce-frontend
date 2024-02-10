import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductResponse, SearchProducts, SearchProductsResponse, UpdateProductRequest } from "../../types/apiTypes";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/product/` }),
    tagTypes: ["products"],
    endpoints: (builder) => ({
        latestProduct: builder.query<AllProductsResponse, string>({
            query: () => "latest",
            providesTags: ["products"]
        }),
        allProducts: builder.query<AllProductsResponse, string>({
            query: (id) => `all?id=${id}`,
            providesTags: ["products"]
        }),
        searchProduct: builder.query<SearchProductsResponse, SearchProducts>({
            query: ({ category, price, sort, page, name }) => {
                let url = `search?name=${name}&page=${page}`;
                if(price) url+= `&price=${price}`;
                if(category) url+= `&category=${category}`;
                if(sort) url+= `&sort=${sort}`;
                return url;
            },
            providesTags: ["products"]
        }),
        allCategories: builder.query<CategoriesResponse, string>({
            query: () => `categories`,
            providesTags: ["products"]
        }),
        getSpecificProduct: builder.query<ProductResponse, string>({
            query: (id) => id,
            providesTags: ["products"]
        }),
        deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
            query: ({user_id, product_id}) => ({
                url: `${product_id}?id=${user_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"]
        }),
        updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
            query: ({user_id, product_id, formData})=> ({
                url: `${product_id}?id=${user_id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["products"]
        }),
        newProduct: builder.mutation<MessageResponse, NewProductRequest>({
            query: ({id, formData}) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["products"]
        })
    })
});

export const {
    useLatestProductQuery,
    useAllProductsQuery,
    useDeleteProductMutation,
    useNewProductMutation,
    useGetSpecificProductQuery,
    useAllCategoriesQuery,
    useSearchProductQuery,
    useUpdateProductMutation
} = productApi;
