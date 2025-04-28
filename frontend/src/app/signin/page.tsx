"use client"

import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Appbar } from '@/components/Appbar';
import Link from 'next/link';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/config/config';


export const signInSchema = z.object({
    email: z.string().min(5),
    password: z.string().min(6)
})

const SignIn = () => {
    const router = useRouter();
    const [submitting, isSubmitting] = useState(false);
    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        try{
            isSubmitting(true);
            const response = await axios.post(`${BACKEND_URL}/user/signin`, data);
            if(response.status == 200){
              localStorage.setItem("token", response.data.token);
                router.push("/dashboard");
            }
            form.reset();
        }catch(error : any){
            console.log(error);
        }
        finally{
          isSubmitting(false);
        }
    }

    return (
        <div className='w-screen'>
            <Appbar />
            <div className='grid grid-cols-2 pt-20 px-12'>
                <div className='flex flex-col justify-center items-center gap-6'>
                    <div>
                        <h1 className='text-3xl font-bold tracking-tight max-w-md'>Automate across your teams.</h1>
                    </div>
                    <div className='flex flex-col gap-3 w-2/3 text-center'>
                        <h1 className='w-full'>Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.</h1>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='flex flex-col gap-3 items-start p-6 border-slate-200 border-[1px] rounded-xl w-full '>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full gap-2'>
                            <div className='flex flex-col justify-start gap-1'>
                                <label className='font-bold '>
                                    * Work Email
                                </label>
                                <input
                                    type="email"
                                    {...form.register("email")}
                                    className='border-[1px] rounded px-2 py-2'
                                />
                            </div>
                            <div className='flex flex-col justify-start gap-1'>
                                <label className='font-bold '>
                                    * Password
                                </label>
                                <input
                                    type="password"
                                    {...form.register("password")}
                                    className='border-[1px] rounded px-2 py-2'
                                />
                            </div>
                            <button disabled={submitting} type = {"submit"} className='text-lg px-2 py-2 bg-orange-600 text-white h-auto  cursor-pointer flex justify-center text-center items-center font-semibold rounded-lg mt-2'>Log In</button>
                        </form>
                        <div className='flex justify-center text-center items-center w-full'>
                            <h2>Create a new account <Link href={"/signup"} className='text-blue-500'>Sign Up</Link></h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;