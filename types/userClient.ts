export interface UserClient{
    id: string, 
    user_id: string, 
    client_id: string, 
    role: string,
    create: string
    user: {
        id: string,
        nome: string,
        email: string,
        cargo: string
    }
}