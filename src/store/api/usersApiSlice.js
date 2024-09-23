import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


const usersAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.id > b.id) ? 1 : -1
})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/user',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.data.map(user => {
                    return user
                });
                return loadedUsers
            }
        }),
        getUserList: builder.query({
            query: () => '/user/list',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.data.map(user => {
                    return user
                });
                return loadedUsers
            }
        }),
        getOtherUser: builder.query({
            query: (id) => `user/info/${id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                return responseData.data
            }
        }),
        getOtherUserBadges: builder.query({
            query: (id) => `quest/badges/${id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                return responseData.data
            }
        }),
        getStats: builder.query({
            query: () => '/stats',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.data.map(user => {
                    return user
                });
                return loadedUsers
            }
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetUserListQuery,
    useGetOtherUserQuery,
    useGetOtherUserBadgesQuery,
    useGetStatsQuery,
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)