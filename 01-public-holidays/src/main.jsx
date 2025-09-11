import React from "react"
import ReactDOM from "react-dom/client"
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./index.css"


// Crear un cliente de React Query (es el cerebro de la app)
const queryClient = new QueryClient()
// Guarda la caché, el estado de loading, error, y controla refetch automático


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
