"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search, Atom, TrendingUp, BookOpen, Code, Lightbulb, Globe, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const trendingTopics = [
  { title: "Latest AI developments", icon: Zap, type: "research" },
  { title: "Climate change solutions", icon: Globe, type: "research" },
  { title: "Space exploration news", icon: TrendingUp, type: "search" },
  { title: "Quantum computing basics", icon: Code, type: "research" },
  { title: "Renewable energy trends", icon: Lightbulb, type: "search" },
  { title: "Machine learning tutorials", icon: BookOpen, type: "research" }
]

const quickPrompts = [
  "Explain quantum physics in simple terms",
  "What are the latest trends in web development?",
  "How does artificial intelligence work?",
  "Best practices for sustainable living",
  "Future of electric vehicles",
  "Introduction to blockchain technology"
]

function Discover() {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  const handleTopicClick = async (topic) => {
    if (!user?.primaryEmailAddress?.emailAddress) return
    
    setLoading(true)
    const libId = uuidv4()
    
    try {
      await axios.post('/api/library', {
        searchInput: topic.title,
        userEmail: user.primaryEmailAddress.emailAddress,
        type: topic.type,
        libId: libId
      })
      
      router.push(`/search/${libId}`)
    } catch (error) {
      console.error('Error creating search:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePromptClick = async (prompt) => {
    if (!user?.primaryEmailAddress?.emailAddress) return
    
    setLoading(true)
    const libId = uuidv4()
    
    try {
      await axios.post('/api/library', {
        searchInput: prompt,
        userEmail: user.primaryEmailAddress.emailAddress,
        type: 'search',
        libId: libId
      })
      
      router.push(`/search/${libId}`)
    } catch (error) {
      console.error('Error creating search:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-700 mb-2">Discover</h1>
        <p className="text-gray-600 text-lg">Explore trending topics and get inspired</p>
      </div>

      {/* Trending Topics */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Trending Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              onClick={() => handleTopicClick(topic)}
              className="bg-white border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer hover:border-cyan-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <topic.icon className="h-6 w-6 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-600 capitalize">
                  {topic.type}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {topic.type === 'search' ? (
                  <Search className="h-4 w-4" />
                ) : (
                  <Atom className="h-4 w-4" />
                )}
                <span>Click to explore</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Prompts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quick Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handlePromptClick(prompt)}
              disabled={loading}
              className="justify-start text-left h-auto p-4 hover:bg-cyan-50 hover:border-cyan-300"
            >
              <Search className="h-4 w-4 mr-3 text-cyan-600" />
              <span className="text-gray-700">{prompt}</span>
            </Button>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Technology", icon: Code, color: "bg-blue-100 text-blue-700" },
            { name: "Science", icon: Atom, color: "bg-green-100 text-green-700" },
            { name: "Education", icon: BookOpen, color: "bg-purple-100 text-purple-700" },
            { name: "Innovation", icon: Lightbulb, color: "bg-yellow-100 text-yellow-700" }
          ].map((category, index) => (
            <div
              key={index}
              className={`${category.color} rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer`}
            >
              <category.icon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Discover