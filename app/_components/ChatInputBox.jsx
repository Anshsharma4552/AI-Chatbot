"use client" 
import React from 'react'
import { useState } from 'react'  
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Atom, AudioLines, SearchCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function ChatInputBox() {
    const [userSearchInput,setUserSearchInput]=useState('')
    const [searchType,setSearchType]=useState('search')
    const router = useRouter()
    
    const onSearchQuery=()=>{
        if (!userSearchInput.trim()) return
        
        // Save to localStorage for library
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
        const newSearch = {
            id: Date.now(),
            searchInput: userSearchInput,
            type: searchType,
            createdAt: new Date().toISOString()
        }
        searchHistory.unshift(newSearch)
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory.slice(0, 50)))
        
        const params = new URLSearchParams({
            q: userSearchInput,
            type: searchType
        })
        
        router.push(`/answer?${params.toString()}`)
    }
    return (
        <div className='flex flex-col h-screen items-center justify-center p-6'>
            <h1 className="text-3xl font-bold text-cyan-700 m-1">Botato</h1>
            <p className="text-xl text-cyan-700 mb-6">Your AI Bot</p>
            
            <div className='p-2 w-full max-w-2xl border rounded-2xl mt-5'>
                <div className='flex justify-between items-end'>
                    <Tabs defaultValue="Search" className="w-full md:w-[400px]">
                        <TabsContent value="Search">
                            <input 
                                type='text' 
                                placeholder='Ask Anything' 
                                value={userSearchInput}
                                onChange={(e)=>setUserSearchInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && userSearchInput && onSearchQuery()}
                                className='w-full p-4 outline-none'
                            />
                        </TabsContent>
                        <TabsContent value="Research">
                            <input 
                                type='text' 
                                placeholder='Research Anything'
                                value={userSearchInput}
                                onChange={(e)=>setUserSearchInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && userSearchInput && onSearchQuery()}
                                className='w-full p-4 outline-none'
                            />
                        </TabsContent>
                        <TabsList>
                            <TabsTrigger value="Search" className={'text-cyan-700'} onClick={()=>setSearchType('search')}> <SearchCheck/> Search</TabsTrigger>
                            <TabsTrigger value="Research" className={'text-cyan-700'} onClick={()=>setSearchType('research')}> <Atom/> Research</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    
                    <Button 
                        className={'bg-cyan-900 hover:bg-cyan-700'} 
                        onClick={onSearchQuery}
                        disabled={!userSearchInput.trim()}
                    >
                        {!userSearchInput ? (
                            <AudioLines className='text-white h-5 w-5'/>
                        ) : (
                            <ArrowRight className='text-white h-5 w-5'/>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatInputBox