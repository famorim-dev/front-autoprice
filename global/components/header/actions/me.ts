import { me } from "@/services/me"

export async function chamaMe(){
    try{
        const res = await me()
        return res
    }catch(e: any){
        if (e.response?.status === 401){
            return null
        }
    }
}