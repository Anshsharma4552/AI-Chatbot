import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { query } = await req.json()
    
    const mockImages = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      urls: {
        small: `https://picsum.photos/300/200?random=${i + Math.random()}`
      },
      alt_description: `${query} image ${i + 1}`,
      user: { name: 'Sample User' }
    }))
    
    return NextResponse.json({ results: mockImages })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}