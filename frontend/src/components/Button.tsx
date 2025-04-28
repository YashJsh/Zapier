import { ReactNode } from "react";

export const LinkButton = ({children, onClick} : {children : ReactNode, onClick : ()=>void})=>{
    return <div className="px-2 flex items-center text-md font-light cursor-pointer hover:bg-slate-100 rounded-xl " onClick = {onClick}>
        {children}
    </div>
}

export const PrimaryButton = ({children, onClick, size = "small" } : {children : ReactNode, onClick : ()=>void, size? : "big" | "small"})=>{
    return <div className={`${size === "small" ? 'text-md px-4 py-2 '  : 'text-lg px-6 py-4'} bg-orange-600 text-white h-auto w-fit cursor-pointer flex items-center font-semibold rounded-4xl `} onClick = {onClick}>
        {children}
    </div>
}

export const DarkButton = ({children, onClick, size = "small" } : {children : ReactNode, onClick : ()=>void, size? : "big" | "small"})=>{
    return <div className={`${size === "small" ? 'text-md px-5 py-2 '  : 'text-lg px-6 py-4'} bg-purple-700 text-white h-auto w-fit cursor-pointer flex items-center font-semibold rounded-2xl `} onClick = {onClick}>
        {children}
    </div>
}