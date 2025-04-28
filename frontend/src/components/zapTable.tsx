import { Zap } from "@/hooks/getAllZaps"
import { useRouter } from "next/navigation";
import { VscLinkExternal } from "react-icons/vsc";

export const ZapTable = ({ zaps }: { zaps: Zap[] }) => {
    const router = useRouter();
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-2 rounded-2xl bg-[#FFFDF8]">
                <thead>
                    <tr className="border-slate-400 border-b-[1px]">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Apps</th>
                        <th className="px-4 py-2">Zap Id</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {zaps.map((z) => (
                        <tr key={z.id} className="border-slate-400 border-b-[1px] rounded-2xl">
                            <td className="px-4 py-2 font-semibold"><img src={z.trigger.type.image} className="h-7" alt="" /></td>
                            <td className="px-4 py-2 flex gap-1">
                                {z.actions.flat().map((action, idx) => (
                                    <div  key={idx}><img src={action.type.image} className="h-7" alt="" /></div>
                                ))}
                            </td>
                            <td className="px-4 py-2 text-center">{z.id}</td>
                            <td className="px-4 py-2 items-center">
                                <button onClick={()=>{router.push(`/zap/${z.id}`)}} className="hover:bg-slate-100 px-4 py-2 rounded-md"> <VscLinkExternal /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
