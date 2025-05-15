import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Atom, AudioLines, Cpu, FileUp, Globe, Mic, Paperclip, SearchCheck, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIModelsOption } from '@/services/Shared'


function ChatInputBox() {
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
        <h1 className="text-3xl font-bold text-cyan-700 m-1">Botato</h1>
        <p className="text-xl text-cyan-700 mb-6">Your AI Bot</p>
        <div className='p-2 w-full max-w-2xl border rounded-2xl mt-5'>
            
            <div className='flex justify-between items-end'>
                <Tabs defaultValue="Search" className="w-full md:w-[400px]">
                    <TabsContent value="Search">
                        <input type='text' placeholder='Ask Anything' className='w-full p-4 outline-none'/>
                    </TabsContent>
                    <TabsContent value="Research">
                        <input type='text' placeholder='Research Anything' className='w-full p-4 outline-none'/>
                    </TabsContent>
                    <TabsList>
                        <TabsTrigger value="Search" className={'text-cyan-700'}> <SearchCheck/> Search</TabsTrigger>
                        <TabsTrigger value="Research" className={'text-cyan-700'}> <Atom/> Research</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className='flex gap-4 items-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'}>
                                <Cpu className='text-gray-500 h-5 w-5'/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {AIModelsOption.map((model,index)=>(
                                <DropdownMenuItem key={index} className={'hover:bg-gray-200'}>
                                    <div className='mb-1'>
                                        <h2 className='text-sm'>{model.name}</h2>
                                        <p className='text-xs text-gray-600'>{model.desc}</p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant={'ghost'}>
                        <Globe className='text-gray-500 h-5 w-5'/>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'}>
                                <Paperclip className='text-gray-500 h-5 w-5'/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex items-center gap-2 text-sm p-1 hover:bg-gray-200 rounded">
                                        <FileUp /> Local files
                                    </div>
                                    <div className="flex items-center gap-2 text-sm p-1 hover:bg-gray-200 rounded">
                                        <Share2 /> Connect files
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
            
                    <Button variant={'ghost'}>
                        <Mic className='text-gray-500 h-5 w-5'/>
                    </Button>
                    <Button className={'bg-cyan-900 hover:bg-cyan-700'}>
                        <AudioLines className='text-white h-5 w-5'/>
                    </Button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ChatInputBox