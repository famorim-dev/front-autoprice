import { api } from "@/lib/api";
import { Me } from "@/types/me";
import { UserClient } from "@/types/userClient";


export async function me(): Promise<Me> {
    const res = await api.get('/me', {withCredentials: true})
    return res.data
}

export async function getAllUserClient(): Promise<UserClient[] | null> {
    const res = await api.get('/me/all', {withCredentials: true})
    return res.data
}