"use client"

import { Modal } from "@/global/components/modal/modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { ModalProps } from "./ModalProps";
import { deleteUserClient} from "@/services/me";

export default function ModalDeleteMenbers({ openCreate, id }: ModalProps) {
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
      

        try {
            const res = await deleteUserClient(id!)
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
                title="Deseja remover esse membro?"
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
                            onClick={handleDelete}
                            className="rounded-lg bg-gradient-to-r bg-error hover:bg-error-hover px-4 py-2 text-sm font-medium text-white"
                        >
                            remover
                        </button>
                    </>
                }
            >
                <></>
            </Modal>
        </>
    )
}