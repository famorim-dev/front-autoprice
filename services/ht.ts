import { api } from "@/lib/api"


export async function ht(arquivo: FormData): Promise<{message: string}>{
    const res =  await api.post(`/ht`, arquivo)
    return res.data
}