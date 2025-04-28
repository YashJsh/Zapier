import React from 'react'

const ZapBox = ({ name, index, image, onClick }: { name: string, index: number, image:string, onClick : ()=>void }) => {
    return (
        <div>
            <div className='border-3 border-dotted cursor-pointer px-[10vh] py-5 rounded-md flex justify-center hover:border-blue-700 hover:bg-slate-50 border:animate-spin gap-1 items-center' onClick={onClick}>
                <h1 className='font-bold'>{index}.</h1>
                <img src={image} className='w-[20px] h-[20px]' alt=" " />
                <h1 className='font-semibold '>{name}</h1>
            </div>
        </div>
    )
}

export default ZapBox;