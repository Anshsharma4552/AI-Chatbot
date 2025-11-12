"use client"
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'

function AnswerDisplay({ searchInputRecord }) {
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (searchInputRecord) {
      generateAnswer()
    }
  }, [searchInputRecord])

  const generateAnswer = async () => {
    setLoading(true)
    try {
      console.log('Generating answer for:', searchInputRecord)
      const result = await axios.post('/api/brave-search-api', {
        searchInput: searchInputRecord?.searchInput,
        searchType: searchInputRecord?.type
      })
      
      console.log('API Response:', result.data)
      const generatedText = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer generated'
      console.log('Generated text:', generatedText)
      setAnswer(generatedText)
    } catch (error) {
      console.error('Error generating answer:', error)
      console.error('Error details:', error.response?.data)
      setAnswer('Sorry, I encountered an error while generating the answer.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(answer)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatAnswer = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('##')) {
        return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.replace('##', '').trim()}</h3>
      } else if (line.startsWith('#')) {
        return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.replace('#', '').trim()}</h2>
      } else if (line.startsWith('*')) {
        return <li key={index} className="ml-4 mb-1">{line.replace('*', '').trim()}</li>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="mb-2 leading-relaxed">{line}</p>
      }
    })
  }

  if (loading) {
    return (
      <div className="mt-6 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  return (
    <div className="mt-6">
      <div className="bg-gray-50 rounded-lg p-6 border">
        <div className="prose max-w-none">
          {answer ? formatAnswer(answer) : (
            <p className="text-gray-500">No answer available. Please try again.</p>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-6 pt-4 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={copyToClipboard}
            className="text-gray-600 hover:text-gray-800"
          >
            <Copy className="h-4 w-4 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
            <ThumbsUp className="h-4 w-4 mr-1" />
            Helpful
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
            <ThumbsDown className="h-4 w-4 mr-1" />
            Not helpful
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AnswerDisplay