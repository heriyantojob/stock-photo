import { apiSlice } from "../../store/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        register: builder.mutation({
            query: body => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...body }
            })
        }),

        verify: builder.mutation({
            query: body => ({
                url: '/auth/verify',
                method: 'POST',
                body: { ...body }
            })
        }),




        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
             
                    dispatch(logOut({}))
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                 
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
               
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                 
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useRegisterMutation,
    useVerifyMutation,
    
} = authApiSlice 