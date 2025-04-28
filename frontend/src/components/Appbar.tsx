'use client'
 
import { useRouter } from 'next/navigation'
import { PrimaryButton, LinkButton } from "./Button"
import { useEffect, useState } from 'react';

export const Appbar = ()=>{
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);
    
    return <div className="flex border-b border-slate-200 justify-between px-8 py-2 ">
        <div className='flex justify-center text-center items-center'>
            <p onClick={()=>{router.push("/")}} className='font-bold lowercase text-4xl tracking-tighter cursor-pointer'><span  className='text-orange-500'>_</span>Zapier</p>
        </div>
        <div className="">
            <div className='flex text-center justify-center items-center align-middle gap-2'>
                <LinkButton onClick={()=>{}}>Contact Sales</LinkButton>
                {token ? <div >
                    
                </div> : 
                <div className='flex gap-2 text-center justify-center'>
                    <LinkButton onClick={()=>{router.push("/signin")}}>Log In</LinkButton>
                    <PrimaryButton onClick={()=>{router.push("/signup")}}>Sign Up</PrimaryButton>
                </div>
                }
            </div>
        </div>
    </div>
}   