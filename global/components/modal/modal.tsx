"use client"

import { ReactNode, useEffect } from "react";

interface ModalProps {

    open: boolean

    onClose: () => void

    title?: string

    children: ReactNode

    footer?: ReactNode

    size?: "sm" | "md" | "lg" | "xl"

    scrollable?: boolean

}

export function Modal({

    open,

    onClose,

    title,

    children,

    footer,

    size = "md",

    scrollable = false,

}: ModalProps) {

    useEffect(() => {

        if (!open) return

        const handleEscape = (event: KeyboardEvent) => {

            if (event.key === "Escape") {

                onClose()

            }

        }

        document.addEventListener("keydown", handleEscape);

        return () => {

            document.removeEventListener("keydown", handleEscape);

        }

    }, [open, onClose])

    if (!open) return null

    const sizes = {

        sm: "max-w-sm",

        md: "max-w-lg",

        lg: "max-w-2xl",

        xl: "max-w-4xl",

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div
                className={`relative w-full ${sizes[size]} rounded-lg bg-surface shadow-2xl`}
                onClick={(event) => event.stopPropagation()}
            >

                <div className="flex items-center justify-between border-b border-gray-200 p-4">

                    <h3 className="text-xl font-semibold text-foreground">

                        {title}

                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-muted "
                        aria-label="Close"
                    >

                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>

                    </button>

                </div>

                <div className={`p-4 ${scrollable ? "max-h-[70vh] overflow-y-auto" : ""}`}>

                    {children}

                </div>

                {footer && (

                    <div className="flex items-center justify-end gap-2 border-t border-gray-200 p-4">

                        {footer}

                    </div>

                )}

            </div>

        </div>

    )

}