"use client"

import { Modal } from "@/global/components/modal/modal";
import { createUserClient } from "@/services/me";
import { useState } from "react";
import toast from "react-hot-toast";
import { ModalProps } from "./ModalProps";


export default function ModalAddMenbers({ openCreate }: ModalProps) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const res = await createUserClient(name!, email!, password!)
            toast.success(res.message)
            setOpen(false)
            return
        } catch (e: unknown) {
            toast.error((e as any)?.message?.split(",")[0] || (e as any)?.message ||  'Ocorreu um erro inesperado')
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

                            <label className="mb-2 block text-sm font-semibold text-foreground">
                                Email
                            </label>

                            <input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="email"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-foreground focus:outline-none focus:ring-0"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-foreground">
                                senha
                            </label>

                            <input
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                type="password"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-foreground focus:outline-none focus:ring-0"
                            />

                        </div>

                    </div>

                </form>

            </Modal>
        </>
    )
}