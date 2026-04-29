'use server'

import { loginService } from "@/services/login"

export async function loginAction(email: string, password: string) {

  try {
    await loginService(email, password)
    

    return { success: true}

  } catch {
    return { success: false, error: "Credenciais inválidas" }
  }
}