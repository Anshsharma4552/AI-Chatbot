"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { Copy, ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function AnswerPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [answer, setAnswer] = useState('')
  const [displayedAnswer, setDisplayedAnswer] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  const question = searchParams.get('q')
  const searchType = searchParams.get('type')

  useEffect(() => {
    if (question) {
      generateAnswer()
    }
  }, [question])

  const generateAnswer = async () => {
    setLoading(true)
    try {
      const result = await axios.post('/api/brave-search-api', {
        searchInput: question,
        searchType: searchType
      })
      
      const generatedText = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer generated'
      setAnswer(generatedText)
      setLoading(false)
      typewriterEffect(generatedText)
    } catch (error) {
      console.error('Error generating answer:', error)
      const errorText = 'Sorry, I encountered an error while generating the answer.'
      setAnswer(errorText)
      setLoading(false)
      typewriterEffect(errorText)
    }
  }

  const typewriterEffect = (text) => {
    setIsTyping(true)
    setDisplayedAnswer('')
    let i = 0
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedAnswer(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setIsTyping(false)
      }
    }, 80)
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
      } else if (line.startsWith('•') || line.startsWith('*') || line.startsWith('-')) {
        return (
          <div key={index} className="flex items-start mb-2">
            <span className="text-cyan-600 mr-2 mt-1">•</span>
            <span className="leading-relaxed">{line.replace(/^[•*-]\s*/, '').trim()}</span>
          </div>
        )
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="mb-2 leading-relaxed">{line}</p>
      }
    })
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{question}</h1>
          <p className="text-sm text-gray-500 capitalize">{searchType} mode</p>
        </div>

      {/* Answer Section */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 border animate-in slide-in-from-bottom-4 duration-500">
          <div className="prose max-w-none">
            {displayedAnswer ? (
              <div>
                {formatAnswer(displayedAnswer)}
                {isTyping && <span className="animate-pulse">|</span>}
              </div>
            ) : (
              <p className="text-gray-500">No answer available. Please try again.</p>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-6 pt-4 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={copyToClipboard}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 transition-colors">
              <ThumbsUp className="h-4 w-4 mr-1" />
              Helpful
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 transition-colors">
              <ThumbsDown className="h-4 w-4 mr-1" />
              Not helpful
            </Button>
          </div>
        </div>
      )}

      </div>

      {/* Fixed Search Input at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/90 backdrop-blur-sm border-t shadow-2xl p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask another question..."
              className="flex-1 p-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  const params = new URLSearchParams({ q: e.target.value, type: searchType })
                  router.push(`/answer?${params.toString()}`)
                }
              }}
            />
            <Button 
              className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-8 py-4 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg"
              onClick={(e) => {
                const input = e.target.parentElement.querySelector('input')
                if (input.value.trim()) {
                  const params = new URLSearchParams({ q: input.value, type: searchType })
                  router.push(`/answer?${params.toString()}`)
                }
              }}
            >
              Ask
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerPage