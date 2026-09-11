'use client'
import { Header } from "@/global/components/header/header"
import { Suspense, useEffect } from "react"
import Table from "../components/table"
import Sidebar from "@/global/sidebar/sidebar"
import { useRouter } from "next/navigation"
import { acessRole } from "@/utils/cargo"

export default function Consultas() {
  const router = useRouter()

  useEffect(() => {
    async function check() {
      const ok = await acessRole(["consultor", "admin"], "bi")

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
        <Suspense fallback={null}>
            <Table />
        </Suspense>
      </main>
    </div>
  )
}
