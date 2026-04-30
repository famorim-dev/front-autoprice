import { api } from "@/lib/api"


export async function ht(arquivo: FormData): Promise<{message: string}>{
    const res =  await api.post(`/ht`, arquivo)
    return res.data
}

export async function getlog(): Promise<{message: string}>{
    const res =  await api.get(`/ht`)
    return res.data
}