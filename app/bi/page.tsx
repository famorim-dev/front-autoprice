'use client'
import { Header } from "@/global/components/header/header"
import Sidebar from "@/global/sidebar/sidebar"
import FileList from "./components/fileList"

export default function Consultas() {
  
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
