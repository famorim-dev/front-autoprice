"use client"

import Loader from "@/global/components/loader/loader"
import { buscarZip } from "@/services/baixarArquivos"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function FileList() {
    const route = useRouter()
    const [files, setFiles] = useState<string[]>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        buscarZip()
            .then(setFiles)
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleclick = (file: string) => {
        route.push(`bi/consultation?file=${encodeURIComponent(file)}`)
    }

    return (
        <section className="w-full h-[600px] flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">

            {loading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-[60] rounded-2xl">
                    <Loader />
                </div>
            )}

            <div className="shrink-0 px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center size-10 rounded-lg bg-blue-50 text-blue-600">
                        📁
                    </div>

                    <div>
                        <h1 className="text-base font-semibold text-gray-800">
                            Arquivos
                        </h1>

                        <p className="text-sm text-gray-400">
                            Selecione um arquivo para consultar os dados
                        </p>
                    </div>

                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">

                {files ? (
                    files.length > 0 ? (
                        files.map((file) => (
                            <button
                                key={file}
                                type="button"
                                onClick={() => handleclick(file)}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    rounded-lg
                                    text-left
                                    hover:bg-gray-50
                                    transition
                                    group
                                "
                            >

                                <div className="
                                    flex
                                    items-center
                                    justify-center
                                    size-9
                                    rounded-md
                                    bg-gray-100
                                    text-gray-500
                                    group-hover:bg-blue-50
                                    group-hover:text-blue-600
                                    transition
                                    shrink-0
                                ">
                                    📄
                                </div>

                                <span className="
                                    flex-1
                                    truncate
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    group-hover:text-blue-700
                                ">
                                    {file}
                                </span>

                                <span className="
                                    text-gray-300
                                    group-hover:text-blue-500
                                ">
                                    →
                                </span>

                            </button>
                        ))
                    ) : (
                        <p className="text-gray-800">
                            Sem Dados, Por Favor Contate Um Consultor!
                        </p>
                    )
                ) : null}

            </div>
        </section>
    )
}