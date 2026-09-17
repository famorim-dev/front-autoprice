"use client"

import { Modal } from "@/global/components/modal/modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ModalProps } from "./ModalProps";
import { getPages, updateUserClient } from "@/services/me";
import { Page } from "@/types/page";

const availablePages = [
    {
        key: "bi",
        label: "Dados",
    },
]

export default function ModalUpdateMenbers({ openCreate, id, client }: ModalProps) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [userAcessPage, setUserAcessPage] = useState<Page[] | null>()
    const [send, setSend] = useState<boolean>(false)
    const [pages, setPages] = useState<Record<string, boolean>>({ bi: false })

    useEffect(() => {
        getPages(client!)
            .then((items) => {
                setUserAcessPage(items)

                setPages({
                    bi: items?.some((page) => page.page === "bi") ?? false,
                })
            })
    }, [id])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const res = await updateUserClient(id!, client!, pages , name?.trim() || undefined)
            toast.success(res.message)
            setOpen(false)
            return
        } catch (e: unknown) {
            toast.error((e as any)?.message?.split(",")[0] || (e as any)?.message || 'Ocorreu um erro inesperado')
        }
    }

    return (
        <>
            <div onClick={() => setOpen(true)}>
                {openCreate}
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Adicionar membro"
                size="lg"
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="mr-1 rounded-lg px-4 py-2 text-sm font-medium"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            form="member-form"
                            className="rounded-lg bg-gradient-to-r bg-primary hover:bg-primary-hover px-4 py-2 text-sm font-medium text-white"
                        >
                            Confirmar
                        </button>
                    </>
                }
            >

                <form id="member-form" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-foreground">
                                Nome
                            </label>

                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                type="text"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-foreground focus:outline-none focus:ring-0"
                            />

                        </div>

                        <div>
                            <label className="mb-2 block font-semibold text-foreground">
                                Selecione as páginas permitidas:
                            </label>

                            {availablePages.map((item) => (
                                <label
                                    key={item.key}
                                    className="mb-2 ml-5 flex items-center gap-2 text-sm font-semibold text-foreground"
                                >
                                    <input
                                        type="checkbox"
                                        checked={pages[item.key] ?? false}
                                        onChange={(event) =>
                                            setPages((prev) => ({
                                                ...prev,
                                                [item.key]: event.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    {item.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}