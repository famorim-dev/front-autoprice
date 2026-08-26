"use client"

import Loader from "@/global/components/loader/loader"
import { buscarZip } from "@/services/baixarArquivos"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaArrowRight} from "react-icons/fa"
import { FaFileArrowUp, FaFileCirclePlus } from "react-icons/fa6"

export default function FileList() {
    const route = useRouter()
    const [files, setFiles] = useState<string[]>()
    const [loading, setLoading] = useState(false)

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

                setFiles(order)
            })
            .finally(() => setLoading(false))
    }, [])

    const handleclick = (file: string) => {
        route.push(`bi/consultation?file=${encodeURIComponent(file)}`)
    }

    return (
        <section className="w-full h-120 flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">

            {loading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-[60] rounded-2xl">
                    <Loader />
                </div>
            )}

            <div className="shrink-0 px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center size-10 rounded-lg bg-surface text-primary-active">
                        <FaFileArrowUp size={24} />
                    </div>

                    <div>
                        <h1 className="text-base font-semibold text-foreground">
                            Arquivos
                        </h1>

                        <p className="text-sm text-muted font-medium">
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
                                    bg-surface
                                    text-muted
                                    group-hover:bg-surface
                                    group-hover:text-primary-hover
                                    transition
                                    shrink-0
                                ">
                                    <FaFileCirclePlus size={24} />
                                </div>

                                <span className="
                                    flex-1
                                    truncate
                                    text-sm
                                    font-medium
                                    text-foreground
                                    group-hover:text-primary-hover
                                ">
                                    {file}
                                </span>

                                <span className="
                                    text-muted
                                    group-hover:text-primary-hover
                                ">
                                    <FaArrowRight  size={12}/>
                                </span>

                            </button>
                        ))
                    ) : (
                        <p className="text-foreground font-bold">
                            Sem Dados, Por Favor Contate Um Consultor!
                        </p>
                    )
                ) : null}

            </div>
        </section>
    )
}