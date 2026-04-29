'use server'

import { me } from "@/services/me";


export async function redirecionaPorCargo(cargo: string){
    const user = await me()
    if (user.cargo !== cargo){
        return false
    }
    return true
}