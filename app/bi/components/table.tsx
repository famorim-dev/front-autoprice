
"use client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry, type ColDef, type FilterChangedEvent, type GridApi } from "ag-grid-community"
import { FiBarChart2, FiBarChart, FiDatabase, FiDownload, FiHash, FiRefreshCw, FiSearch, FiTable, FiX } from "react-icons/fi"
import { toast } from "sonner"
import { data, sum } from "@/services/bi"
import Loader from "@/global/components/loader/loader"
import Card from "@/global/components/card/card"
import type { Filter } from "../../../types/filter"
import { isNumericColumn } from "./table.utils"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import { baixarArquivoZip } from "@/services/baixarArquivos"

ModuleRegistry.registerModules([AllCommunityModule])

export default function Table() {
    const [rowData, setRowData] = useState<any[]>([])
    const [sumResult, setSumResult] = useState<{ column: string, total: number } | null>(null)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [searchColumn, setSearchColumn] = useState("")
    const [sumColumn, setSumColumn] = useState("")
    const [filters, setFilters] = useState<Record<string, Filter>>({})

    const gridApi = useRef<GridApi | null>(null)

    const router = useRouter()
    const searchParams = useSearchParams()
    const file = searchParams.get("file")

    const columns = useMemo(() => {
        if (!rowData.length) {
            return []
        }

        return Object.keys(rowData[0])
    }, [rowData])

    const numericColumns = useMemo(() => {
        if (!rowData.length) {
            return []
        }

        return columns.filter(column =>
            isNumericColumn(rowData, column)
        )
    }, [rowData, columns])

    const columnDefs = useMemo<ColDef[]>(() => {
        if (!rowData.length) {
            return []
        }

        return columns.map(field => ({
            field,
            headerName: field,
            filter: isNumericColumn(rowData, field) ? "agNumberColumnFilter" : "agTextColumnFilter",
            sortable: true,
            resizable: true,
            minWidth: 160,
            flex: 1,
            headerClass: "border-r border-border px-4 text-xs font-semibold text-muted-foreground",
            cellClass: "border-r border-border/60 px-4 text-sm text-foreground",
        }))
    }, [rowData, columns])

    const loadData = useCallback(
        async (column = "", value = "") => {
            if (!file) {
                router.push("/bi")
                return
            }

            try {
                setLoading(true)

                const response = await data(file, column, value)

                if (!Array.isArray(response)) {
                    throw new Error("Resposta inválida")
                }

                setRowData(response)
            } catch (error) {
                setRowData([])

                toast.error(error instanceof Error ? error.message : "Erro ao buscar dados")
            } finally {
                setLoading(false)
            }
        },
        [file, router]
    )

    function getFilters(model: Record<string, Filter>) {
        return Object.fromEntries(
            Object.entries(model).map(([column, filter]) => [column, filter.filter ?? ""])
        )
    }

    async function handleSum(column: string) {
        if (!file || !gridApi.current) {
            return
        }

        try {
            setLoading(true)

            const model = gridApi.current.getFilterModel() as Record<string, Filter>
            const currentFilters = getFilters(model)
            const response = await sum(file, column, currentFilters)

            setSumResult({
                column,
                total: Number(response.total ?? 0),
            })
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao calcular soma")
        } finally {
            setLoading(false)
        }
    }

    function handleFilterChanged(event: FilterChangedEvent) {
        const model = event.api.getFilterModel() as Record<string, Filter>
        setFilters(model)
        const currentFilters = getFilters(model)
        loadData("", JSON.stringify(currentFilters))
    }

    function handleSearch(value: string) {
        setSearch(value)

        if (!value.trim()) {
            loadData()
            return
        }

        loadData(searchColumn, value.trim())
    }

    function handleSearchColumn(column: string) {
        setSearchColumn(column)

        if (!search.trim()) {
            return
        }

        loadData(column, search.trim())
    }

    function clearSearch() {
        setSearch("")
        setSearchColumn("")
        loadData()
    }

    function refresh() {
        setSumResult(null)
        setSearch("")
        setSearchColumn("")
        loadData()
    }

    async function exportCsv(nome: string){
        try {
            setLoading(true)
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
            setLoading(false)
        }
    }

    useEffect(() => {
        if (file) {
            loadData()
        }
    }, [file, loadData])

    useEffect(() => {
        if (!sumColumn && numericColumns.length) {
            setSumColumn("")
        }
    }, [numericColumns, sumColumn])

    return (
        <main className="min-h-screen w-full bg-background">
            {loading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="rounded-xl bg-background p-5 shadow-xl">
                        <Loader />
                    </div>
                </div>
            )}

            <div className="mx-auto flex min-h-screen w-full max-w-[1800px] flex-col px-6 py-6">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <FiBarChart2 size={21} />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-foreground">
                                    Business Intelligence
                                </h1>

                                <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-surface">
                                    BI
                                </span>
                            </div>

                            <div className="mt-1 flex items-center gap-2 text-sm font-bold text-muted-foreground">
                                <FiDatabase size={14} />
                                <span>{file}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={refresh} className="flex h-10 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground transition">
                            <FiRefreshCw size={16} className={loading ? "animate-spin" : ""} />
                            Atualizar
                        </button>

                        <button onClick={() => exportCsv(file!)} disabled={!rowData.length} className="flex h-10 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:opacity-50">
                            <FiDownload size={16} />
                            Exportar
                        </button>
                    </div>
                </div>

                <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Card icon={<FiTable size={18} />} title="Registros" value={rowData.length.toLocaleString("pt-BR")} description="Dados carregados" />
                    <Card icon={<FiDatabase size={18} />} title="Colunas" value={columnDefs.length.toLocaleString("pt-BR")} description="Campos disponíveis" />
                    <Card icon={<FiHash size={18} />} title="Colunas numéricas" value={numericColumns.length.toLocaleString("pt-BR")} description="Campos para análise" />
                    <Card icon={<FiBarChart size={18} />} title="Soma" value={sumResult ? sumResult.total.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : "—"} description={sumResult?.column ?? "Nenhuma coluna selecionada"} />
                </div>

                <div className="mb-4 rounded-xl border border-border bg-surface p-3 shadow-sm">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                        {numericColumns.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 xl:border-r xl:border-border xl:pr-4">
                                <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3">
                                    <FiBarChart size={16} className="text-muted-foreground" />
                                    <select value={sumColumn} onChange={event => setSumColumn(event.target.value)} className="bg-transparent text-sm font-medium text-foreground outline-none">
                                        <option value="">
                                            Colunas Para Somar
                                        </option>
                                        {numericColumns.map(column => (
                                            <option key={column} value={column}>
                                                {column}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button onClick={() => sumColumn && handleSum(sumColumn)} disabled={!sumColumn} className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:opacity-50">
                                    <FiBarChart size={16} />
                                    Calcular
                                </button>
                            </div>
                        )}

                        <div className="flex min-w-0 flex-1 gap-2">
                            <div className="relative min-w-0 flex-1">
                                <FiSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

                                <input value={search} onChange={event => handleSearch(event.target.value)} placeholder="Pesquisar nos dados..." className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary" />

                                {search && (
                                    <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground">
                                        <FiX size={15} />
                                    </button>
                                )}
                            </div>

                            <div className="flex h-10 shrink-0 items-center rounded-lg border border-border bg-background px-3">
                                <select value={searchColumn} onChange={event => handleSearchColumn(event.target.value)} className="bg-transparent text-sm font-medium text-foreground outline-none">
                                    <option value="">
                                        Consultar Colunas
                                    </option>
                                    {columns.map(column => (
                                        <option key={column} value={column}>
                                            {column}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                    {rowData.length > 0 ? (
                        <div className="h-[calc(100vh-355px)] min-h-[500px] w-full">
                            <AgGridReact
                                key={file}
                                className="ag-theme-balham h-full w-full"
                                columnDefs={columnDefs}
                                rowData={rowData}
                                pagination
                                paginationPageSize={50}
                                onGridReady={event => {
                                    gridApi.current = event.api
                                }}
                                onFilterChanged={handleFilterChanged}
                                defaultColDef={{
                                    minWidth: 160,
                                    sortable: true,
                                    resizable: true,
                                    filter: true,
                                    suppressHeaderMenuButton: true,
                                    suppressHeaderFilterButton: true,
                                }}
                                animateRows
                                suppressCellFocus
                                enableCellTextSelection
                                tooltipShowDelay={500}
                                rowHeight={46}
                                headerHeight={50}
                            />
                        </div>
                    ) : (
                        <div className="flex h-full min-h-[500px] flex-col items-center justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-surface">
                                <FiDatabase size={25} />
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-foreground">
                                Nenhum dado encontrado
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Não existem registros para exibir.
                            </p>

                            <button onClick={refresh} className="mt-5 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover">
                                <FiRefreshCw size={15} />
                                Atualizar dados
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}