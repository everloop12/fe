import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


const questsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.id > b.id) ? 1 : -1
})

const initialState = questsAdapter.getInitialState()

export const questsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuests: builder.query({
            query: (uid) => `/quest/${uid}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedQuests = responseData.data.map(quest => {
                    return quest
                });
                return questsAdapter.setAll(initialState, loadedQuests)
            },
            providesTags: (result/*, error, arg*/) => {
                if (result?.ids) {
                    return [
                        { type: 'Quest', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Quest', id }))
                    ]
                } else return [{ type: 'Quest', id: 'LIST' }]
            }
        }),
        getBadges: builder.query({
            query: (id) => !id ? `/quest/badges` : `/quest/badges/${id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                return responseData.data
            },
        }),
    }),
})

export const {
    useGetQuestsQuery,
    useGetBadgesQuery
} = questsApiSlice

// returns the query result object
export const selectQuestsResult = questsApiSlice.endpoints.getQuests.select()

// creates memoized selector
const selectQuestsData = createSelector(
    selectQuestsResult,
    questsResult => questsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllQuests,
    selectById: selectQuestById,
    selectIds: selectQuestIds
    // Pass in a selector that returns the quests slice of state
} = questsAdapter.getSelectors(state => selectQuestsData(state) ?? initialState)