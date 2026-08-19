import Loader from "@/global/components/loader/loader"
import { baixarArquivoZip, buscarZip } from "@/services/baixarArquivos"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Dropdowns() {
    const [open, setOpen] = useState(false)
    const [arquivos, setArquivos] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [baixando, setBaixando] = useState<string | null>(null)

    useEffect(() => {
        buscarZip()
            .then((file) => {
                const order = [...file].sort((a, b) => {
                    const regex =
                        /-(\d{2})-(\d{2})-(\d{4})_(\d{2})-(\d{2})-(\d{2})\.zip$/i

                    const matchA = a.match(regex)
                    const matchB = b.match(regex)

                    if (!matchA || !matchB) return 0

                    const [, diaA, mesA, anoA, horaA, minutoA, segundoA] = matchA
                    const [, diaB, mesB, anoB, horaB, minutoB, segundoB] = matchB

                    const dataA = new Date(
                        Number(anoA),
                        Number(mesA) - 1,
                        Number(diaA),
                        Number(horaA),
                        Number(minutoA),
                        Number(segundoA)
                    ).getTime()

                    const dataB = new Date(
                        Number(anoB),
                        Number(mesB) - 1,
                        Number(diaB),
                        Number(horaB),
                        Number(minutoB),
                        Number(segundoB)
                    ).getTime()

                    return dataB - dataA
                })

                setArquivos(order)
            })
            .finally(() => setLoading(false))
    }, [])

    const handleBaixarZip = async (nome: string) => {
        try {
            setBaixando(nome)

            const blob = await baixarArquivoZip(nome)
            const url = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = url
            link.download = `${nome}.zip`

            document.body.appendChild(link)
            link.click()
            link.remove()

            window.URL.revokeObjectURL(url)
        } catch (error) {
            toast.error("Erro ao baixar arquivo")
        } finally {
            setBaixando(null)
        }
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-label="Abrir lista de arquivos"
                className="
                    relative flex h-10 w-10 items-center justify-center
                    rounded-xl text-slate-500
                    transition-all duration-200
                    hover:bg-slate-100 hover:text-slate-900
                    active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-slate-300
                "
            >
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                </svg>

                {arquivos.length > 0 && (
                    <span
                        className="
                            absolute right-1 top-1 h-2.5 w-2.5
                            rounded-full bg-red-500
                            ring-2 ring-white
                        "
                    />
                )}
            </button>

            {open && (
                <div
                    className="
                        fixed right-4 top-16 z-50
                        flex h-[500px] max-h-[calc(100vh-80px)]
                        w-[360px] max-w-[calc(100vw-2rem)]
                        flex-col overflow-hidden
                        rounded-2xl
                        border border-slate-200
                        bg-white
                        shadow-2xl shadow-slate-900/10
                    "
                >
                    <div
                        className="
                            flex shrink-0 items-center justify-between
                            border-b border-slate-200
                            bg-white px-4 py-3.5
                        "
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <div
                                className="
                                    flex h-10 w-10 shrink-0 items-center justify-center
                                    rounded-xl bg-slate-100 text-slate-700
                                "
                            >
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 3H17C18.1 3 19 3.9 19 5V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V5C5 3.9 5.9 3 7 3Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                    <path
                                        d="M9 3V6H11V9H9V12H11V15H9V18H15V15H13V12H15V9H13V6H15V3"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                </svg>
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-sm font-semibold text-slate-900">
                                    Arquivos ZIP
                                </h3>

                                <p className="mt-0.5 text-xs text-slate-500">
                                    {loading
                                        ? "Carregando arquivos..."
                                        : `${arquivos.length} arquivo${arquivos.length !== 1 ? "s" : ""} disponível${arquivos.length !== 1 ? "eis" : ""}`}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Fechar"
                            className="
                                flex h-8 w-8 shrink-0 items-center justify-center
                                rounded-lg text-slate-400
                                transition-all
                                hover:bg-slate-100 hover:text-slate-900
                                active:scale-95
                            "
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M6 6L18 18M6 18L18 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <div
                        className="
                            min-h-0 flex-1 overflow-y-auto
                            overscroll-contain scrollbar-thin
                            scrollbar-thumb-slate-300
                            scrollbar-track-transparent
                        "
                    >
                        {loading ? (
                            <div className="flex h-full items-center justify-center">
                                <Loader />
                            </div>
                        ) : arquivos.length === 0 ? (
                            <div
                                className="
                                    flex h-full flex-col items-center justify-center
                                    px-6 text-center
                                "
                            >
                                <div
                                    className="
                                        mb-4 flex h-14 w-14 items-center justify-center
                                        rounded-2xl bg-slate-100 text-slate-400
                                    "
                                >
                                    <svg
                                        className="h-7 w-7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M7 3H17C18.1 3 19 3.9 19 5V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V5C5 3.9 5.9 3 7 3Z"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />
                                        <path
                                            d="M9 3V9H15V3"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />
                                    </svg>
                                </div>

                                <p className="text-sm font-semibold text-slate-900">
                                    Nenhum arquivo disponível
                                </p>

                                <p className="mt-1 max-w-[240px] text-xs leading-5 text-slate-500">
                                    Os arquivos ZIP disponíveis para download aparecerão aqui.
                                </p>
                            </div>
                        ) : (
                            <div className="p-2">
                                {arquivos.map((item) => {
                                    const isDownloading = baixando === item

                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            disabled={!!baixando}
                                            onClick={() => handleBaixarZip(item)}
                                            className="
                                                group flex w-full items-center gap-3
                                                rounded-xl p-2.5 text-left
                                                transition-all duration-200
                                                hover:bg-slate-100
                                                active:scale-[0.99]
                                                disabled:cursor-wait
                                                disabled:opacity-60
                                            "
                                        >
                                            <div
                                                className={`
                                                    flex h-10 w-10 shrink-0 items-center justify-center
                                                    rounded-xl transition-colors
                                                    ${
                                                        isDownloading
                                                            ? "bg-slate-200 text-slate-700"
                                                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800"
                                                    }
                                                `}
                                            >
                                                {isDownloading ? (
                                                    <div
                                                        className="
                                                            h-5 w-5 animate-spin rounded-full
                                                            border-2 border-slate-300
                                                            border-t-slate-700
                                                        "
                                                    />
                                                ) : (
                                                    <svg
                                                        className="h-5 w-5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M13 3H7C5.9 3 5 3.9 5 5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V9L13 3Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M13 3V9H19M12 12V18M9 15L12 18L15 15"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p
                                                    title={`${item}.zip`}
                                                    className="
                                                        truncate text-sm font-medium
                                                        text-slate-800
                                                    "
                                                >
                                                    {item}.zip
                                                </p>

                                                <p
                                                    className="
                                                        mt-0.5 truncate text-xs
                                                        text-slate-400
                                                    "
                                                >
                                                    {isDownloading
                                                        ? "Preparando download..."
                                                        : "Clique para baixar"}
                                                </p>
                                            </div>

                                            {!isDownloading && (
                                                <svg
                                                    className="
                                                        h-4 w-4 shrink-0
                                                        text-slate-300
                                                        transition-all duration-200
                                                        group-hover:translate-y-0.5
                                                        group-hover:text-slate-600
                                                    "
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M12 5V19M12 19L18 13M12 19L6 13"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {arquivos.length > 0 && (
                        <div
                            className="
                                flex shrink-0 items-center justify-between
                                border-t border-slate-200
                                bg-white px-4 py-2.5
                            "
                        >
                            <span className="text-xs text-slate-400">
                                {arquivos.length} arquivo{arquivos.length !== 1 ? "s" : ""}
                            </span>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="
                                    rounded-lg px-3 py-1.5
                                    text-xs font-medium text-slate-500
                                    transition-colors
                                    hover:bg-slate-100 hover:text-slate-900
                                "
                            >
                                Fechar
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}