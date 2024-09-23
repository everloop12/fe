    import {
        createSelector,
        createEntityAdapter
    } from "@reduxjs/toolkit";
    import { apiSlice } from "./apiSlice";


    const tagsAdapter = createEntityAdapter({
        sortComparer: (a, b) => (a.id > b.id) ? 1 : -1
    })

    const initialState = tagsAdapter.getInitialState()

    export const tagsApiSlice = apiSlice.injectEndpoints({
        endpoints: builder => ({
            getTags: builder.query({
                query: () => '/tag',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: responseData => {
                    const loadedTags = responseData.data.map(tag => {
                        return tag
                    });
                    return tagsAdapter.setAll(initialState, loadedTags)
                },
                providesTags: (result/*, error, arg*/) => {
                    if (result?.ids) {
                        return [
                            { type: 'Tag', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'Tag', id }))
                        ]
                    } else return [{ type: 'Tag', id: 'LIST' }]
                }
            }),
            getAnswersByTags: builder.query({
                query: () => `/tag/userData`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: responseData => {
                    const loadedTags = responseData.data.map(tag => {
                        return tag
                    });
                    return tagsAdapter.setAll(initialState, loadedTags)
                },
                providesTags: (result/*, error, arg*/) => {
                    if (result?.ids) {
                        return [
                            { type: 'Tag', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'Tag', id }))
                        ]
                    } else return [{ type: 'Tag', id: 'LIST' }]
                }
            }),
            addNewTag: builder.mutation({
                query: initialTag => ({
                    url: '/tag',
                    method: 'POST',
                    body: {
                        ...initialTag,
                    }
                }),
                invalidatesTags: [
                    { type: 'Tag', id: "LIST" }
                ]
            }),
            updateTag: builder.mutation({
                query: initialTag => {
                    return ({
                        url: `/tag/${initialTag.id}`,
                        method: 'PATCH',
                        body: {
                            name: initialTag.name,
                        }
                    })
                },
                invalidatesTags: (result, error, arg) => [
                    { type: 'Tag', id: arg.id }
                ]
            }),
            deleteTag: builder.mutation({
                query: ({ id }) => ({
                    url: '/tag',
                    method: 'DELETE',
                    body: { id }
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Tag', id: arg.id }
                ]
            }),
            deleteTags: builder.mutation({
                query: ({ ids }) => ({
                    url: '/tag',
                    method: 'DELETE',
                    body: { ids }
                }),
                invalidatesTags: (result, error, arg) => [
                    ...arg.ids.map((id) => ({ type: 'Tag', id: id }))
                ]
            }),
        }),
    })

    export const {
        useGetTagsQuery,
        useGetAnswersByTagsQuery,
        useAddNewTagMutation,
        useUpdateTagMutation,
        useDeleteTagMutation,
        useDeleteTagsMutation,
    } = tagsApiSlice

    // returns the query result object
    export const selectTagsResult = tagsApiSlice.endpoints.getTags.select()

    // creates memoized selector
    const selectTagsData = createSelector(
        selectTagsResult,
        tagsResult => tagsResult.data // normalized state object with ids & entities
    )

    //getSelectors creates these selectors and we rename them with aliases using destructuring
    export const {
        selectAll: selectAllTags,
        selectById: selectTagById,
        selectIds: selectTagIds
        // Pass in a selector that returns the tags slice of state
    } = tagsAdapter.getSelectors(state => selectTagsData(state) ?? initialState)