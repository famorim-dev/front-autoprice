import { api } from "@/lib/api";
import { cookies } from "next/headers";


export async function loginService(email: string, password: string): Promise<{token: string, mensagem: string}> {
    const res = await api.post('/auth', {email, senha: password}, {withCredentials:true})
    
    return res.data
}