import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function ChatInputBox() {
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
        <h1 className="text-3xl font-bold text-cyan-700 m-4">Botato</h1>
        <div className='p-2 w-full max-w-2xl border rounded-2xl'>
            <input type='text' placeholder='Ask Anything'
                className='w-full p-4 outline-none'/>
            
            <div>
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
            </div>

        </div>
    </div>
  )
}

export default ChatInputBox