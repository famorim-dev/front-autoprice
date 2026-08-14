"use client"

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import type { ColDef } from "ag-grid-community";
import type { FilterModel } from "ag-grid-community"

import "ag-grid-community/styles/ag-theme-alpine.css";


export default function Table() {
    const [loading, setLoading] = useState(false)
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([])

    return (
        <main className="flex justify-center items-center w-full h-full">

            <div className="w-[90%] h-[90%]">
                <AgGridReact
                    className="ag-theme-alpine"
                    columnDefs={columnDefs}
                    datasource={}
                    rowModelType="infinite"
                    cacheBlockSize={50}
                    paginationPageSize={50}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 120,
                        filter: true,
                        floatingFilter: true,
                        sortable: true,
                    }}
                />
            </div>
        </main>
    );
}