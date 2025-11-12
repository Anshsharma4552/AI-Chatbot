"use client"
import { UserDetailContext } from '@/context/UserDetailsContext'
import { supabase } from '@/services/supabase'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

function Provider({children}) {
    const {user} = useUser()
    const [userDetail, setUserDetail] = useState()
    const [loading, setLoading] = useState(false)
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        console.log('useEffect triggered, user:', user)
        console.log('User email:', user?.primaryEmailAddress?.emailAddress)
        
        // Check if user exists and has primary email before proceeding
        if (user && user.primaryEmailAddress?.emailAddress && !initialized && !loading) {
            CreateNewUser()
        }
    }, [user, initialized, loading])

    const CreateNewUser = async () => {
        try {
            setLoading(true)
            
            // Ensure user email exists
            const userEmail = user?.primaryEmailAddress?.emailAddress
            if (!userEmail) {
                console.warn('User email not available yet')
                return
            }
            
            // Query existing users
            const { data: Users, error: fetchError } = await supabase
                .from('Users')
                .select('*')
                .eq('email', userEmail)

            if (fetchError) {
                console.error('Error fetching user:', fetchError)
                return
            }

            console.log('Fetched users:', Users)

            // Check if Users exists and has length property
            if (!Users || Users.length === 0) {
                // Create new user
                const { data, error: insertError } = await supabase
                    .from('Users')
                    .insert([
                        {
                            name: user?.fullName || 'Unknown User',
                            email: userEmail
                        },
                    ])
                    .select()

                if (insertError) {
                    console.error('Error creating user:', insertError)
                    return
                }

                if (data && data.length > 0) {
                    setUserDetail(data[0])
                    console.log('New user created:', data[0])
                }
                return
            }

            // User exists, set existing user
            setUserDetail(Users[0])
            console.log('Existing user found:', Users[0])
            
        } catch (error) {
            console.error('Unexpected error in CreateNewUser:', error)
        } finally {
            setLoading(false)
            setInitialized(true)
        }
    }

    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail, loading}}>
            <div className='w-full'>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider