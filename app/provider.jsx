"use client"
import { UserDetailContext } from '@/context/UserDetailsContext'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

function Provider({children}) {
    const {user} = useUser()
    const [userDetail, setUserDetail] = useState()
    const [loading, setLoading] = useState(false)
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        if (user && user.primaryEmailAddress?.emailAddress) {
            setUserDetail({
                name: user.fullName || 'User',
                email: user.primaryEmailAddress.emailAddress
            })
            setInitialized(true)
        }
    }, [user])

    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail, loading}}>
            <div className='w-full'>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider