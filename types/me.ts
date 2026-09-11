
export interface Me{
    user:{
        id: string, 
        email: string, 
        nome: string, 
        cargo: string
    },userClient: {
        id: string,
        user_id: string,
        client_id: string,
        role: string
    },pages:string[]
}