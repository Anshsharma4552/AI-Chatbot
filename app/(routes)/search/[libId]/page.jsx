"use client"
import { supabase } from '@/services/supabase'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'

function SearchQueryResult() {
    const {libId}=useParams()
    const [searchInputRecord,setSearchInputRecord]=useState()
    useEffect(()=>{
        GetSearchQueryRecord()
    },[])
    const GetSearchQueryRecord=async()=>{
        let { data: library, error } = await supabase
            .from('library')
            .select('*')
            .eq('libId',libId)
        console.log(library[0])
        setSearchInputRecord(library[0])
    }
    return (
        <div>
            <Header searchInputRecord={searchInputRecord}/>
            <DisplayResult searchInputRecord={searchInputRecord}/>
        </div>
    )
}

export default SearchQueryResult