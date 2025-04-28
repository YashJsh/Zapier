"use client"

import { Appbar } from '@/components/Appbar'
import { DarkButton } from '@/components/Button'
import { ZapTable } from '@/components/zapTable'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useZaps } from "../../hooks/getAllZaps"
import { LineSpinner } from 'ldrs/react'
import 'ldrs/react/LineSpinner.css'



const page = () => {
    const router = useRouter();
    const { loading, zaps } = useZaps();

    return (
        <div>
            <Appbar />
            <div className='grid-cols-1 px-auto px-[10vw] py-5'>
                <div className='flex justify-between items-center mt-4'>
                    <h1 className='font-bold text-2xl tracking-tight'>Zaps</h1>
                    <DarkButton onClick={() => { router.push("/zap/create") }} size='small'>Create</DarkButton>
                </div>
                <div className='flex justify-center py-7'>
                    <div className='w-full px-[2vw] rounded-xl flex justify-center text-center'>
                        {loading ? <LineSpinner
                            size="40"
                            stroke="3"
                            speed="1"
                            color="black"
                        />
                            : <ZapTable zaps={zaps} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page