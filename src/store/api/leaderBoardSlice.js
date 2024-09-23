import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


const boardUsersAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.id > b.id) ? 1 : -1
})

const initialState = boardUsersAdapter.getInitialState()

export const boardUsersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBoardUsers: builder.query({
            query: (page) => `/user/leaderBoard/${page}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedBoardUsers = responseData.data.map(boardUser => {
                    return boardUser
                });
                return boardUsersAdapter.setAll(initialState, loadedBoardUsers)
            },
            providesTags: (result/*, error, arg*/) => {
                if (result?.ids) {
                    return [
                        { type: 'BoardUser', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'BoardUser', id }))
                    ]
                } else return [{ type: 'BoardUser', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetBoardUsersQuery,
} = boardUsersApiSlice

// returns the query result object
export const selectBoardUsersResult = boardUsersApiSlice.endpoints.getBoardUsers.select()

// creates memoized selector
const selectBoardUsersData = createSelector(
    selectBoardUsersResult,
    boardUsersResult => boardUsersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBoardUsers,
    selectById: selectBoardUserById,
    selectIds: selectBoardUserIds
    // Pass in a selector that returns the boardUsers slice of state
} = boardUsersAdapter.getSelectors(state => selectBoardUsersData(state) ?? initialState)