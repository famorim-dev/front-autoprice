import Loader from "@/global/components/loader/loader"
import { baixarArquivoZip, buscarZip } from "@/services/baixarArquivos"
import { useEffect, useState } from "react"

export default function Dropdowns() {
    const [open, setOpen] = useState(false)
    const [arquivos, setArquivos] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [baixando, setBaixando] = useState<string | null>(null)

    const handleClick = () => {
        setOpen((prev) => !prev)
    }

    const handleBaixarZip = async (nome: string) => {
        try {
            setBaixando(nome)

            const blob = await baixarArquivoZip(nome)
            const url = window.URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = `${nome}.zip`

            document.body.appendChild(a)
            a.click()
            a.remove()

            window.URL.revokeObjectURL(url)
        } finally {
            setBaixando(null)
        }
    }

    useEffect(() => {
        buscarZip()
            .then((res) => setArquivos([...res].reverse()))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                type="button"
                aria-expanded={open}
                aria-label="Abrir lista de arquivos"
                className="
                    relative flex h-10 w-10 items-center justify-center
                    rounded-lg text-gray-500
                    transition-colors duration-200
                    hover:bg-gray-100 hover:text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30
                    dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white
                "
            >
                <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Z"
                    />
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                    />
                </svg>

                {arquivos.length > 0 && (
                    <span className="
                        absolute right-1 top-1
                        flex h-2.5 w-2.5
                        rounded-full bg-red-500
                        ring-2 ring-white
                        dark:ring-gray-900
                    " />
                )}
            </button>

            {open && (
                <div
                    className="
                        absolute right-0 top-12 z-50
                        w-[360px] max-w-[calc(100vw-2rem)]
                        overflow-hidden
                        rounded-xl
                        border border-gray-200
                        bg-white
                        shadow-xl shadow-gray-900/10
                        dark:border-gray-700
                        dark:bg-gray-900
                    "
                >
                    <div className="
                        flex items-center justify-between
                        border-b border-gray-100
                        px-4 py-3
                        dark:border-gray-800
                    ">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Arquivos ZIP
                            </h3>

                            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                {arquivos.length} arquivo{arquivos.length !== 1 ? "s" : ""} disponível{arquivos.length !== 1 ? "is" : ""}
                            </p>
                        </div>

                        <div className="
                            flex h-9 w-9 items-center justify-center
                            rounded-lg bg-blue-50
                            text-blue-600
                            dark:bg-blue-500/10 dark:text-blue-400
                        ">
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M9 3V6H11V9H9V12H11V15H9V18H15V15H13V12H15V9H13V6H15V3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="max-h-[320px] overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center px-4 py-10">
                                <Loader />
                            </div>
                        ) : arquivos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                                <div className="
                                    mb-3 flex h-12 w-12
                                    items-center justify-center
                                    rounded-full bg-gray-100
                                    text-gray-400
                                    dark:bg-gray-800
                                ">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            d="M7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.105 18.1046 21 17 21H7C5.89543 21 5 20.105 5 19V5C5 3.89543 5.89543 3 7 3Z"
                                        />
                                    </svg>
                                </div>

                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Nenhum arquivo disponível
                                </p>

                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Os arquivos ZIP aparecerão aqui.
                                </p>
                            </div>
                        ) : (
                            arquivos.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    disabled={baixando === item}
                                    onClick={() => handleBaixarZip(item)}
                                    className="
                                        group flex w-full items-center gap-3
                                        border-b border-gray-100
                                        px-4 py-3
                                        text-left
                                        transition-colors
                                        hover:bg-gray-50
                                        disabled:cursor-wait
                                        disabled:opacity-60
                                        dark:border-gray-800
                                        dark:hover:bg-gray-800/60
                                    "
                                >
                                    <div className="
                                        flex h-10 w-10 shrink-0
                                        items-center justify-center
                                        rounded-lg
                                        bg-blue-50
                                        text-blue-600
                                        dark:bg-blue-500/10
                                        dark:text-blue-400
                                    ">
                                        {baixando === item ? (
                                            <div className="
                                                h-5 w-5
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-blue-200
                                                border-t-blue-600
                                            " />
                                        ) : (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13 3H7C5.89543 3 5 3.89543 5 5V19C5 20.105 5.89543 21 7 21H17C18.105 21 19 20.105 19 19V9L13 3Z"
                                                />
                                                <path
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13 3V9H19"
                                                />
                                                <path
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    d="M9 15L12 18L15 15"
                                                />
                                                <path
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    d="M12 12V18"
                                                />
                                            </svg>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p
                                            title={item}
                                            className="
                                                truncate
                                                text-sm font-medium
                                                text-gray-900
                                                dark:text-white
                                            "
                                        >
                                            {item}.zip
                                        </p>

                                        <p className="
                                            mt-0.5
                                            text-xs
                                            text-gray-500
                                            dark:text-gray-400
                                        ">
                                            {baixando === item
                                                ? "Baixando..."
                                                : "Clique para baixar"}
                                        </p>
                                    </div>

                                    <svg
                                        className="
                                            h-4 w-4 shrink-0
                                            text-gray-400
                                            transition-transform
                                            group-hover:translate-x-0.5
                                            group-hover:text-blue-500
                                        "
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 5V19M12 19L18 13M12 19L6 13"
                                        />
                                    </svg>
                                </button>
                            ))
                        )}
                    </div>

                    {arquivos.length > 0 && (
                        <div className="
                            border-t border-gray-100
                            bg-gray-50
                            px-4 py-2.5
                            dark:border-gray-800
                            dark:bg-gray-900
                        ">
                            <button
                                type="button"
                                className="
                                    flex w-full items-center
                                    justify-center gap-2
                                    rounded-lg
                                    px-3 py-2
                                    text-sm font-medium
                                    text-gray-600
                                    transition-colors
                                    hover:bg-white
                                    hover:text-gray-900
                                    dark:text-gray-400
                                    dark:hover:bg-gray-800
                                    dark:hover:text-white
                                "
                            >
                                Ver todos
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}