import { api } from "@/lib/api";
import { Me } from "@/types/me";


export async function me(): Promise<Me> {
    const res = await api.get('/me', {withCredentials: true})
    console.log(res.data)
    return res.data
}