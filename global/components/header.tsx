'use client'
import { logout } from "@/utils/logout"
import { useState } from "react"
import { BiUser } from "react-icons/bi"

export function Header(){
    const [open, setOpen] = useState<Boolean>(false)

    const handleClick = (action: Boolean) => {
        setOpen(action)
    }

    const handleDesconnect = async () => {
        logout()
    }
    
    return(
        <header>
            <nav className="flex py-2 px-4 md:px-8 bg-white border-b border-slate-300 min-h-[68px] relative z-20" aria-label="Main navigation">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 w-full">
                    <a href="#"
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
                        <button onClick={() => handleClick(true)} className="text-slate-900 text-sm font-semibold hover:text-gray-800 cursor-pointer focus:outline-none focus-visible:ring-2 rounded-4xl border w-full h-full ">
                            <BiUser size={34}/>
                        </button>
                            {open && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg border">
                                    <ul className="text-sm">
                                        {/* <li className="p-2 text-gray-700 font-semibold cursor-pointer">Perfil</li>
                                        <li className="p-2 text-gray-700 font-semibold cursor-pointer">Configurações</li> */}
                                        <li onClick={() => handleDesconnect()} className="p-2 text-gray-700 font-semibold cursor-pointer">Sair</li>
                                    </ul>
                                </div>
                            )}
                    </div>
                </div>
            </nav>
        </header>
    )
}