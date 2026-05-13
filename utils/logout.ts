import { api } from "@/lib/api"
import { redirect } from "next/navigation"

export async function logout(): Promise<{mensagem: string}> {
    await api.post('/auth/logout')
    redirect('/login')
}