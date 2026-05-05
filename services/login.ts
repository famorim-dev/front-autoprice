import { api } from "@/lib/api";

export async function loginService(email: string, password: string): Promise<{token: string, mensagem: string}> {
    const res = await api.post('/auth', {email, senha: password}, {withCredentials:true})
    return res.data
}