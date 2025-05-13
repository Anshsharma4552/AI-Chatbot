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
import { Compass, GalleryHorizontalEnd, Ghost, Icon, LogIn, MoveUpRight, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
const MenuOptions=[
    {
        title: 'Home',
        icon: Search,
        path: '/'
    },
    {
        title: 'Discover',
        icon: Compass,
        path: '/discover'
    },
    {
        title: 'Library',
        icon: GalleryHorizontalEnd,
        path: '/library'
    },
    {
        title: 'Sign In',
        icon: LogIn,
        path: '#'
    }
]
function AppSidebar() {
    const path=usePathname()
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
                <Button className={'rounded-full mx-4 mt-4 bg-[#1C7483] hover:bg-transparent hover:text-black cursor-pointer'}>Sign Up</Button>
            </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className={"bg-accent"}>
        <div className='p-3'>
            <h2 className='text-gray-400'>Try Pro</h2>
            <p className='text-gray-500'>Upgrade for image upload smarter AI & more copilot.</p>
            <Button className={'bg-[#1C7483] text-gray-200 hover:bg-transparent  hover:text-black p-2 m-2 cursor-pointer'}>Learn More</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar