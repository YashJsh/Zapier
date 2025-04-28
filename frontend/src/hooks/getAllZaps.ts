import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Zap {
    id: string,
    triggerId: string,
    userId: Number,
    actions: [
        {
            id: string,
            zapId: string,
            actionId: string,
            sortingOrder: Number,
            type: {
                id: string,
                name: string,
                image : string
            }
        }
    ],
    trigger: {
                id : string,
                zapId : string,
                triggerId: string,
                type : { 
                   id : string,
                   name : string,
                   image : string
                }
    }
}[];

export const useZaps = () => {
    const [loading, setLoading] = useState(false);
    const [zaps, setZaps] = useState<Zap[]>([]);

    
    useEffect(() => {
        const fetchZaps = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/zap`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || ""
                    }
                });
                setZaps(response.data.data);
            } catch (error) {
                console.error("Failed to fetch zaps", error);
            } finally {
                setLoading(false);
            }
        };

        fetchZaps();
    }, []);
    return { loading, zaps };
}