import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(req) {
  try {
    const { searchInput, userEmail, type, libId } = await req.json()
    
    const client = await clientPromise
    const db = client.db('botato')
    
    const result = await db.collection('library').insertOne({
      searchInput,
      userEmail,
      type,
      libId,
      createdAt: new Date()
    })
    
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error('MongoDB Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userEmail = searchParams.get('userEmail')
    const libId = searchParams.get('libId')
    
    const client = await clientPromise
    const db = client.db('botato')
    
    if (libId) {
      const result = await db.collection('library').findOne({ libId })
      return NextResponse.json(result)
    }
    
    if (userEmail) {
      const results = await db.collection('library')
        .find({ userEmail })
        .sort({ createdAt: -1 })
        .toArray()
      return NextResponse.json(results)
    }
    
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}