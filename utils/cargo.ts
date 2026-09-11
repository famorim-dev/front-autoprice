import { me } from "@/services/me";


export async function acessRole( role: string[], page?: string){
    try{
        const user = await me()
        if (role.includes(user.user.cargo)){
            return true
        }

        if(!page){
            return false
        }

        return user.pages.includes(page)
    }catch(e: unknown){
        return false
    }
}