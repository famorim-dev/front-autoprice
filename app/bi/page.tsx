'use client'
import { Header } from "@/global/components/header/header"
import { useEffect } from "react"
import { redirecionaPorCargo } from "@/utils/cargo"
import { useRouter } from "next/navigation"
import Sidebar from "@/global/sidebar/sidebar"
import FileList from "./components/fileList"

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
            <main className="ml-[264px] max-sm:ml-35 max-h-full">
                <div className="flex justify-center px-8 py-10">
                    <div className="w-full max-w-2xl">
                        <FileList />
                    </div>
                </div>
            </main>
    </div>
  )
}
