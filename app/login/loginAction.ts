'use server'

import { loginService } from "@/services/login"

export async function loginAction(email: string, password: string) {

  try {
    const data = await loginService(email, password)

    return { success: true, token: data.token }

  } catch {
    return { success: false, error: "Credenciais inválidas" }
  }
}