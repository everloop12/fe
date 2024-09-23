/* eslint-disable no-unused-vars */
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { addXp, progressStreak, setXp } from "store/reducers/user";


const questionsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.id > b.id) ? 1 : -1
})

const initialState = questionsAdapter.getInitialState()

export const questionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuestions: builder.query({
            query: (queryBody) =>
            ({
                url: '/question/page',
                method: 'POST',
                body: {
                    ...queryBody,
                }
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedQuestions = responseData.data.map(question => {
                    return question
                });
                return questionsAdapter.setAll(initialState, loadedQuestions)
            },
            providesTags: (result/*, error, arg*/) => {
                if (result?.ids) {
                    return [
                        { type: 'Question', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Question', id }))
                    ]
                } else return [{ type: 'Question', id: 'LIST' }]
            }
        }),
        getSaidQuestion: builder.query({
            query: (id) => `question/${(!id || id == '') ? 'none' : id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const question = responseData?.data || null;
                return question
            }
        }),
        getUserQuestionData: builder.query({
            query: () => `question/getUserData`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const questions = { ids: [], entities: {} };
                const stats = responseData.data.stats;
                responseData.data.questions.forEach((question) => {
                    questions.ids.push(question.id)
                    questions.entities[question.id] = {
                        ...question,
                        stats: stats.find(stat => stat.id === question.id).answers
                    }
                })
                const categoriesO = { ids: [], entities: {} }
                responseData.data.categories.forEach(category => {
                    const catQuestionIds = category.questionIDs
                    categoriesO.ids.push(category.id)

                    categoriesO.entities[category.id] = {
                        ...category,
                        questions: catQuestionIds.map((id) => {
                            const ques = questions.entities[id]
                            if (!ques)
                                return null
                            return ({
                                ...questions.entities[id],
                                answers: questions.entities[id].answers.filter((sanswer) => !sanswer.deleted),

                            })
                        }).filter(x => x != null)
                    }
                })

                const tagsO = { ids: [], entities: {} }
                responseData.data.tags.map(tag => {
                    const tagQuestionIds = tag.questionIDs
                    tagsO.ids.push(tag.id)
                    tagsO.entities[tag.id] = {
                        ...tag,
                        questions: tagQuestionIds.map((id) => !questions.entities[id] ? null : ({
                            ...questions.entities[id],
                            answers: questions.entities[id].answers.filter((x) => !x.deleted),
                        })).filter((x) => x != null)
                    }
                })
                return { questions, categories: categoriesO, tags: tagsO }
            },
            // providesTags: (result/*, error, arg*/) => {
            //     if (result?.ids) {
            //         return [
            //             { type: 'Data', id: 'LIST' },
            //             ...result.ids.map(id => ({ type: 'Data', id }))
            //         ]
            //     } else return [{ type: 'Data', id: 'LIST' }]
            // }

        }),
        getRevisionQuestions: builder.query({
            query: (queryBody) => ({
                url: '/question/filteredQuestion',
                method: 'POST',
                body: {
                    ...queryBody,
                    revision: true
                }
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedQuestions = responseData.data.map(question => {
                    return question
                });
                return questionsAdapter.setAll(initialState, loadedQuestions)
            },
            providesTags: (result/*, error, arg*/) => {
                if (result?.ids) {
                    return [
                        { type: 'Question', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Question', id }))
                    ]
                } else return [{ type: 'Question', id: 'LIST' }]
            }
        }),
        getQuestionsInCategories: builder.query({
            query: (queryBody) => ({
                url: '/question/filteredQuestion',
                method: 'POST',
                body: {
                    ...queryBody
                }
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const stats = responseData.data.stats;
                const loadedQuestions = responseData.data.questions.map(question => {
                    return {
                        ...question,
                        stats: stats.find(stat => stat.id === question.id).answers
                    }
                });
                return questionsAdapter.setAll(initialState, loadedQuestions)
            },
            providesTags: (result/*, error, arg*/) => {
                if (result?.ids) {
                    return [
                        { type: 'Question', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Question', id }))
                    ]
                } else return [{ type: 'Question', id: 'LIST' }]
            }
        }),
        addNewQuestion: builder.mutation({
            query: initialQuestion => ({
                url: '/question',
                method: 'POST',
                body: {
                    ...initialQuestion,
                }
            }),
            invalidatesTags: [
                { type: 'Question', id: "LIST" },
                { type: 'Category', id: "LIST" }
            ]
        }),
        addNewAnswer: builder.mutation({
            query: initialAnswer => {
                if (initialAnswer.queryReference.revision)
                    return ({})
                else
                    return ({
                        url: '/answer',
                        method: 'POST',
                        body: {
                            ...initialAnswer,
                        }
                    })
            },
            async onQueryStarted({ questionId, queryReference, callBack, ...rest }, { dispatch, queryFulfilled, getState }) {

                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    apiSlice.util.updateQueryData('getUserQuestionData', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const question = draft?.questions?.entities?.[questionId] || null;
                        if (question) {
                            question.answers = [{ questionId, ...rest }]
                        }

                        question.categoryIds.forEach((categoryId) => {
                            const category = draft?.categories?.entities?.[categoryId] || null;
                            if (category) {
                                const questionIndex = category.questions.findIndex((x) => x.id === questionId)
                                if (questionIndex !== -1) {
                                    category.questions[questionIndex].answers = [{ questionId, ...rest }]
                                }
                            }


                        })
                        question.tagIds.forEach((tagId) => {
                            const tag = draft?.tags?.entities?.[tagId] || null;
                            if (tag) {
                                const questionIndex = tag.questions.findIndex((x) => x.id === questionId)
                                if (questionIndex !== -1) {
                                    tag.questions[questionIndex].answers = [{ questionId, ...rest }]
                                }
                            }
                        })

                        // if (question) question.answers = [{ questionId, ...rest }];
                    })
                )
                const streakResult = dispatch(progressStreak({ streak: rest.isCorrect ? 1 : 0 }))
                const { streak } = getState().user.user
                const xpResult = dispatch(addXp({ xp: rest.isCorrect ? (streak > 3 ? 3 : 2) : 0 }))
                const { xp } = getState().user.user
                xp;
                if (!queryReference.revision)
                    try {
                        await queryFulfilled
                    } catch {
                        patchResult.undo()
                        callBack.func()
                        // streakResult.undo()
                        // xpResult.undo()
                    }
            }
        }),
        updateQuestion: builder.mutation({
            query: initialQuestion => ({
                url: `/question/${initialQuestion.id}`,
                method: 'PATCH',
                body: {
                    ...initialQuestion,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: "LIST" },
                { type: 'Question', id: arg.id }
            ]
        }),
        deleteQuestion: builder.mutation({
            query: ({ id }) => ({
                url: '/question',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: "LIST" },
                { type: 'Question', id: arg.id }
            ]
        }),
        deleteQuestions: builder.mutation({
            query: ({ ids }) => ({
                url: '/question',
                method: 'DELETE',
                body: { ids }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: "LIST" },
                ...arg.ids.map((id) => ({ type: 'Question', id: id }))
                // { type: 'Question', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetQuestionsQuery,
    useGetSaidQuestionQuery,
    useGetUserQuestionDataQuery,
    useGetRevisionQuestionsQuery,
    useGetQuestionsInCategoriesQuery,
    useAddNewAnswerMutation,
    useAddNewQuestionMutation,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
    useDeleteQuestionsMutation,
} = questionsApiSlice

// returns the query result object
export const selectQuestionsResult = questionsApiSlice.endpoints.getQuestions.select()

// creates memoized selector
const selectQuestionsData = createSelector(
    selectQuestionsResult,
    questionsResult => questionsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllQuestions,
    selectById: selectQuestionById,
    selectIds: selectQuestionIds
    // Pass in a selector that returns the questions slice of state
} = questionsAdapter.getSelectors(state => selectQuestionsData(state) ?? initialState)