"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry, type ColDef, type FilterChangedEvent, type GridApi } from "ag-grid-community"
import { themeBalham } from "ag-grid-community"
import { toast } from "sonner"
import { data, sum } from "@/services/bi"
import Loader from "@/global/components/loader/loader"
import CustomHeader from "./customHeader"
import { isNumericColumn } from "./table.utils"

ModuleRegistry.registerModules([AllCommunityModule])

export default function Table() {
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([])
    const [rowData, setRowData] = useState<any[]>([])
    const [sumResult, setSumResult] = useState<{ column: string, total: number } | null>(null)
    const [loading, setLoading] = useState(false)

    const gridApi = useRef<GridApi | null>(null)

    const router = useRouter()
    const file = useSearchParams().get("file")

    async function loadData(column = "", value = "") {
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

            if (!response.length) {
                setColumnDefs([])
                return
            }

            setColumnDefs(
                Object.keys(response[0]).map(field => ({
                    field,
                    headerName: field,
                    filter: "agTextColumnFilter",
                    floatingFilter: true,
                    headerComponent: CustomHeader,
                    headerComponentParams: {
                        isNumeric: isNumericColumn(response, field),
                        onSum: handleSum,
                    },
                }))
            )
        } catch (error) {
            setRowData([])

            toast.error(error instanceof Error ? error.message : "Erro ao buscar dados")
        } finally {
            setLoading(false)
        }
    }

    function handleFilterChanged(event: FilterChangedEvent) {
        const filters = Object.fromEntries(
            Object.entries(event.api.getFilterModel()).map(
                ([column, filter]) => [column, filter.filter ?? ""]
            )
        )

        loadData("", JSON.stringify(filters))
    }

    async function handleSum(column: string) {
        if (!file || !gridApi.current) {
            return
        }

        const filters = Object.fromEntries(
            Object.entries(gridApi.current.getFilterModel()).map(
                ([column, filter]) => [column, filter.filter ?? ""]
            )
        )
        const response = await sum(file, column, filters)
        setSumResult({ column, total: response.total })

        try {
            setLoading(true)

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao buscar dados")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (file) {
            loadData()
        }
    }, [file])

    return (
        <main className="w-full h-screen flex justify-center">
            {loading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-[60]">
                    <Loader />
                </div>
            )}

            <div className="w-[90%] h-[90%] mt-5">
                {sumResult && (
                    <div className="mb-3 flex items-center justify-between rounded-lg border-border bg-surface px-4 py-3 shadow-sm">
                        <div>
                            <p className="text-xs font-medium uppercase text-muted">
                                Soma
                            </p>

                            <p className="text-sm font-bold text-foreground">
                                {sumResult.column}
                            </p>
                        </div>

                        <p className="text-xl font-bold text-gray-900">
                            {(sumResult.total ?? 0).toLocaleString("pt-BR", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                )}

                <AgGridReact
                    key={file}
                    theme={themeBalham}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination
                    onGridReady={event => {
                        gridApi.current = event.api
                    }}
                    onFilterChanged={handleFilterChanged}
                    defaultColDef={{
                        minWidth: 120,
                        sortable: true,
                    }}
                />
            </div>
        </main>
    )
}