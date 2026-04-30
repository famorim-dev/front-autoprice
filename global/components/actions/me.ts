import { me } from "@/services/me"

export async function chamaMe(){
    const res = await me()
    if (res.response?.status === 401){
        return false
    }
    return res
}