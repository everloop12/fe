/* eslint-disable no-unused-vars */
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


const answersAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.id > b.id) ? 1 : -1
})

const initialState = answersAdapter.getInitialState()

export const answersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAnswers: builder.query({
            query: () => '/answer',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAnswers = responseData.data.map(answer => {
                    return answer
                });
                return answersAdapter.setAll(initialState, loadedAnswers)
            },
            providesTags: (result/*, error, arg*/) => {
                if (result?.ids) {
                    return [
                        { type: 'Answer', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Answer', id }))
                    ]
                } else return [{ type: 'Answer', id: 'LIST' }]
            }
        }),
        getUserAnswers: builder.query({
            query: () => `user/answers`, // TODO
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAnswers = responseData.data.map(answer => {
                    return answer
                });
                return answersAdapter.setAll(initialState, loadedAnswers)
            },
            providesTags: (result/*, error, arg*/) => {
                if (result?.ids) {
                    return [
                        { type: 'Answer', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Answer', id }))
                    ]
                } else return [{ type: 'Answer', id: 'LIST' }]
            }
        }),
        getUserHistory: builder.query({
            query: (page) => `user/history/${page}`, // TODO
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAnswers = responseData.data.map(answer => {
                    return answer
                });
                return answersAdapter.setAll(initialState, loadedAnswers)
            },
        }),
        updateAnswer: builder.mutation({
            query: initialAnswer => ({
                url: '/answer',
                method: 'PATCH',
                body: {
                    ...initialAnswer,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Answer', id: arg.id }
            ]
        }),
        deleteAnswer: builder.mutation({
            query: ({ id }) => ({
                url: '/answer',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Answer', id: arg.id }
            ]
        }),
        deleteAnswers: builder.mutation({
            query: ({ ids }) => ({
                url: '/answer',
                method: 'DELETE',
                body: { ids }
            }),
            invalidatesTags: (result, error, arg) => [
                ...arg.ids.map((id) => ({ type: 'Answer', id: id }))
                // { type: 'Answer', id: arg.id }
            ]
        }),
        resetSelectCategories: builder.mutation({
            query: ({ ids }) => ({
                url: '/answer/reset',
                method: 'POST',
                body: { ids }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: 'LIST' },
                { type: 'Tag', id: 'LIST' },
                { type: 'Question', id: 'LIST' },
                ...arg.ids.map((id) => ({ type: 'Answer', id: id }))
                // { type: 'Answer', id: arg.id }
            ],
            async onQueryStarted({ ids: theIdList }, { dispatch, queryFulfilled, getState }) {
                console.log('ids', theIdList)
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    apiSlice.util.updateQueryData('getUserQuestionData', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const categories = theIdList.map((id) => draft?.categories?.entities[id])
                        if (categories && theIdList) {
                            const questionIds = categories.map((category) => {
                                return category.questions.map((question) => question.id)
                            }).flat()
                            categories.forEach((cat) => {
                                cat.questions.forEach((q) => {
                                    q.answers = []
                                })
                            })
                            questionIds.forEach((questionId, index) => {
                                const question = draft?.questions?.entities?.[questionId] || null

                                if (question) {
                                    question.answers = []
                                    const questionTags = question.tagIds.map((tagId) => draft?.tags?.entities?.[tagId])
                                    questionTags.forEach((tag) => {
                                        const questionTaginstance = tag.questions.find((q) => q.id === questionId)
                                        if (questionTaginstance) {
                                            questionTaginstance.answers = []
                                        }
                                    })

                                }
                            })
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),

        resetSelectTags: builder.mutation({
            query: ({ ids, uid }) => ({
                url: '/answer/resetT',
                method: 'POST',
                body: { ids, uid }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: 'LIST' },
                { type: 'Tag', id: 'LIST' },
                { type: 'Question', id: 'LIST' },
                ...arg.ids.map((id) => ({ type: 'Answer', id: id }))
                // { type: 'Answer', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetAnswersQuery,
    useGetUserAnswersQuery,
    useGetUserHistoryQuery,
    // useAddNewAnswerMutation,
    useUpdateAnswerMutation,
    useDeleteAnswerMutation,
    useDeleteAnswersMutation,
    useResetSelectCategoriesMutation,
    useResetSelectTagsMutation,
} = answersApiSlice

// returns the query result object
export const selectAnswersResult = answersApiSlice.endpoints.getAnswers.select()

// creates memoized selector
const selectAnswersData = createSelector(
    selectAnswersResult,
    answersResult => answersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAnswers,
    selectById: selectAnswerById,
    selectIds: selectAnswerIds
    // Pass in a selector that returns the answers slice of state
} = answersAdapter.getSelectors(state => selectAnswersData(state) ?? initialState)