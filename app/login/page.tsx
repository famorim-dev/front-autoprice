'use client'
import { redirect } from "next/navigation"
import toast from "react-hot-toast"
import { loginAction } from "./loginAction"

export default function LoginPage(){
    async function login(form:FormData) {
            const email = form.get("email") as string
            const password = form.get("password") as string
            const res = await loginAction(email,password)

            if (!res.success) {
            toast.error(res.error!)
            return
            }

            localStorage.setItem("token", res.token!)

            toast.success("Sucesso!")
            redirect("/")
    }
    return(
            <main className=" w-full min-h-screen flex items-center">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl w-full">
                    <div className="hidden lg:block lg:w-1/2 bg-cover"
                        style={{backgroundImage: "url('https://pricemet.com.br/wp-content/uploads/2023/08/pricemet-solucoes-pesquisa-de-precos-online-mobile.jpg')"}}>
                    </div>
                    <div className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">PriceQlik</h2>
                        <p className="text-xl text-gray-600 text-center">Bem-vindo de volta!</p>
                        <form action={login}>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <a href="#" className="text-xs text-center text-gray-500 uppercase">faça login com e-mail</a>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" name="email" type="email" />
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
                                    
                                </div>
                                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" name="password" type="password" />
                            </div>
                            <div className="mt-8">
                                <button  className="bg-gray-700 cursor-pointer text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
    )
}