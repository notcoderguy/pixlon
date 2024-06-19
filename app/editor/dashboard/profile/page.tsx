'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '@prisma/client'

const page = () => {
  const [userData, setUserData] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    axios.get('/api/get-user').then(response => {
      setUserData(response.data)
    })
    .finally(() => {
      setLoading(false)
    })
  },[])

  if(loading || userData === null){
    return (
      <div className='h-full flex justify-center items-center'>
        <div className='loader'/>
      </div>
    )
  }


  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <p>{userData.email}</p>
      <p>{userData.username}</p>
    </div>
  )
}

export default page