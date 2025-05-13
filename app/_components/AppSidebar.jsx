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
import { Compass, GalleryHorizontalEnd, LogIn, Search } from 'lucide-react'
const MenuOptions=[
    {
        title: 'Home',
        icon: Search,
        path: '/'
    },
    {
        title: 'Discover',
        icon: Compass,
        path: '/'
    },
    {
        title: 'Library',
        icon: GalleryHorizontalEnd,
        path: '/'
    },
    {
        title: 'Sign In',
        icon: LogIn,
        path: '/'
    }
]
function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white flex items-center py-3">
        <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
            <h1 className="text-3xl font-bold text-cyan-700">Quantara</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup />
            <SidebarContent>
                <SidebarMenu>
                    {MenuOptions.map((menu,index)=>(
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild className={'p-5 py-6 hover:bg-transparent hover:font-bold'}>
                                <a href={menu.path} className=''>
                                    <menu.icon className='h-7 w-7'/>
                                    <span className='text-lg'>{menu.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar