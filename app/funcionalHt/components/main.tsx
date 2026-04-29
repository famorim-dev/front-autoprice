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
            toast.success("Pedido Enviado, aguarde a resposta!")
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
        <main className="flex flex-col justify-center items-center min-h-screen m-2 bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
            <h1 className="font-semibold text-center text-2xl md:text-3xl text-slate-800 tracking-tight leading-snug max-w-xl">
                Envie o Arquivo do Cliente FuncionalHt Clicando nesse Botão abaixo!
            </h1>

            <div className="m-5 flex flex-col items-center gap-2">
                <label className="w-60 cursor-pointer">
                    <div className="w-full py-2 rounded-xl bg-white border border-slate-300 shadow-sm text-center text-slate-700 font-medium hover:bg-slate-50 transition cursor-pointer">
                        Selecionar arquivo
                    </div>

                    <input
                        type="file"
                        onChange={(e) => setArquivo(e.target.files && e.target.files[0])}
                        className="hidden"
                    />
                </label>

                {arquivo && (
                    <p className="text-sm font-semibold text-slate-600 text-center">
                        Arquivo selecionado: <span className="font-medium">{arquivo.name}</span>
                    </p>
                )}
            </div>

            <button
                onClick={handleClickEnviar}
                className="m-3 w-60 py-2 rounded-xl bg-blue-600 text-white font-semibold
                        shadow-md hover:bg-blue-700 hover:shadow-lg
                        transition-all duration-200 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer"
            >
                Envie aqui
            </button>

            <button
                onClick={() => handleClickBaixar()}
                className="m-3 w-60 py-2 rounded-xl bg-emerald-600 text-white font-semibold
                        shadow-md hover:bg-emerald-700 hover:shadow-lg
                        transition-all duration-200 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 cursor-pointer"
            >
                Baixar Logs
            </button>
        </main>
    )
}