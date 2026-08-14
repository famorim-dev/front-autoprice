'use client'
import { Header } from "@/global/components/header/header"
import { useEffect } from "react"
import { redirecionaPorCargo } from "@/utils/cargo"
import { useRouter } from "next/navigation"
import Table from "./components/table"

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
      <Header/>
      <main >
        <Table/>
      </main>
    </div>
  )
}
