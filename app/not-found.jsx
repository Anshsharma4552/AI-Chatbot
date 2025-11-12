import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="bg-cyan-700 hover:bg-cyan-800">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
          
          <Link href="/discover">
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Discover
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}