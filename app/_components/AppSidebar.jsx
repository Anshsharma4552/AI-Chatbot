"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image  from 'next/image'
import { GalleryHorizontalEnd, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
const MenuOptions=[
    {
        title: 'Home',
        icon: Search,
        path: '/'
    },
    {
        title: 'History',
        icon: GalleryHorizontalEnd,
        path: '/library'
    }
]
function AppSidebar() {
    const path=usePathname()
    const {user}=useUser()
  return (
    <Sidebar>
      <SidebarHeader className="bg-white flex items-center py-3">
        <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
            <h1 className="text-3xl font-bold text-cyan-700">Botato</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup />
            <SidebarContent>
                <SidebarMenu>
                    {MenuOptions.map((menu,index)=>(
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild 
                                className={`p-5 py-6 hover:bg-transparent hover:font-bold ${path?.includes(menu.path)&& 'font-bold'}`}>
                                <a href={menu.path} className=''>
                                    <menu.icon className='h-7 w-8'/>
                                    <span className='text-lg'>{menu.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}

                </SidebarMenu>
            </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className={"bg-white border-t"}>
        <div className='p-4'>
          {user ? (
            <div className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors'>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 truncate'>
                  {user.fullName || 'User'}
                </p>
                <p className='text-xs text-gray-500 truncate'>
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          ) : (
            <SignUpButton mode='modal'>
              <Button className='w-full bg-cyan-700 hover:bg-cyan-800 text-white'>
                Sign Up
              </Button>
            </SignUpButton>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar