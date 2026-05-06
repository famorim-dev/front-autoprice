import { baixarArquivoZip, buscarZip } from "@/services/baixarArquivos"
import { useEffect, useState } from "react"

export default function Dropdowns(){
    const [open, setOpen] = useState(false)
    const [arquivos, setArquivos] = useState<string[]>([])

    const handleClick = () => {
        setOpen(prev => !prev)
    }
    const handleBaixarZip = async (nome: string) => {
        const blob = await baixarArquivoZip(nome)
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = `${nome}.zip`

        document.body.appendChild(a)
        a.click()

        a.remove()
        window.URL.revokeObjectURL(url)
    }

    useEffect(() => {
        buscarZip()
        .then(res => setArquivos([...res].reverse()))
    }, [])

    return(
        <div className="relative">
            <button
                onClick={handleClick}
                data-dropdown-toggle="dropdownNotification"
                className="relative inline-flex items-center text-sm font-medium text-center w-100 cursor-pointer text-body hover:text-heading focus:outline-none"
                type="button"
            >
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
                </svg>

                <div className="absolute block w-3 h-3 bg-danger border-2 border-buffer rounded-full top-0 start-3"></div>
            </button>

            <div
                id="dropdownNotification"
                className={`absolute z-20 w-full max-w-sm bg-neutral-primary-soft divide-y divide-default-medium rounded-base shadow ${
                    open ? "block" : "hidden"
                } max-h-60 overflow-y-auto`}
                aria-labelledby="dropdownNotificationButton"
            >
                <div className="block px-4 py-2 font-medium text-center text-body rounded-t-base bg-neutral-secondary-medium">
                    Zips
                </div>

                {arquivos.map((item, index) => (
                    <div key={index} className="divide-y divide-default" onClick={() =>handleBaixarZip(item)}>
                        <a href="#" className="flex px-4 py-3 hover:bg-neutral-secondary-medium">
                            <div className="shrink-0">
                                <img
                                    className="rounded-full w-11 h-11"
                                    src="https://play-lh.googleusercontent.com/XuMEPkZd7QKkdsUOMbxJtqu9NebuyreEwaylXmPuhOB3nLQ-9ksav47cgGsinskrk5rW"
                                    alt="Jese image"
                                />
                                <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-brand border border-buffer-medium rounded-full">
                                    <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Zm5-7a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm0 2a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="w-full ps-3">
                                <div className="text-body text-sm mb-1.5">{item}</div>
                                <div className="text-xs text-fg-brand">Clique Para Baixar</div>
                            </div>
                        </a>
                    </div>
                ))}

                <a href="#" className="block py-2 font-medium text-center text-body rounded-b-base bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium">
                    <div className="inline-flex items-center">
                        <svg className="w-5 h-5 me-1.5 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        Ver Todos
                    </div>
                </a>
            </div>
        </div>
    )
}