import { api } from "@/lib/api";
import { Consulta } from "@/types/consulta";


export async function consultaService(): Promise<Consulta> {
    const res =  await api.get('papel-categoria')
    return res.data
}

export async function geraExcel(id:string, inicio: string, fim: string): Promise<Consulta> {
    const res =  await api.post(`papel-categoria/${id}`, {inicio: inicio, fim: fim})
    return res.data
}