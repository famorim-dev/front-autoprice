import { me } from "@/services/me"
import { Me } from "@/types/me"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function Sidebar(){
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
    return(
        <aside
            className="bg-white border-r border-slate-300 w-full h-full fixed top-0 left-0 max-w-[264px] py-6 px-4 overflow-auto">
            <nav className="h-full" aria-label="Primary sidebar navigation">
                <div className="relative flex flex-col h-full">

                    <div className="flex flex-wrap items-center gap-4 relative">
                        <div className="flex flex-wrap items-center gap-2 flex-1">
                        <img src="https://readymadeui.com/logo-alt.svg" className="w-8 h-8" alt="company logo" />
                        <div className="text-base text-slate-600 font-semibold">
                            Madeui
                        </div>
                        </div>
                        <button type="button" aria-label="Collapse sidebar" aria-controls="sidebar-navigation" aria-expanded="true"
                        className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5 fill-slate-400" viewBox="0 0 512 512"
                            aria-hidden="true">
                            <path fillRule="evenodd"
                                d="M21.683 237.115c-10.4 10.4-10.4 27.373 0 37.773l203.702 203.694c10.415 10.416 27.358 10.416 37.773 0l11.394-11.394c10.425-10.424 10.427-27.358 0-37.785l-154.525-154.51c-10.427-10.426-10.427-27.363 0-37.788L274.552 82.594c10.427-10.426 10.426-27.359-.001-37.785l-11.395-11.394c-10.399-10.4-27.373-10.4-37.772 0zM441.136 33.413c10.41-10.411 27.369-10.41 37.779 0l11.394 11.394c10.405 10.405 10.406 27.38 0 37.786L335.792 237.105c-10.426 10.426-10.426 27.361 0 37.787L490.31 429.404c10.41 10.409 10.409 27.377 0 37.785l-11.394 11.395c-10.414 10.414-27.364 10.415-37.779 0L255.53 292.97c-52.065 52.014-38.896 38.823-.038-.038l-18.044-18.044c-10.406-10.407-10.405-27.368 0-37.774z"
                                clip-rule="evenodd" data-original="#000000" />
                        </svg>
                        </button>
                    </div>

                    <hr className="my-6 border-slate-300" />

                    <div>
                        <div className="text-sm text-slate-600 mb-4">Paginas</div>
                        <ul className="space-y-4 px-2 text-sm text-slate-800 font-medium">
                        <li>
                            <a href="/home" aria-current="page"
                                className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-current overflow-visible"
                                    viewBox="0 0 512 512" aria-hidden="true">
                                    <path
                                    d="M426 495.983H86c-25.364 0-46-20.635-46-46v-242.02c0-8.836 7.163-16 16-16s16 7.164 16 16v242.02c0 7.72 6.28 14 14 14h340c7.72 0 14-6.28 14-14v-242.02c0-8.836 7.163-16 16-16s16 7.164 16 16v242.02c0 25.364-20.635 46-46 46"
                                    data-original="#000000" />
                                    <path
                                    d="M496 263.958a15.95 15.95 0 0 1-11.313-4.687L285.698 60.284c-16.375-16.376-43.02-16.376-59.396 0L27.314 259.272c-6.248 6.249-16.379 6.249-22.627 0-6.249-6.248-6.249-16.379 0-22.627L203.675 37.656c28.852-28.852 75.799-28.852 104.65 0l198.988 198.988c6.249 6.249 6.249 16.379 0 22.627A15.94 15.94 0 0 1 496 263.958M320 495.983H192c-8.837 0-16-7.164-16-16v-142c0-27.57 22.43-50 50-50h60c27.57 0 50 22.43 50 50v142c0 8.836-7.163 16-16 16m-112-32h96v-126c0-9.925-8.075-18-18-18h-60c-9.925 0-18 8.075-18 18z"
                                    data-original="#000000" />
                                </svg>
                                Home
                            </a>
                        </li>
                        {(user?.cargo === "admin" || user?.cargo === "consultoria")?(
                            <>
                                <li>
                                    <a href="/consultas"
                                        className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-current overflow-visible"
                                            viewBox="0 0 16 16" aria-hidden="true">
                                            <path
                                            d="M13.2.2H2.8A2.603 2.603 0 0 0 .2 2.8v10.4a2.603 2.603 0 0 0 2.6 2.6h10.4a2.603 2.603 0 0 0 2.6-2.6V2.8A2.603 2.603 0 0 0 13.2.2m1.56 13a1.56 1.56 0 0 1-1.56 1.56H2.8a1.56 1.56 0 0 1-1.56-1.56v-.825l3.64-3.64 1.713 1.713a.52.52 0 0 0 .734 0L10.6 7.175V8a.52.52 0 0 0 1.04 0V5.92a.52.52 0 0 0-.52-.52H9.04a.52.52 0 0 0 0 1.04h.825L6.96 9.345 5.248 7.633a.52.52 0 0 0-.735 0L1.24 10.905V2.8A1.56 1.56 0 0 1 2.8 1.24h10.4a1.56 1.56 0 0 1 1.56 1.56Z"
                                            data-original="#000000" />
                                        </svg>
                                        Consultas
                                    </a>
                                </li>
                                <li>
                                    <a href="/funcionalHt"
                                        className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-current overflow-visible"
                                            viewBox="0 0 512 512" aria-hidden="true">
                                            <path
                                            d="M122.39 165.78h244.87c10.49 0 19-8.51 19-19s-8.51-19-19-19H122.39c-10.49 0-19 8.51-19 19s8.51 19 19 19m164.33 99.44c0-10.49-8.51-19-19-19H122.39c-10.49 0-19 8.51-19 19s8.51 19 19 19h145.33c10.49 0 19-8.51 19-19"
                                            data-original="#000000" />
                                            <path
                                            d="M486.63 323.71c2.04-22.33 3.41-48.35 3.44-78.68-.06-57.07-4.85-98.86-9.96-129.57-8.94-50.6-54.9-96.56-105.5-105.5C343.9 4.85 302.11.06 245.03 0c-57.07.06-98.87 4.85-129.58 9.96C64.86 18.9 18.9 64.86 9.96 115.46 4.85 146.17.07 187.96 0 245.03c.07 57.07 4.85 98.87 9.96 129.58 8.94 50.6 54.9 96.56 105.5 105.5 30.71 5.11 72.5 9.89 129.58 9.96 30.32-.03 56.34-1.4 78.66-3.44 19.84 15.87 45 25.37 72.38 25.37 64.02 0 115.93-51.9 115.93-115.92 0-27.38-9.5-52.54-25.37-72.37zM245.04 452.07c-45.02-.05-85.3-3.13-123.13-9.41-16.81-3.01-33.84-12.44-47.95-26.55s-23.53-31.13-26.55-47.95c-6.28-37.79-9.35-78.07-9.41-123.13.05-45.04 3.13-85.32 9.41-123.13 3.01-16.81 12.44-33.83 26.55-47.94s31.13-23.53 47.95-26.55C159.72 41.13 200 38.06 245.04 38c45.02.05 85.3 3.13 123.13 9.41 16.81 3.01 33.83 12.44 47.95 26.55 14.11 14.11 23.53 31.13 26.55 47.95 6.28 37.83 9.35 78.1 9.41 123.13-.02 16.9-.48 33.11-1.36 48.79-16.28-8.72-34.88-13.66-54.64-13.66-64.02 0-115.93 51.9-115.93 115.92 0 19.76 4.95 38.35 13.66 54.63-15.68.88-31.89 1.34-48.78 1.35zM396.08 474c-42.97 0-77.93-34.95-77.93-77.92s34.96-77.92 77.93-77.92 77.93 34.95 77.93 77.92S439.05 474 396.08 474"
                                            data-original="#000000" />
                                            <path
                                            d="M406.28 418.24c-2.42-.4-5.71-.78-10.2-.78s-7.78.38-10.2.78c-3.98.7-7.6 4.32-8.31 8.31-.4 2.42-.78 5.71-.78 10.2s.38 7.78.78 10.2c.7 3.98 4.32 7.6 8.31 8.31 2.42.4 5.71.78 10.2.78s7.78-.38 10.2-.78c3.98-.7 7.6-4.32 8.31-8.31.4-2.42.78-5.71.78-10.2s-.38-7.78-.78-10.2c-.7-3.98-4.32-7.6-8.31-8.31m-10.21-12.61c10.49 0 19-8.51 19-19v-31.7c0-10.49-8.51-19-19-19s-19 8.51-19 19v31.7c0 10.49 8.51 19 19 19"
                                            data-original="#000000" />
                                        </svg>
                                        Ht
                                    </a>
                                </li>
                            </>
                        ):(null)}
                        </ul>
                    </div>

                    <hr className="my-6 border-slate-300" />

                    <div className="flex-1">
                        {/* <div className="text-sm text-slate-600 mb-4">Shared</div>
                        <ul className="space-y-4 px-2 text-sm text-slate-800 font-medium">
                        <li>
                            <a href="#"
                                className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-current overflow-visible"
                                    viewBox="0 0 511.414 511.414" aria-hidden="true">
                                    <path
                                    d="M497.695 108.838a16.002 16.002 0 0 0-9.92-14.8L261.787 1.2a16.003 16.003 0 0 0-12.16 0L23.639 94.038a16 16 0 0 0-9.92 14.8v293.738a16 16 0 0 0 9.92 14.8l225.988 92.838a15.947 15.947 0 0 0 12.14-.001c.193-.064-8.363 3.445 226.008-92.837a16 16 0 0 0 9.92-14.8zm-241.988 76.886-83.268-34.207L352.39 73.016l88.837 36.495zm-209.988-51.67 71.841 29.513v83.264c0 8.836 7.164 16 16 16s16-7.164 16-16v-70.118l90.147 37.033v257.797L45.719 391.851zM255.707 33.297l55.466 22.786-179.951 78.501-61.035-25.074zm16 180.449 193.988-79.692v257.797l-193.988 79.692z"
                                    data-original="#000000" />
                                </svg>
                                Product
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-current overflow-visible"
                                    stroke="currentColor" viewBox="0 0 682.667 682.667" aria-hidden="true">
                                    <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                                    </clipPath>
                                    </defs>
                                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path fill="none" stroke-miterlimit="10" stroke-width="40"
                                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                        data-original="#000000" />
                                    <path
                                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                        data-original="#000000" />
                                    </g>
                                </svg>
                                Inbox
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-current overflow-visible"
                                    viewBox="0 0 64 64" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                    d="M14.6 6.688c-7.29 0-13.2 5.862-13.2 13.092V41.6c0 7.23 5.91 13.092 13.2 13.092h24.2a2.2 2.182 0 1 0 0-4.364H14.6A8.8 8.728 0 0 1 5.8 41.6V24.144h52.8v7.637a2.2 2.182 0 1 0 4.4 0V19.78c0-7.23-5.91-13.092-13.2-13.092zm44 13.092H5.8a8.8 8.728 0 0 1 8.8-8.728h35.2a8.8 8.728 0 0 1 8.8 8.728"
                                    clip-rule="evenodd" data-original="#000000" />
                                    <path
                                    d="M63 45.964a8.8 8.728 0 0 0-8.8-8.728H38.8a2.2 2.182 0 1 0 0 4.364h15.4a4.4 4.364 0 0 1 0 8.728h-1.84l.645-.64a2.2 2.182 0 1 0-3.11-3.085l-4.4 4.364a2.2 2.182 0 0 0 0 3.085l4.4 4.364a2.2 2.182 0 1 0 3.11-3.085l-.644-.64H54.2a8.8 8.728 0 0 0 8.8-8.727M12.4 28.508a2.2 2.182 0 1 0 0 4.364h8.8a2.2 2.182 0 1 0 0-4.364z"
                                    data-original="#000000" />
                                </svg>
                                Refunds
                            </a>
                        </li>
                        </ul> */}
                    </div>

                    <div className="mt-4">
                        <ul className="space-y-4 px-2 text-sm text-slate-800 font-medium">
                        <li>
                            <a href="#"
                                className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-current overflow-visible"
                                    viewBox="0 0 512 512" aria-hidden="true">
                                    <path
                                    d="M253.414 103.434c48.556 0 87.919 40.52 87.919 90.505s-39.363 90.505-87.919 90.505-87.919-40.521-87.919-90.505 39.363-90.505 87.919-90.505m0 36.202c-28.324 0-51.717 24.081-51.717 54.303s23.393 54.303 51.717 54.303 51.717-24.081 51.717-54.303-23.393-54.303-51.717-54.303"
                                    data-original="#000000" />
                                    <path
                                    d="M253.414 0c139.957 0 253.414 113.457 253.414 253.414 0 94.285-51.491 176.544-127.886 220.19-35.728 20.575-77.036 32.582-121.104 33.199l-4.423.025C113.457 506.828 0 393.371 0 253.414S113.457 0 253.414 0m-23.676 346.505c-46.331 0-87.479 29.378-102.607 73.008l-2.339 7.571c35.919 27.232 80.165 42.893 126.504 43.522l5.709-.009c38.24-.62 74.079-11.122 105.072-29.064l19.977-13.243-2.237-6.866c-14.371-44.046-55.062-74.052-101.239-74.901zm23.676-310.303c-119.963 0-217.212 97.249-217.212 217.212 0 57.493 22.337 109.77 58.807 148.624 21.668-55.072 74.965-91.735 134.73-91.735h46.831c59.905 0 113.311 36.835 134.885 92.121 36.686-38.892 59.172-91.325 59.172-149.01-.001-119.963-97.25-217.212-217.213-217.212"
                                    data-original="#000000" />
                                </svg>
                                Perfil
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-current overflow-visible"
                                    viewBox="0 0 32 32" aria-hidden="true">
                                    <g data-name="Layer 2">
                                    <path
                                        d="M24.915 3.663a3.15 3.15 0 0 0-2.688-1.554H9.774a3.15 3.15 0 0 0-2.688 1.554L.859 14.446a3.15 3.15 0 0 0 0 3.15l6.227 10.742a3.15 3.15 0 0 0 2.688 1.554h12.453a3.15 3.15 0 0 0 2.688-1.554l6.226-10.784a3.15 3.15 0 0 0 0-3.15zm4.41 12.841-6.227 10.784a1.05 1.05 0 0 1-.871.504H9.774a1.05 1.05 0 0 1-.872-.504L2.676 16.504a1.05 1.05 0 0 1 0-1.05L8.902 4.713a1.05 1.05 0 0 1 .872-.504h12.453a1.05 1.05 0 0 1 .871.504l6.227 10.783a1.05 1.05 0 0 1 0 1.008"
                                        data-original="#000000" />
                                    <path
                                        d="M16 9.7a6.3 6.3 0 1 0 6.3 6.3A6.3 6.3 0 0 0 16 9.7m0 10.5a4.2 4.2 0 1 1 4.2-4.2 4.2 4.2 0 0 1-4.2 4.2"
                                        data-original="#000000" />
                                    </g>
                                </svg>
                                Configurações
                            </a>
                        </li>
                        </ul>

                        <hr className="my-6 border-slate-300" />

                        <a href="#"
                        className="flex flex-wrap items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20200919003010"
                            className="w-10 h-10 rounded-md border border-slate-300" alt="user avatar" />
                        <div>
                            <p className="text-sm text-slate-800 font-medium">{user?.nome}</p>
                            <p className="text-xs text-slate-600 mt-0.5">{user?.email}</p>
                        </div>
                        </a>
                    </div>
                </div>
            </nav>
        </aside>
    )
}