'use client'

import { consultaService } from "@/services/consultas"
import { Consulta } from "@/types/consulta"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaFileExcel } from "react-icons/fa"
import ModalConsulta from "./modal"
import Dropdowns from "./dropdowns"


export default function TableHom() {
  const [data, setData] = useState<Consulta[]>([])
  const [searchName, setSearchName] = useState("")
  const [searchClient, setSearchClient] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [seletedData, setSelectedData] = useState<boolean>()
  const [selectedId, setSelectedId] = useState("")
  const [selectedNome, setSelectedNome] = useState("")
  const [selectedCliente, setSelectedCliente] = useState("")
  const [page, setPage] = useState(1)

  const itemsPerPage = 5

  useEffect(() => {
    consultaService()
      .then(res => setData(res))
      .catch(() => toast.error("Não foi possivel Carregar as informações"))
  }, [])

  const filteredData = data.filter(item => {
    const matchName = item.nome.toLowerCase().includes(searchName.toLowerCase())
    const matchClient = item.cliente.toLowerCase().includes(searchClient.toLowerCase())
    return matchName && matchClient
  })

  const handleOpenModal = (id: string, nome:string, cliente :string, date: boolean) => {
    setSelectedId(id)
    setSelectedNome(nome)
    setSelectedCliente(cliente)
    setSelectedData(date)
    setIsModalOpen(true)
  }
  
    useEffect(() => {
            setPage(1)
        }, [searchName, searchClient])

        const totalPages = Math.ceil(filteredData.length / itemsPerPage)

        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage

        const paginatedData = filteredData.slice(start, end)

  return (
  <div className="p-4">
    {isModalOpen && selectedId !== "" && (
        <ModalConsulta
            id={selectedId}
            nome={selectedNome}
            cliente={selectedCliente}
            data={seletedData}
            onClose={() => setIsModalOpen(false)}
        />
    )}
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">

      <div className="relative mx-4 mt-4 p-10 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">

        <div className="flex items-center justify-between gap-8 mb-8">
          <div>
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Consultas
            </h5>
            <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Lista de Consultas
            </p>
          </div>
          <Dropdowns/>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center ">
          <div className="relative h-10 w-full md:w-72 min-w-[200px]">
            <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>

            <input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder="Pesquisar nome"
            />
          </div>
            <div className="relative h-10 w-full md:w-72 min-w-[200px]">
                <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <input
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder="Pesquisar cliente"
                />

            </div>
        </div>
      </div>

      <div className="p-6 px-0 overflow-scroll">
        <table className="w-full mt-4 text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                Consulta
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                Cliente
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                Status
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                Criado
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                Excel
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item: Consulta) => (
                <tr key={item.id}>

                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="text-sm">{item.categoria}</p>
                      <p className="text-sm opacity-70">{item.nome}</p>
                    </div>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    {item.cliente}
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <span className="text-xs font-bold text-green-600 bg-green-500/20 px-2 py-1 rounded-md">
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    {new Date(item.criado).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button 
                    onClick={() => handleOpenModal(item.id, item.nome, item.cliente, item.date)}
                    className="flex items-center gap-2 cursor-pointer font-bold border-2 border-gray-400 p-2 rounded-xl transition-all duration-200 hover:bg-green-600 hover:text-white hover:border-green-600 hover:shadow-lg hover:-translate-y-0.5">
                        Gerar Excel
                        <FaFileExcel />
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  Nenhuma consulta encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-6 p-5">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Anterior
          </button>

          <span>
            Página {page} de {totalPages || 1}
          </span>

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Próxima
          </button>
        </div>
       </div>
      </div>
    </div>
  )
}