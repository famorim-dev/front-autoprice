'use client'
import { Header } from "@/global/components/header/header"
import { useEffect } from "react"
import { redirecionaPorCargo } from "@/utils/cargo"
import { useRouter } from "next/navigation"
import Table from "../components/table"
import Sidebar from "@/global/sidebar/sidebar"

export default function Consultas() {
  const router = useRouter()

  useEffect(() => {
    async function check() {
      const ok = await redirecionaPorCargo(["consultor", "admin", "cliente"])

      if (!ok) {
        router.push("/404")
      }
    }

    check()
  }, [])
  return (
    <div>
      <Sidebar />
      <Header />
      <main className="ml-[264px]">
        <Table />
      </main>
    </div>
  )
}
