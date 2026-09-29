"use client"

import { useEffect, useState } from "react"
import {
    FaFileExcel,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle
} from "react-icons/fa"
import { Log } from "@/types/log"
import { getlog, ht } from "@/services/ht"
import toast from "react-hot-toast"

const ITEMS_PER_PAGE = 6

export default function Table() {
    const [logs, setLogs] = useState<Log[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [arquivo, setArquivo] = useState<File | null>(null)

    useEffect(() => {
        async function loadLogs() {
            try {
                setLoading(true)
                setError(null)
                const data = await getlog()
                setLogs( [...data].sort( (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))

            } catch (error) {
                toast.error("Não foi possível buscar os logs")
                setError("Não foi possível carregar os logs de importação")
            } finally {
                setLoading(false)
            }
        }

        loadLogs()
    }, [])

    function formatFileSize(bytes: number) {
        if (bytes === 0) return "0 Bytes"

        const units = ["Bytes", "KB", "MB", "GB"]
        const index = Math.floor(Math.log(bytes) / Math.log(1024))

        return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`
    }

    function formatDate(date: string | null) {
        if (!date) return "-"

        return new Date(date).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short"
        })
    }

    const totalPages = Math.ceil(logs.length / ITEMS_PER_PAGE)

    const paginatedLogs = logs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const handleClick = async (file: File) => {
        try {
            const data = new FormData()

            data.append("arquivo", file)

            setArquivo(null)

            toast.success("Pedido enviado, aguarde a resposta!")

            const res = await ht(data)

            toast.success(res.message)

            const logs = await getlog()
            setLogs(logs)
        } catch (e: any) {
            if (e.status === 500) {
                toast.error("Erro Interno do Servidor!")
            } else {
                toast.error(e.message)
            }
        }
    }


    return (
        <div className="max-w-[1400px] mx-auto">

            <div className="block mb-4 mx-auto border-b border-border pb-2 max-w-[500px]">
                <p className="block w-full px-4 py-2 text-center text-foreground">
                    Aqui você <b>importa e visualiza as importações realizadas</b>
                </p>
            </div>

            <div className="relative flex flex-col w-full h-full text-foreground bg-surface shadow-md rounded-xl">

                <div className="relative mx-4 mt-4 overflow-hidden text-foreground bg-surface">

                    <div className="flex items-center justify-between">

                        <div>
                            <h3 className="text-lg font-semibold text-foreground">
                                Importações
                            </h3>

                            <p className="text-muted">
                                Visualize o histórico dos arquivos importados
                            </p>
                        </div>
                        <input
                            type="file"
                            accept=".xls,.xlsx"
                            className="hidden"
                            id="file-upload"
                            onChange={(e) => {
                                const file = e.target.files?.[0]

                                if (!file) return

                                setArquivo(file)

                                setTimeout(() => {
                                    handleClick(file)
                                }, 0)
                            }}
                        />

                        <button
                            onClick={() => document.getElementById("file-upload")?.click()}
                            className="rounded border border-border py-2.5 px-3 text-center text-xs font-semibold text-muted transition-all text-surface bg-primary hover:bg-primary-hover"
                            type="button"
                        >
                            Importar
                        </button>


                    </div>
                </div>

                <div className="p-0 overflow-x-auto">

                    <table className="w-full mt-4 text-left table-auto min-w-[1200px]">

                        <thead>
                            <tr>

                                <th className="p-4 border-y border-border bg-background">
                                    <p className="font-sans text-sm font-normal leading-none text-muted">
                                        Arquivo
                                    </p>
                                </th>

                                <th className="p-4 border-y border-border bg-background">
                                    <p className="font-sans text-sm font-normal leading-none text-muted">
                                        Tamanho
                                    </p>
                                </th>

                                <th className="p-4 border-y border-border bg-background">
                                    <p className="font-sans text-sm font-normal leading-none text-muted">
                                        Registros
                                    </p>
                                </th>

                                <th className="p-4 border-y border-border bg-background">
                                    <p className="font-sans text-sm font-normal leading-none text-muted">
                                        Processados
                                    </p>
                                </th>

                                <th className="p-4 border-y border-border bg-background">
                                    <p className="font-sans text-sm font-normal leading-none text-muted">
                                        Sucesso
                                    </p>
                                </th>

                                <th className="p-4 border-y border-border bg-background">
                                    <p className="font-sans text-sm font-normal leading-none text-muted">
                                        Erros
                                    </p>
                                </th>

                                <th className="p-4 border-y border-border bg-background">
                                    <p className="font-sans text-sm font-normal leading-none text-muted">
                                        Mensagem
                                    </p>
                                </th>

                                <th className="p-4 border-y border-border bg-background">
                                    <p className="font-sans text-sm font-normal leading-none text-muted">
                                        Criado em
                                    </p>
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {loading && (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center">
                                        <p className="text-sm text-muted">
                                            Carregando importações...
                                        </p>
                                    </td>
                                </tr>
                            )}

                            {!loading && error && (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center">
                                        <p className="text-sm text-error">
                                            {error}
                                        </p>
                                    </td>
                                </tr>
                            )}

                            {!loading && !error && logs.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center">
                                        <p className="text-sm text-muted">
                                            Nenhuma importação encontrada.
                                        </p>
                                    </td>
                                </tr>
                            )}

                            {!loading &&
                                !error &&
                                paginatedLogs.map((item) => {

                                    const noSuccess = item.success_rows === 0
                                    const partialSuccess = item.success_rows !== item.processed_rows
                                    const hasErrors = item.error_rows > 0

                                    return (
                                        <tr
                                            key={item.id}
                                            className={
                                                noSuccess
                                                    ? "bg-error-background hover:bg-error-background transition-colors"
                                                    : partialSuccess
                                                        ? "bg-warning-background hover:bg-warning-background transition-colors"
                                                        : "hover:bg-background transition-colors"
                                            }
                                        >

                                            <td className="p-4 border-b border-border">

                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className={
                                                            noSuccess
                                                                ? "flex items-center justify-center w-10 h-10 rounded-lg bg-error-background"
                                                                : partialSuccess
                                                                    ? "flex items-center justify-center w-10 h-10 rounded-lg bg-warning-background"
                                                                    : "flex items-center justify-center w-10 h-10 rounded-lg bg-success-background"
                                                        }
                                                    >
                                                        <FaFileExcel
                                                            className={
                                                                noSuccess
                                                                    ? "h-5 w-5 text-error"
                                                                    : partialSuccess
                                                                        ? "h-5 w-5 text-warning"
                                                                        : "h-5 w-5 text-success"
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex flex-col">

                                                        <p
                                                            className="text-sm font-semibold text-foreground max-w-[250px] truncate"
                                                            title={item.file_name}
                                                        >
                                                            {item.file_name}
                                                        </p>

                                                        <p className="text-xs text-muted">
                                                            ID: {item.id}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            <td className="p-4 border-b border-border">
                                                <p className="text-sm text-muted">
                                                    {formatFileSize(item.file_size)}
                                                </p>
                                            </td>

                                            <td className="p-4 border-b border-border">
                                                <p className="text-sm font-semibold text-foreground">
                                                    {item.total_rows.toLocaleString("pt-BR")}
                                                </p>
                                            </td>

                                            <td className="p-4 border-b border-border">
                                                <p className="text-sm text-muted">
                                                    {item.processed_rows.toLocaleString("pt-BR")}
                                                </p>
                                            </td>

                                            <td className="p-4 border-b border-border">

                                                <div className="flex items-center gap-2">

                                                    {noSuccess ? (
                                                        <FaTimesCircle className="text-error" />
                                                    ) : partialSuccess ? (
                                                        <FaExclamationTriangle className="text-warning" />
                                                    ) : (
                                                        <FaCheckCircle className="text-success" />
                                                    )}

                                                    <span
                                                        className={
                                                            noSuccess
                                                                ? "text-sm font-semibold text-error"
                                                                : partialSuccess
                                                                    ? "text-sm font-semibold text-warning"
                                                                    : "text-sm font-semibold text-success"
                                                        }
                                                    >
                                                        {item.success_rows.toLocaleString("pt-BR")}
                                                    </span>

                                                </div>

                                            </td>

                                            <td className="p-4 border-b border-border">

                                                <div className="flex items-center gap-2">

                                                    <span
                                                        className={
                                                            hasErrors
                                                                ? "text-sm font-semibold text-error"
                                                                : "text-sm text-muted"
                                                        }
                                                    >
                                                        {item.error_rows.toLocaleString("pt-BR")}
                                                    </span>

                                                </div>

                                            </td>

                                            <td className="p-4 border-b border-border">

                                                {noSuccess ? (
                                                    <div className="flex items-start gap-2 max-w-[300px]">

                                                        <FaTimesCircle className="mt-0.5 flex-shrink-0 text-error" />

                                                        <div>

                                                            <p
                                                                className="text-sm text-error-foreground break-words"
                                                                title={item.error_message || "Nenhuma linha foi processada"}
                                                            >
                                                                {item.error_message || "Nenhuma linha foi processada"}
                                                            </p>

                                                        </div>

                                                    </div>
                                                ) : partialSuccess ? (
                                                    <div className="flex items-start gap-2 max-w-[300px]">

                                                        <FaExclamationTriangle className="mt-0.5 flex-shrink-0 text-warning" />

                                                        <div>

                                                            <p className="text-xs font-semibold text-warning-foreground">
                                                                Processamento parcial
                                                            </p>

                                                            <p
                                                                className="text-sm text-warning-foreground break-words"
                                                                title={item.error_message || "Parte das linhas não foi processada"}
                                                            >
                                                                {item.error_message || "Parte das linhas não foi processada"}
                                                            </p>

                                                        </div>

                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-muted">
                                                        Nenhum erro registrado
                                                    </p>
                                                )}

                                            </td>

                                            <td className="p-4 border-b border-border">

                                                <p className="text-sm text-muted">
                                                    {formatDate(item.created_at)}
                                                </p>

                                            </td>

                                        </tr>
                                    )
                                })}

                        </tbody>

                    </table>

                </div>

                <div className="flex items-center justify-between p-3">

                    <p className="text-sm text-muted">
                        {logs.length > 0
                            ? `${logs.length} importação${logs.length !== 1 ? "ões" : ""}`
                            : ""}
                    </p>

                    <div className="flex gap-1">

                        <button
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.max(1, page - 1)
                                )
                            }
                            disabled={currentPage === 1 || loading}
                            className="rounded border border-border py-2.5 px-3 text-center text-xs font-semibold text-muted transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-50"
                            type="button"
                        >
                            Anterior
                        </button>

                        <span className="flex items-center px-3 text-xs text-muted">
                            Página {currentPage} de {totalPages || 1}
                        </span>

                        <button
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.min(totalPages, page + 1)
                                )
                            }
                            disabled={
                                currentPage >= totalPages ||
                                loading ||
                                logs.length === 0
                            }
                            className="rounded border border-border py-2.5 px-3 text-center text-xs font-semibold text-muted transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-50"
                            type="button"
                        >
                            Próximo
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}
