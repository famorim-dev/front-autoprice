import { me } from "@/services/me";


export async function redirecionaPorCargo(cargo: string[]){
    const user = await me()
    if (!cargo.includes(user.cargo)){
        return false
    }
    return true
}