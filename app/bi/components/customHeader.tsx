"use client"

import type { IHeaderParams } from "ag-grid-community"
import { LuChartNoAxesColumnIncreasing } from "react-icons/lu"

type Props = IHeaderParams & { isNumeric?: boolean, onSum?: (column: string) => void }

export default function CustomHeader({ displayName, column, progressSort, isNumeric, onSum }: Props) {
    return (
        <div className="w-full h-full flex items-center">
            <button
                type="button"
                className="flex-1 min-w-0 text-left truncate cursor-pointer"
                onClick={event => {
                    event.stopPropagation()
                    progressSort(event.shiftKey)
                }}
            >
                {displayName}
            </button>

            {isNumeric && (
                <button
                    type="button"
                    className="px-2 cursor-pointer font-bold text-gray-600 hover:text-black"
                    title="Somar coluna"
                    onClick={event => {
                        event.stopPropagation()
                        column && onSum?.(column.getColId())
                    }}
                >
                    <LuChartNoAxesColumnIncreasing
                        size={15}
                        strokeWidth={2}
                    />
                </button>
            )}
        </div>
    )
}