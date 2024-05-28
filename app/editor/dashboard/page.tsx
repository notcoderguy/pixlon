'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

const page = () => {
  return (
    <div>
        <h1>dashboard</h1>
        <button className='bg-indigo-600 text-white px-6 py-3 rounded-md' onClick={()=>signOut()}>Log out</button>
    </div>
  )
}

export default page