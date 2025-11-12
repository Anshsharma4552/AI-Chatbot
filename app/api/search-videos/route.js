import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { query } = await req.json()
    
    const mockVideos = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      title: `${query} - Video ${i + 1}`,
      thumbnail: `https://picsum.photos/320/180?random=${i + 100}`,
      duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      channel: `Channel ${i + 1}`,
      views: `${Math.floor(Math.random() * 1000)}K views`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    }))
    
    return NextResponse.json({ results: mockVideos })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
  }
}