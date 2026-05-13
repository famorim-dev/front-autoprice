'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import path from "path"

export async function logout(){
        const store = await cookies()
        store.delete({name: "token", path: '/' })
        redirect("/login")
}