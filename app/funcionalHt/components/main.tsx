'use client'
import { ht } from "@/services/ht"
import { useState } from "react"
import toast from "react-hot-toast"


export function MainHt(){
    const [arquivo, setArquivo] = useState<File | null>(null)

    const handleClickEnviar = async () => {
        if(!arquivo){
            return toast.error("selecione um arquivo")
        }
        try{
            const data = new FormData()
            data.append("arquivo", arquivo!)
            setArquivo(null)
            const res = await ht(data)
            toast.success(res.message)
            
        }catch(e: any){
            if(e.status == 500){
                toast.error("Erro Interno do Servidor!")
            }else{
                toast.error(e.message)
            }
        }
    }

    const handleClickBaixar = () => {
        //Chamar service quando disponivel o endpoint
    }

    return(
        <main  className="flex flex-col justify-center items-center m-2">
            <h1 className="font-semibold text-center">
                Envie o Arquivo do Cliente FuncionalHt Clicando nesse Botão abaixo!
            </h1>

            <input type="file" onChange={(e) => setArquivo(e.target.files && e.target.files[0])} className="m-5 border rounded-lg w-40 bg-blue-500 hover:bg-blue-600 cursor-pointer font-sans"/>
            <button onClick={handleClickEnviar} className="m-5 border rounded-lg w-40 bg-blue-500 hover:bg-blue-600 cursor-pointer font-sans">
                Envie aqui
            </button>

            <button onClick={() => handleClickBaixar()} className="m-5 border rounded-lg w-40 bg-green-500 hover:bg-green-600 cursor-pointer font-sans">
                Baixar Logs
            </button>
        </main>
    )
}