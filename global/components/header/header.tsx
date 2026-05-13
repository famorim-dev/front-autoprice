'use client'
import { me } from "@/services/me"
import { Me } from "@/types/me"
import { logout } from "@/utils/logout"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BiUser } from "react-icons/bi"

export function Header(){
    const [open, setOpen] = useState<Boolean>(false)
    const [user, setUser] = useState<Me | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function check() {
            const user = await me()
            if(!user){
                router.push("/login")
            }
            setUser(user)
        }
        
        check()
    }, [])

    const handleDesconnect = async () => {
        await logout()
    }
    
    return(
        <header>
            <nav className="flex py-2 px-4 md:px-8 bg-white border-b border-slate-300 min-h-[68px] relative z-20" aria-label="Main navigation">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 w-full">
                    <a href="/home"
                        className="min-w-9 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        <span className="sr-only">Pricemet</span>
                        <img src="/logo-pricemet.png" alt="readymadeui logo" className="h-9 w-auto" />
                    </a>

                    <div id="collapseMenu"
                        className="hidden lg:block max-lg:bg-white max-lg:border-l max-lg:border-slate-300 max-lg:w-1/2 max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto max-sm:w-full z-50 outline-none">


                        {/* <ul className="flex flex-col gap-8 font-semibold text-sm text-slate-900 lg:flex-row max-lg:p-6">
                            <li>
                            <a href="#"
                                className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                aria-current="page">Home</a>
                            </li>
                            <li>
                            <a href="#"
                                className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Features</a>
                            </li>
                            <li>
                            <a href="#"
                                className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Blog</a>
                            </li>
                            <li>
                            <a href="#"
                                className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">About</a>
                            </li>
                            <li>
                            <a href="#"
                                className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Contact</a>
                            </li>
                        </ul> */}
                    </div>

                    <div className="relative">
                        <section className="group w-full h-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            
                            <button 
                                onClick={() => setOpen(prev => !prev)} 
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 
                                        group-hover:bg-blue-50 group-hover:text-blue-600 
                                        transition-all duration-300 
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                            >
                                <BiUser size={24}/>
                            </button>
                            <div className="flex flex-col leading-tight">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                    {user?.cargo}
                                </p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {user?.nome}
                                </p>
                            </div>

                        </section>
                            {open && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg border">
                                    <ul className="text-sm">
                                        {/* <li className="p-2 text-gray-700 font-semibold cursor-pointer">Perfil</li>
                                        <li className="p-2 text-gray-700 font-semibold cursor-pointer">Configurações</li> */}
                                        <li onClick={() => handleDesconnect()} className="block w-full px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 ltr:text-left rtl:text-right dark:text-gray-700 dark:hover:bg-red-700/20 cursor-pointer">Sair</li>
                                    </ul>
                                </div>
                            )}
                    </div>
                </div>
            </nav>
        </header>
    )
}