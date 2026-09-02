'use client'
import { Header } from "@/global/components/header/header"
import { Suspense } from "react"
import Table from "../components/table"
import Sidebar from "@/global/sidebar/sidebar"

export default function Consultas() {
  
  return (
    <div>
      <Sidebar />
      <Header />
      <main className="ml-[264px]">
        <Suspense fallback={null}>
            <Table />
        </Suspense>
      </main>
    </div>
  )
}
