'use client'

import { Header } from "@/global/components/header/header"
import Sidebar from "@/global/sidebar/sidebar"



export default function Home() {

  return (
    <div>
      <Sidebar/>
      <Header/>
      <main className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="text-center max-w-xl">
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Sistema de Automação
            </h1>

            <p className="mt-3 text-gray-500 text-lg">
              Plataforma interna da <span className="font-semibold text-blue-600">Pricemet</span> para automação de processos, consultas e gestão inteligente de dados.
            </p>

            <div className="mt-6">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
                    Versão interna
                </span>
            </div>

          </div>
      </main>
    </div>
  )
}
