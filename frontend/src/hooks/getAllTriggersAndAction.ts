import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import { useEffect, useState } from "react";

export function useAvailableActionsAndTriggers(){
    const [availableActions, setAvailableAction] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/action/available`).then(x=> setAvailableAction(x.data.availableActions));
        axios.get(`${BACKEND_URL}/trigger/available`).then(x=> setAvailableTriggers(x.data.availableTriggers));
    }, [])

    return {
        availableActions,
        availableTriggers
    }
}