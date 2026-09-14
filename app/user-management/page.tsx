'use client'
import { Header } from "@/global/components/header/header"
import Sidebar from "@/global/sidebar/sidebar"
import { useEffect } from "react"
import { acessRole } from "@/utils/cargo"
import { useRouter } from "next/navigation"
import Table from "./components/table"

export default function UserManagement() {
  const router = useRouter()

  useEffect(() => {
    async function check() {
      const ok = await acessRole([], "user-management")

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
      <main className="ml-[264px] max-sm:ml-35 max-h-full">
        <div className="flex justify-center px-8 py-10">
          <div className="w-full max-w-2xl">
            <Table />
          </div>
        </div>
      </main>
    </div>
  )
}
