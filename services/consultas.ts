import { api } from "@/lib/api";
import { Consulta } from "@/types/consulta";


export async function consultaService(): Promise<Consulta> {
    const res =  await api.get('papel-categoria')
    console.log(res)
    return res.data
}