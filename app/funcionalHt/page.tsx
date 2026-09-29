'use client'

import { Header } from "@/global/components/header/header";
import { acessRole } from "@/utils/cargo";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import Table from "./components/table";
import Sidebar from "@/global/sidebar/sidebar";

export default function FuncionalHt(){
  const router = useRouter()

  useEffect(() => {
    async function check() {
      const ok = await acessRole(["suporte","admin"])

      if (!ok) {
        router.push("/404")
      }
    }

    check()
  }, [])
    
    return(
    <div>
      <Sidebar />
      <Header />
      <main className="ml-[264px] max-sm:ml-35 max-h-full">
        <div className="flex justify-center px-8 py-10">
          <div className="w-full">
            <Table />
          </div>
        </div>
      </main>
    </div>
    )
}