import { list } from "@/services/consultas"
import { StatusType } from "@/types/status"
import { useEffect, useState } from "react"

const STATUS_LABEL: Record<string, string> = {
    waiting: "Aguardando",
    active: "Processando",
    completed: "Concluído",
    failed: "Falhou",
    delayed: "Atrasado",
}

const STATUS_CLASS: Record<string, string> = {
    waiting: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
    active: "bg-blue-50 text-blue-700 ring-blue-600/20",
    completed: "bg-green-50 text-green-700 ring-green-600/20",
    failed: "bg-red-50 text-red-700 ring-red-600/20",
    delayed: "bg-orange-50 text-orange-700 ring-orange-600/20",
}

const STATUS_DOT: Record<string, string> = {
    waiting: "bg-yellow-500",
    active: "bg-blue-500",
    completed: "bg-green-500",
    failed: "bg-red-500",
    delayed: "bg-orange-500",
}

const ITENS_POR_PAGINA = 7

export default function Status() {
    const [status, setStatus] = useState<StatusType[]>([])
    const [loading, setLoading] = useState(true)
    const [paginaAtual, setPaginaAtual] = useState(1)

    useEffect(() => {
        const carregar = async () => {
            try {
                const data = await list()
                const ordenado = (data ?? []).sort(
                    (a, b) => Number(b.jobId) - Number(a.jobId)
                )

                setStatus(ordenado)
            } catch (error) {
                console.error("Erro ao buscar processos:", error)
                setStatus([])
            } finally {
                setLoading(false)
            }
        }

        carregar()
    }, [])

    const totalPaginas = Math.ceil(status.length / ITENS_POR_PAGINA)
    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA
    const fim = inicio + ITENS_POR_PAGINA
    const statusPagina = status.slice(inicio, fim)

    const paginaAnterior = () => {
        setPaginaAtual((pagina) => Math.max(pagina - 1, 1))
    }

    const proximaPagina = () => {
        setPaginaAtual((pagina) =>
            Math.min(pagina + 1, totalPaginas)
        )
    }

    useEffect(() => {
        if (totalPaginas > 0 && paginaAtual > totalPaginas) {
            setPaginaAtual(totalPaginas)
        }
    }, [totalPaginas, paginaAtual])

    return (
        <div className="w-full rounded-lg bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-gray-200 p-6 md:flex-row md:items-center">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Processos de exportação
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Acompanhe o processamento das suas consultas
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-6 py-4">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Processo
                                </span>
                            </th>

                            <th className="px-6 py-4">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Cliente
                                </span>
                            </th>

                            <th className="px-6 py-4">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Status
                                </span>
                            </th>

                            <th className="px-6 py-4">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Erro
                                </span>
                            </th>

                            <th className="px-6 py-4">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Job
                                </span>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center">
                                    <span className="text-sm text-gray-500">
                                        Carregando processos...
                                    </span>
                                </td>
                            </tr>
                        ) : status.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center">
                                    <span className="text-sm text-gray-500">
                                        Nenhum processo encontrado.
                                    </span>
                                </td>
                            </tr>
                        ) : (
                            statusPagina.map((processo) => (
                                <tr
                                    key={processo.jobId}
                                    className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${STATUS_CLASS[processo.status] ??
                                                    "bg-gray-50 text-gray-600"
                                                    }`}
                                            >
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[processo.status] ??
                                                        "bg-gray-400"
                                                        }`}
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-semibold text-gray-900">
                                                    {processo.nome}
                                                </div>

                                                <div className="mt-0.5 text-xs text-gray-500">
                                                    Exportação
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-700">
                                            {processo.cliente ?? "-"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${STATUS_CLASS[processo.status] ??
                                                "bg-gray-50 text-gray-700 ring-gray-600/20"
                                                }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[processo.status] ??
                                                    "bg-gray-400"
                                                    }`}
                                            />

                                            {STATUS_LABEL[processo.status] ??
                                                processo.status}
                                        </span>
                                    </td>

                                    <td className="max-w-md px-6 py-4">
                                        {processo.erro ? (
                                            <span
                                                className="block truncate text-sm text-red-600"
                                                title={processo.erro}
                                            >
                                                {processo.erro}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-400">
                                                -
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600">
                                            #{processo.jobId}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {!loading && status.length > 0 && (
                <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs text-gray-500">
                        Temos {status.length} status
                    </span>

                    {totalPaginas > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={paginaAnterior}
                                disabled={paginaAtual === 1}
                                className="rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Anterior
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from(
                                    { length: totalPaginas },
                                    (_, index) => index + 1
                                ).map((pagina) => (
                                    <button
                                        key={pagina}
                                        type="button"
                                        onClick={() => setPaginaAtual(pagina)}
                                        className={`h-9 min-w-9 rounded-md px-3 text-sm font-medium transition ${paginaAtual === pagina
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        {pagina}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={proximaPagina}
                                disabled={paginaAtual === totalPaginas}
                                className="rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Próxima
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}