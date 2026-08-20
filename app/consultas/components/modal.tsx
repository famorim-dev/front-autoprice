'use client'

import Loader from "@/global/components/loader/loader"
import { geraExcel } from "@/services/consultas"
import { error } from "console"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export default function ModalConsulta({ id, nome, cliente, data, onClose }: any) {
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [dataExtracao, setDataExtracao] = useState("")
  const [loader, setLoader] = useState(false)

  const handleSubmit = async () => {

    const inicio = new Date(dataInicio)
    const fim = new Date(dataFim)

    const diffMeses =
      (fim.getFullYear() - inicio.getFullYear()) * 12 +
      (fim.getMonth() - inicio.getMonth())

    if (diffMeses > 6) {
      toast.error("O intervalo não pode ultrapassar 6 meses")
      return
    }

    const isValidMonth = /^\d{4}-(0[1-9]|1[0-2])$/.test(dataExtracao)

    if (dataExtracao && !isValidMonth) {
      toast.error("Digite somente ano e mês no formato 2020-09")
      return
    }
    try {
      setLoader(true)
      await geraExcel(id, dataInicio, dataFim, dataExtracao)
      setLoader(false)
      toast.success("Arquivo gerado com sucesso!")
      onClose()
    } catch (err: unknown) {
      setLoader(false)
      toast.error(
          (err as any)?.message ||
          'Ocorreu um erro inesperado'
      )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {loader && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-[60] rounded-2xl">
          <Loader />
        </div>
      )}
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[420px]">

        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Gerar Excel
        </h2>

        <p className="text-sm text-gray-500 mb-4 font-semibold">
          Você está prestes a gerar um arquivo ZIP contendo o Excel referente ao cliente{" "}
          <span className="text-green-600 font-bold">{cliente}</span>, utilizando os dados da consulta{" "}
          <span className="text-blue-600 font-bold">{nome}</span>.
        </p>
        {data === true && (
          <div className="flex flex-col gap-4">

            <div>
              <label className="text-sm text-black font-bold">Data início</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 font-bold text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-black font-bold">Data fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 font-bold text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-black font-bold">
                Data de extração (opcional)
              </label>
              <input
                type="text"
                placeholder="YYYY-MM"
                value={dataExtracao}
                onChange={(e) => setDataExtracao(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 font-bold text-black"
              />
            </div>

          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition cursor-pointer"
          >
            Gerar
          </button>

        </div>

      </div>
    </div>
  )
}