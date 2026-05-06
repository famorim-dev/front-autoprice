'use client'
import { Header } from "@/global/components/header/header"
import TableHome from "./components/table"
import { useEffect } from "react"
import { redirecionaPorCargo } from "@/utils/cargo"
import { useRouter } from "next/router"

export default function Consultas() {
  const router = useRouter()

  useEffect(() => {
    async function check() {
      const ok = await redirecionaPorCargo(["consultor","admin"])

      if (!ok) {
        router.push("/404")
      }
    }

    check()
  }, [])
  return (
    <div>
      <Header/>
      <main>
        <TableHome/>
      </main>
    </div>
  )
}
