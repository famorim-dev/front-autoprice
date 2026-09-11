'use client'

import { Header } from "@/global/components/header/header";
import { MainHt } from "./components/main";
import { acessRole } from "@/utils/cargo";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

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
            <Header/>
            <MainHt/>
        </div>
    )
}