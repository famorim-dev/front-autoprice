import { api } from "@/lib/api";
import { cookies } from "next/headers";


export async function loginService(email: string, password: string): Promise<{token: string, mensagem: string}> {
    const res = await api.post('/auth', {email, senha: password})
        const setCookie = res.headers['set-cookie']

    if (setCookie) {
        const token = setCookie[0].split(';')[0].split('=')[1]
        
        const store = await cookies();
        store.set("token", token, {
            httpOnly: true,
            path: "/",
            secure: false,
            sameSite: "lax",
        });
    }
    
    return res.data
}