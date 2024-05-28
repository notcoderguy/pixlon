'use client'

import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthContextProps {
    children : React.ReactNode;
}

export const AuthContext = ({children} : AuthContextProps)=>{
    return(
        <SessionProvider>{children}</SessionProvider>
    )
}