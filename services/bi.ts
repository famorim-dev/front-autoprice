import { api } from "@/lib/api"


export async function data(name: string, column?: string, value?: string){
    const res =  await api.post(`/bi`, {name: name, column: column, value: value})
    return res.data
}