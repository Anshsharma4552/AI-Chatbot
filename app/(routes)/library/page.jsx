"use client"
import React, { useEffect, useState } from 'react'
import { useUser, SignUpButton } from '@clerk/nextjs'
import { Clock, Search, Atom } from 'lucide-react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import axios from 'axios'

function Library() {
  const [searchHistory, setSearchHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchSearchHistory()
    }
  }, [user])

  const fetchSearchHistory = () => {
    try {
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]')
      setSearchHistory(history)
    } catch (error) {
      console.error('Error fetching search history:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchClick = (item) => {
    const params = new URLSearchParams({
      q: item.searchInput,
      type: item.type
    })
    router.push(`/answer?${params.toString()}`)
  }

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Library</h1>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Sign up to view your history</h2>
          <p className="text-gray-500 mb-6">Create an account to save and access your search history</p>
          <SignUpButton mode="modal">
            <Button className="bg-cyan-700 hover:bg-cyan-800 text-white">
              Sign Up Free
            </Button>
          </SignUpButton>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-cyan-700">Your History</h1>
      
      {searchHistory.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No searches yet</h2>
          <p className="text-gray-500">Start searching to build your history!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {searchHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSearchClick(item)}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {item.type === 'search' ? (
                      <Search className="h-4 w-4 text-cyan-600" />
                    ) : (
                      <Atom className="h-4 w-4 text-cyan-600" />
                    )}
                    <span className="text-sm font-medium text-cyan-600 capitalize">
                      {item.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {item.searchInput}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{moment(item.createdAt).fromNow()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Library