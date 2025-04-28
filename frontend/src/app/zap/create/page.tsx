"use client"

import { useState } from 'react';
import { Appbar } from '@/components/Appbar'
import React from 'react'
import ZapBox from '@/components/ZapBox';
import { LinkButton, PrimaryButton } from '@/components/Button';
import { useAvailableActionsAndTriggers } from '@/hooks/getAllTriggersAndAction';
import link from "../../../../image_links.json"
import { BACKEND_URL } from '@/config/config';
import axios from 'axios';
import {useRouter} from "next/navigation";

const CreateZap = () => {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
    const [selectedTrigger, setSelectedTrigger] = useState<{
        availableTriggerId: string,
        availableTriggerName: string,
        availableTriggerImage: string
    }>();
    const [selectedAction, setSelectedActions] = useState<{
        index: number,
        availableActionId: string,
        availableActionName: string,
        availableActionImage: string
    }[]>([]);

    const [selectModalIndex, setSelectModalIndex] = useState<null | number>(null);

    return (
        <div>
            <Appbar />
            <div className='flex justify-end px-2 py-5'>
                <PrimaryButton onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/zap`, {
                        availableTriggerId: selectedTrigger?.availableTriggerId,
                        triggerMetaData: {},
                        actions : selectedAction.map(a=>({
                            availableActionId : a.availableActionId,
                            actionMetaData : {}
                        }))
                    }, {
                        headers : {
                            Authorization : localStorage.getItem("token")
                        }
                    });
                    if(response.status === 201){
                        router.push("/dasboard");
                    }
                }}>Publish</PrimaryButton>
            </div>
            <div className='px-auto px-[10vw] py-5 flex flex-col w-screen gap-10 justify-center items-center'>
                <div>
                    <ZapBox onClick={() => { setSelectModalIndex(1) }} name={selectedTrigger?.availableTriggerName ? selectedTrigger.availableTriggerName : "Trigger"} index={1} image={selectedTrigger?.availableTriggerImage || link.link} />
                </div>
                <div className='flex flex-col gap-10'>
                    {selectedAction.map((action, index) => <ZapBox onClick={() => { setSelectModalIndex(action.index) }} name={action.availableActionName ? action.availableActionName : "Action"} index={action.index} image={action.availableActionImage || link.link} />)}
                </div>
                <LinkButton onClick={() => {
                    setSelectedActions(a => [...a, {
                        index: a.length + 2,
                        availableActionId: "",
                        availableActionName: "",
                        availableActionImage: ""
                    }])
                    return;
                }}>+
                </LinkButton>
                {selectModalIndex && <PopUpMenu availableItems={selectModalIndex === 1 ? availableTriggers : availableActions} index={selectModalIndex} onSelect={(props: null | { name: string; id: string, image: string }) => {
                    if (props === null) {
                        setSelectModalIndex(null);
                        return;
                    }
                    if (selectModalIndex === 1) {
                        setSelectedTrigger({
                            availableTriggerId: props.id,
                            availableTriggerName: props.name,
                            availableTriggerImage: props.image
                        })
                    }
                    else {
                        setSelectedActions(a => {
                            let newActions = [...a];
                            newActions[selectModalIndex - 2] = {
                                index: selectModalIndex,
                                availableActionId: props?.id,
                                availableActionName: props?.name,
                                availableActionImage: props?.image
                            }
                            return newActions
                        })
                    }
                    setSelectModalIndex(null);
                }} />
                }
            </div>
        </div>
    )
}


function PopUpMenu({ availableItems, index, onSelect }: { availableItems: { id: string, name: string, image: string }[], index: number, onSelect: (props: null | { name: string, id: string, image: string }) => void }) {
    return <div className="fixed justify-center items-center top-0 right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100  bg-opacity-70 flex">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                    <div className='flex justify-center align-center '>
                        <h1 className='font-semibold text-2xl text-center'>Select {index === 1 ? "Trigger" : "Action"}</h1>
                    </div>
                    <button onClick={() => { onSelect(null) }} type="button" className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                    {availableItems.map(({ id, name, image }) => {
                        return <div onClick={() => {
                            onSelect({
                                id,
                                name,
                                image
                            })
                        }} className='flex gap-4 text-md font-light px-3 py-3 hover:bg-slate-100 rounded-2xl capitalize items-center'>
                            <img src={image} width={30} alt="" /><div>
                                {name}    </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>

}



export default CreateZap