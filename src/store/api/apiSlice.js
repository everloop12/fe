import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        //baseUrl: 'http://127.0.0.1:3500/v1',
              baseUrl: 'https://medmythica-api-rh5e6.ondigitalocean.app/v1/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.user?.user?.token || '';
            headers.set('ngrok-skip-browser-warning', 'true');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Question', 'User', 'Category', 'Answer', 'Quest', 'BoardUser', 'SubStatus'],
    endpoints: () => ({})
});


      //baseUrl: 'https://medmythica-api-rh5e6.ondigitalocean.app/v1/',d