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

export async function getStatus(): Promise<string[] | null> {
    const res = await api.get('/me/status', {withCredentials: true})
    return res.data
}

export async function createUserClient(name: string, email: string, password: string): Promise<{message: string}> {
    const res = await api.post('/me',{name: name, email: email, password: password}, {withCredentials: true})
    return res.data
}