import { api } from "@/lib/api";
import { Consulta } from "@/types/consulta";
import { StatusType } from "@/types/status";


export async function consultaService(): Promise<Consulta[]> {
    const res =  await api.get('papel-categoria')
    return res.data
}

export async function geraExcel(id:string, inicio: string, fim: string, extract: string): Promise<{message: string}> {
    const res =  await api.post(`papel-categoria/${id}`, {inicio: inicio, fim: fim, extract: extract})
    return res.data
}

export async function list(): Promise<StatusType[]> {
    const res =  await api.get(`papel-categoria/list`)
    return res.data
}