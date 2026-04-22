import { api } from "@/lib/api";


export async function loginService(email: string, password: string): Promise<{token: string, mensagem: string}> {
    return await api.post('/auth', {email, senha: password})
}