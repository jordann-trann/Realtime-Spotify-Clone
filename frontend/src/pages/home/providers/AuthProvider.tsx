import { axiosInstance } from "@/lib/axios"
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";



const updateApiToken = (token:string | null) => {
    if(token) axiosInstance.defaults.headers.common['Authorisation'] = `Bearer ${token}`
    else delete axiosInstance.defaults.headers.common['Authorisation'] 
    
};


const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const {getToken, userId}= useAuth()
    const [loading,setLoading] = useState(true)
    const {checkAdminStatus} = useAuthStore();
    const {initSocket, disconnectSocket} = useChatStore();

    useEffect(() => {
        const initAuth = async () =>{
            try {
                const token = await getToken();
                updateApiToken(token);
                if(token) {
                    await checkAdminStatus();
                    if(userId) initSocket(userId);
                }
            } catch (error: any) {
                updateApiToken(null);
                console.log("Error in auth provider", error)
            } finally{
                setLoading(false);
            }
        };

        initAuth();

        //clean updateApiToken
        return () =>  disconnectSocket();
    }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

    if(loading) 
        return (
        <div className = "h-screen w-full flex items-center justify-center">
            <Loader className = "size-8 text-emerald-500 animate-spin" />
        </div>
    ) 

  return (
    <div>{children}</div>
  )
};

export default AuthProvider

