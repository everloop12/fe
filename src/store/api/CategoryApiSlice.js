import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


const categorysAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.id > b.id) ? 1 : -1
})

const initialState = categorysAdapter.getInitialState()

export const categorysApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategorys: builder.query({
            query: () => '/category',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedCategorys = responseData.data.map(category => {
                    return category
                });
                return categorysAdapter.setAll(initialState, loadedCategorys)
            },
            providesTags: (result/*, error, arg*/) => {
                if (result?.ids) {
                    return [
                        { type: 'Category', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Category', id }))
                    ]
                } else return [{ type: 'Category', id: 'LIST' }]
            }
        }),
        getAnswersByCategorys: builder.query({
            query: () => `/category/userData`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedCategorys = responseData.data.map(category => {
                    return category
                });
                return categorysAdapter.setAll(initialState, loadedCategorys)
            },
            providesTags: (result/*, error, arg*/) => {
                if (result?.ids) {
                    return [
                        { type: 'Category', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Category', id }))
                    ]
                } else return [{ type: 'Category', id: 'LIST' }]
            }
        }),
        getAnalytics: builder.query({
            query: () => `/category/userAnalytics`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedCategorys = responseData.data.map(category => {
                    return category
                });
                return categorysAdapter.setAll(initialState, loadedCategorys)
            },
        }),
        addNewCategory: builder.mutation({
            query: initialCategory => ({
                url: '/category',
                method: 'POST',
                body: {
                    ...initialCategory,
                }
            }),
            invalidatesTags: [
                { type: 'Category', id: "LIST" }
            ]
        }),
        updateCategory: builder.mutation({
            query: initialCategory => {
                return ({
                    url: `/category/${initialCategory.id}`,
                    method: 'PATCH',
                    body: {
                        name: initialCategory.name,
                    }
                })
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: '/category',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
        deleteCategorys: builder.mutation({
            query: ({ ids }) => ({
                url: '/category',
                method: 'DELETE',
                body: { ids }
            }),
            invalidatesTags: (result, error, arg) => [
                ...arg.ids.map((id) => ({ type: 'Category', id: id }))
            ]
        }),
    }),
})

export const {
    useGetCategorysQuery,
    useGetAnswersByCategorysQuery,
    useGetAnalyticsQuery,
    useAddNewCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useDeleteCategorysMutation,
} = categorysApiSlice

// returns the query result object
export const selectCategorysResult = categorysApiSlice.endpoints.getCategorys.select()

// creates memoized selector
const selectCategorysData = createSelector(
    selectCategorysResult,
    categorysResult => categorysResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCategorys,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds
    // Pass in a selector that returns the categorys slice of state
} = categorysAdapter.getSelectors(state => selectCategorysData(state) ?? initialState)