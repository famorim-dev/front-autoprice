import { api } from "@/lib/api"
import { Log } from "@/types/log"


export async function ht(arquivo: FormData): Promise<{message: string}>{
    const res =  await api.post(`/ht`, arquivo)
    return res.data
}

export async function getlog(): Promise<Promise<Log[]>>{
    const res =  await api.get(`/ht/log`)
    return res.data
}