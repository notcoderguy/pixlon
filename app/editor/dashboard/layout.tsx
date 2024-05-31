'use client'

import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'


const layout = ({children} : {children : React.ReactNode}) => {
  const session = useSession()

  console.log(session)

  return (
    <div className='flex absolute w-full min-h-screen'>
        <aside className='bg-gray-900 w-[300px] p-[20px] flex flex-col justify-between'>
            <ul className=''>
            <li className='text-white font-black tracking-widest px-5 py-4 text-center hover:scale-110 transition-all duration-200'><Link href="/editor/dashboard">Dashboard</Link></li>
                <li className='text-white font-black tracking-widest px-5 py-4 text-center hover:scale-110 transition-all duration-200'><Link href="/editor/dashboard/create-editor">Create editor</Link></li>
                <li className='text-white font-black tracking-widest px-5 py-4 text-center hover:scale-110 transition-all duration-200'><Link href="/editor/dashboard/settings">Settings</Link></li>
            </ul>
            <div className='flex flex-col justify-center items-center'>
            <div className='text-white font-black tracking-widest px-5 py-4 text-center hover:scale-110 transition-all duration-200'><Link href="/editor/dashboard/settings">Profile</Link></div>
            <button className='bg-indigo-600 text-white px-6 py-3 rounded-md' onClick={()=>signOut()}>Log out</button>
            </div>
        </aside>
        <main className='flex-1 p-[20px]'>
            {children}
        </main>
    </div>
  )
}

export default layout