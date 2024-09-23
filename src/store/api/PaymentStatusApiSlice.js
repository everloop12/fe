import { apiSlice } from "./apiSlice";

export const paymentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubscriptionStatus: builder.query({
            query: () => '/user/subscriptionStatus',
            providesTags: [{ type: 'SubStatus', id: 'LIST' }]
        }),
        getPaymentLinks: builder.query({
            query: () => ({
                url: '/paymob/invoice',
                method: 'POST',
                body: {}
            }),
        }),
    }),
})

export const {
    useGetSubscriptionStatusQuery,
    useGetPaymentLinksQuery,
} = paymentsApiSlice
