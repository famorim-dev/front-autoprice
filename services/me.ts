import { api } from "@/lib/api";


export async function me(): Promise<{id: string, email: string, nome: string, cargo: string}> {
    const res = await api.get('/me')
    return res.data
}