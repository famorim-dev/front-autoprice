'use client'

import { Header } from "@/global/components/header"
import TableHome from "./components/table"

export default function Home() {

  return (
    <div>
      <Header/>
      <main>
        <TableHome/>
      </main>
    </div>
  )
}
