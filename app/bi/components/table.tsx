"use client"

import { AgGridReact } from "ag-grid-react";

import {
    AllCommunityModule,
    ModuleRegistry,
    type ColDef,
    type FilterChangedEvent,
} from "ag-grid-community";

import { themeBalham } from "ag-grid-community";

import { Suspense, useEffect, useState } from "react";

import { data } from "@/services/bi";

import "ag-grid-community/styles/ag-theme-alpine.css";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

ModuleRegistry.registerModules([AllCommunityModule])

function TableContent() {
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([])
    const [rowData, setRowData] = useState<any[]>([])

    const route = useRouter()
    const searchParams = useSearchParams()
    const file = searchParams.get("file")

    async function loadData(
        column: string = "",
        value: string = ""
    ) {
        try {
            if(!file){
                return route.push(`/bi`)
            }

            const response = await data(
                file,
                column,
                value
            )

            setRowData(response)

            if (response.length > 0 && columnDefs.length === 0) {
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
        } catch (error) {
            toast.error("Erro ao buscar dados")
        }
    }

    useEffect(() => {
        loadData()
    }, [])

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
            <div className="w-[90%] h-[90%] mt-5">

                <AgGridReact
                    theme={themeBalham}

                    columnDefs={columnDefs}
                    rowData={rowData}

                    pagination={true}

                    onFilterChanged={handleFilterChanged}

                    defaultColDef={{
                        flex: 1,
                        minWidth: 120,
                        sortable: true,
                    }}
                />

            </div>
        </main>
    )
}

export default function Table() {
    return (
        <Suspense fallback={<div>Carregando tabela...</div>}>
            <TableContent />
        </Suspense>
    )
}