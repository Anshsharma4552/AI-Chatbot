"use client"
import { supabase } from '@/services/supabase'
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'

function provider({children}) {
    const {user}=useUser()
    useEffect(()=>{
        user&&CreateNewUser()
    },[user])
    const CreateNewUser=async()=>{
        let { data: Users, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email',user?.primaryEmailAddress.emailAddress)
        console.log(Users)
        if(Users.lenght==0){
            const { data, error } = await supabase
                .from('Users')
                .insert([
                    {
                        name:user?.fullName,
                        email:user?.primaryEmailAddress.emailAddress
                    },
                ])
                .select()
                console.log(data)
        }
    }
    return (
    <div className='w-full'>{children}</div>
  )
}

export default provider