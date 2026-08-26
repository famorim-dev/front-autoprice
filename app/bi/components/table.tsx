"use client"

import { AgGridReact } from "ag-grid-react"
import {
    AllCommunityModule,
    ModuleRegistry,
    type ColDef,
    type FilterChangedEvent,
} from "ag-grid-community"
import { themeBalham } from "ag-grid-community"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { data } from "@/services/bi"
import Loader from "@/global/components/loader/loader"
import { toast } from "sonner"

ModuleRegistry.registerModules([AllCommunityModule])

function TableContent() {
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([])
    const [rowData, setRowData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()

    const file = searchParams.get("file")

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

            if (response.length > 0) {
                const columns: ColDef[] = Object.keys(response[0]).map(
                    (column) => ({
                        field: column,
                        headerName: column,
                        filter: "agTextColumnFilter",
                        floatingFilter: true,
                    })
                )

                setColumnDefs(columns)
            }

            setRowData(response)
        } catch (error) {

            setRowData([])

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erro ao buscar dados"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (file) {
            loadData()
        }
    }, [file])

    function handleFilterChanged(event: FilterChangedEvent) {
        const filterModel = event.api.getFilterModel()
        const columns = Object.keys(filterModel)

        if (columns.length === 0) {
            loadData()
            return
        }

        const column = columns[0]
        const filter = filterModel[column]
        const value = filter?.filter ?? ""

        loadData(column, value)
    }

    return (
        <main className="w-full h-screen flex justify-center">
            {loading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-[60]">
                    <Loader />
                </div>
            )}

            <div className="w-[90%] h-[90%] mt-5">
                <AgGridReact
                    key={file}
                    theme={themeBalham}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={true}
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

export default function Table() {
    return <TableContent />
}