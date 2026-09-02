import { api } from "@/lib/api"


export async function buscarZip(): Promise<string[]> {
    const res =  await api.get('arquivos', {withCredentials: true})
    return res.data
}

export async function baixarArquivoZip(nome: string): Promise<Blob> {
    const res =  await api.post('arquivos', {nome: nome}, {responseType: 'blob'})
    return res.data
}