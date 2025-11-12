"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import DisplayResult from './_components/DisplayResult'
import axios from 'axios'

function SearchQueryResult() {
    const {libId}=useParams()
    const [searchInputRecord,setSearchInputRecord]=useState()
    
    useEffect(()=>{
        GetSearchQueryRecord()
    },[libId])
    
    const GetSearchQueryRecord=async()=>{
        try {
            const response = await axios.get(`/api/library?libId=${libId}`)
            if (response.data) {
                setSearchInputRecord(response.data)
            }
        } catch (error) {
            console.error('Error fetching record:', error)
        }
    }
    
    return (
        <div>
            <Header searchInputRecord={searchInputRecord}/>
            <div className='px-10 md:px-20 lg:px-36 xl:px-56 mt-20'>
                <DisplayResult searchInputRecord={searchInputRecord}/>
            </div>
        </div>
    )
}

export default SearchQueryResult