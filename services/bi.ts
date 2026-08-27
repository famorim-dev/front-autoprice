import { api } from "@/lib/api"


export async function data(name: string, column?: string, value?: string){
    const res =  await api.post(`/bi`, {name: name, column: column, value: value})
    return res.data
}

export async function sum(file: string, column:string, filters?: Record<string, string>){
    const res =  await api.post(`/bi/sum`, {file: file, column: column, filters: filters})
    return res.data
}