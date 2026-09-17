"use client"

import { me } from "@/services/me"
import { Me } from "@/types/me"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type SidebarPage = {
    page: string
    label: string
    href: string
    icon: React.ReactNode
}

const pages: SidebarPage[] = [
    {
        page: "home",
        label: "Home",
        href: "/home",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-[18px] fill-current"
                viewBox="0 0 512 512"
                aria-hidden="true"
            >
                <path d="M426 495.983H86c-25.364 0-46-20.635-46-46v-242.02c0-8.836 7.163-16 16-16s16 7.164 16 16v242.02c0 7.72 6.28 14 14 14h340c7.72 0 14-6.28 14-14v-242.02c0-8.836 7.163-16 16-16s16 7.164 16 16v242.02c0 25.364-20.635 46-46 46" />
                <path d="M496 263.958a15.95 15.95 0 0 1-11.313-4.687L285.698 60.284c-16.375-16.376-43.02-16.376-59.396 0L27.314 259.272c-6.248 6.249-16.379 6.249-22.627 0-6.249-6.248-6.249-16.379 0-22.627L203.675 37.656c28.852-28.852 75.799-28.852 104.65 0l198.988 198.988c6.249 6.249 6.249 16.379 0 22.627A15.94 15.94 0 0 1 496 263.958M320 495.983H192c-8.837 0-16-7.164-16-16v-142c0-27.57 22.43-50 50-50h60c27.57 0 50 22.43 50 50v142c0 8.836-7.163 16-16 16m-112-32h96v-126c0-9.925-8.075-18-18-18h-60c-9.925 0-18 8.075-18 18z" />
            </svg>
        ),
    },
    {
        page: "consultas",
        label: "Consultas",
        href: "/consultas",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-[18px] fill-current"
                viewBox="0 0 16 16"
                aria-hidden="true"
            >
                <path d="M13.2.2H2.8A2.603 2.603 0 0 0 .2 2.8v10.4a2.603 2.603 0 0 0 2.6 2.6h10.4a2.603 2.603 0 0 0 2.6-2.6V2.8A2.603 2.603 0 0 0 13.2.2m1.56 13a1.56 1.56 0 0 1-1.56 1.56H2.8a1.56 1.56 0 0 1-1.56-1.56v-.825l3.64-3.64 1.713 1.713a.52.52 0 0 0 .734 0L10.6 7.175V8a.52.52 0 0 0 1.04 0V5.92a.52.52 0 0 0-.52-.52H9.04a.52.52 0 0 0 0 1.04h.825L6.96 9.345 5.248 7.633a.52.52 0 0 0-.735 0L1.24 10.905V2.8A1.56 1.56 0 0 1 2.8 1.24h10.4a1.56 1.56 0 0 1 1.56 1.56Z" />
            </svg>
        ),
    },
    {
        page: "bi",
        label: "Dados",
        href: "/bi",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-[18px] fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M12 2C6.477 2 2 3.79 2 6s4.477 4 10 4 10-1.79 10-4-4.477-4-10-4Zm0 10c-5.523 0-10-1.79-10-4v4c0 2.21 4.477 4 10 4s10-1.79 10-4V8c0 2.21-4.477 4-10 4Zm0 6c-5.523 0-10-1.79-10-4v4c0 2.21 4.477 4 10 4s10-1.79 10-4v-4c0 2.21-4.477 4-10 4Z" />
            </svg>
        ),
    },
    {
        page: "ht",
        label: "Ht",
        href: "/funcionalHt",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-[18px] fill-current"
                viewBox="0 0 512 512"
                aria-hidden="true"
            >
                <path d="M122.39 165.78h244.87c10.49 0 19-8.51 19-19s-8.51-19-19-19H122.39c-10.49 0-19 8.51-19 19s8.51 19 19 19m164.33 99.44c0-10.49-8.51-19-19-19H122.39c-10.49 0-19 8.51-19 19s8.51 19 19 19h145.33c10.49 0 19-8.51 19-19" />
                <path d="M486.63 323.71c2.04-22.33 3.41-48.35 3.44-78.68-.06-57.07-4.85-98.86-9.96-129.57-8.94-50.6-54.9-96.56-105.5-105.5C343.9 4.85 302.11.06 245.03 0c-57.07.06-98.87 4.85-129.58 9.96C64.86 18.9 18.9 64.86 9.96 115.46 4.85 146.17.07 187.96 0 245.03c.07 57.07 4.85 98.87 9.96 129.58 8.94 50.6 54.9 96.56 105.5 105.5 30.71 5.11 72.5 9.89 129.58 9.96 30.32-.03 56.34-1.4 78.66-3.44 19.84 15.87 45 25.37 72.38 25.37 64.02 0 115.93-51.9 115.93-115.92 0-27.38-9.5-52.54-25.37-72.37zM245.04 452.07c-45.02-.05-85.3-3.13-123.13-9.41-16.81-3.01-33.84-12.44-47.95-26.55s-23.53-31.13-26.55-47.95c-6.28-37.79-9.35-78.07-9.41-123.13.05-45.04 3.13-85.32 9.41-123.13 3.01-16.81 12.44-33.83 26.55-47.94s31.13-23.53 47.95-26.55C159.72 41.13 200 38.06 245.04 38c45.02.05 85.3 3.13 123.13 9.41 16.81 3.01 33.83 12.44 47.95 26.55 14.11 14.11 23.53 31.13 26.55 47.95 6.28 37.83 9.35 78.1 9.41 123.13-.02 16.9-.48 33.11-1.36 48.79-16.28-8.72-34.88-13.66-54.64-13.66-64.02 0-115.93 51.9-115.93 115.92 0 19.76 4.95 38.35 13.66 54.63-15.68.88-31.89 1.34-48.78 1.35zM396.08 474c-42.97 0-77.93-34.95-77.93-77.92s34.96-77.92 77.93-77.92 77.93 34.95 77.93 77.92S439.05 474 396.08 474" />
                <path d="M406.28 418.24c-2.42-.4-5.71-.78-10.2-.78s-7.78.38-10.2.78c-3.98.7-7.6 4.32-8.31 8.31-.4 2.42-.78 5.71-.78 10.2s.38 7.78.78 10.2c.7 3.98 4.32 7.6 8.31 8.31 2.42.4 5.71.78 10.2.78s7.78-.38 10.2-.78c3.98-.7 7.6-4.32 8.31-8.31.4-2.42.78-5.71.78-10.2s-.38-7.78-.78-10.2c-.7-3.98-4.32-7.6-8.31-8.31m-10.21-12.61c10.49 0 19-8.51 19-19v-31.7c0-10.49-8.51-19-19-19s-19 8.51-19 19v31.7c0 10.49 8.51 19 19 19" />
            </svg>
        ),
    },
    {
        page: "user-management",
        label: "Ger. de Usuários",
        href: "/user-management",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-[18px] fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M16 11a4 4 0 1 0-3.99-4A4 4 0 0 0 16 11Zm-8 0a3.5 3.5 0 1 0-3.49-3.5A3.5 3.5 0 0 0 8 11Zm8 2c-3.31 0-6 1.79-6 4v2h12v-2c0-2.21-2.69-4-6-4ZM8 13c-2.76 0-5 1.57-5 3.5V19h5v-2c0-1.17.58-2.24 1.5-3.03A6.62 6.62 0 0 0 8 13Z" />
            </svg>
        ),
    },
]

const pagesByRole: Record<string, string[]> = {
    admin: ["home", "consultas", "bi", "ht"],
    consultor: ["home", "consultas", "bi"],
    suporte: ["ht"],
}

function getAllowedPages(user: Me): string[] {
    if (user.userClient) {
        return user.pages
    }

    return pagesByRole[user.user.cargo] ?? []
}

export default function Sidebar() {
    const [user, setUser] = useState<Me | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function loadUser() {
            const currentUser = await me()

            if (!currentUser) {
                router.push("/login")
                return
            }

            setUser(currentUser)
        }

        loadUser()
    }, [router])

    if (!user) {
        return null
    }

    const allowedPages = getAllowedPages(user)

    const visiblePages = pages.filter((page) =>
        allowedPages.includes(page.page)
    )

    return (
        <aside className="bg-white border-r border-slate-300 w-full h-full fixed top-0 left-0 max-w-66 py-6 px-4 overflow-auto max-sm:max-w-41">
            <nav
                className="h-full"
                aria-label="Primary sidebar navigation"
            >
                <div className="flex flex-col h-full">

                    <hr className="my-6 border-slate-300" />

                    <div>
                        <div className="text-sm text-muted mb-4">
                            Paginas
                        </div>

                        <ul className="space-y-4 px-2 text-sm text-foreground font-bold">
                            {visiblePages.map((page) => (
                                <li key={page.page}>
                                    <Link
                                        href={page.href}
                                        className="flex items-center gap-2.5 hover:text-primary-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover rounded"
                                    >
                                        {page.icon}
                                        {page.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1" />

                    <div className="mt-4">
                        <ul className="space-y-4 px-2 text-sm text-slate-800 font-medium">
                            <li>
                                <Link
                                    href="/perfil"
                                    className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-[18px] fill-current"
                                        viewBox="0 0 512 512"
                                        aria-hidden="true"
                                    >
                                        <path d="M253.414 103.434c48.556 0 87.919 40.52 87.919 90.505s-39.363 90.505-87.919 90.505-87.919-40.521-87.919-90.505 39.363-90.505 87.919-90.505m0 36.202c-28.324 0-51.717 24.081-51.717 54.303s23.393 54.303 51.717 54.303 51.717-24.081 51.717-54.303-23.393-54.303-51.717-54.303" />
                                        <path d="M253.414 0c139.957 0 253.414 113.457 253.414 253.414 0 94.285-51.491 176.544-127.886 220.19-35.728 20.575-77.036 32.582-121.104 33.199l-4.423.025C113.457 506.828 0 393.371 0 253.414S113.457 0 253.414 0m-23.676 346.505c-46.331 0-87.479 29.378-102.607 73.008l-2.339 7.571c35.919 27.232 80.165 42.893 126.504 43.522l5.709-.009c38.24-.62 74.079-11.122 105.072-29.064l19.977-13.243-2.237-6.866c-14.371-44.046-55.062-74.052-101.239-74.901zm23.676-310.303c-119.963 0-217.212 97.249-217.212 217.212 0 57.493 22.337 109.77 58.807 148.624 21.668-55.072 74.965-91.735 134.73-91.735h46.831c59.905 0 113.311 36.835 134.885 92.121 36.686-38.892 59.172-91.325 59.172-149.01-.001-119.963-97.25-217.212-217.213-217.212" />
                                    </svg>

                                    Perfil
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/configuracoes"
                                    className="flex items-center gap-2.5 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-[18px] fill-current"
                                        viewBox="0 0 32 32"
                                        aria-hidden="true"
                                    >
                                        <g data-name="Layer 2">
                                            <path d="M24.915 3.663a3.15 3.15 0 0 0-2.688-1.554H9.774a3.15 3.15 0 0 0-2.688 1.554L.859 14.446a3.15 3.15 0 0 0 0 3.15l6.227 10.742a3.15 3.15 0 0 0 2.688 1.554h12.453a3.15 3.15 0 0 0 2.688-1.554l6.226-10.784a3.15 3.15 0 0 0 0-3.15zm4.41 12.841-6.227 10.784a1.05 1.05 0 0 1-.871.504H9.774a1.05 1.05 0 0 1-.872-.504L2.676 16.504a1.05 1.05 0 0 1 0-1.05L8.902 4.713a1.05 1.05 0 0 1 .872-.504h12.453a1.05 1.05 0 0 1 .871.504l6.227 10.783a1.05 1.05 0 0 1 0 1.008" />
                                            <path d="M16 9.7a6.3 6.3 0 1 0 6.3 6.3A6.3 6.3 0 0 0 16 9.7m0 10.5a4.2 4.2 0 1 1 4.2-4.2 4.2 4.2 0 0 1-4.2 4.2" />
                                        </g>
                                    </svg>

                                    Configurações
                                </Link>
                            </li>
                        </ul>

                        <hr className="my-6 border-slate-300" />

                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-md border border-slate-300 flex items-center justify-center">
                                {user.user.nome.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm text-slate-800 font-medium truncate">
                                    {user.user.nome}
                                </p>

                                <p className="text-xs text-slate-600 mt-0.5 truncate">
                                    {user.user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    )
}