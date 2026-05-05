import axios from "axios";

export const api = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, withCredentials: true})


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    if (status === 401 && typeof window !== "undefined") {
      window.location.href = "/login"
    }

    const message =
      error?.response?.data?.mensagem ||
      error?.response?.data?.message ||
      "Erro desconhecido"

    return Promise.reject(new Error(message))
  }
)