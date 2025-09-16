import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* QueryClientProvider → componente de React que provee ese cliente a toda tu app. */

const queryClient = new QueryClient(); // <-- Creamos un cliente -- objeto que guarda el estado de las queries, cache, reintentos, etc.


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* <-- Lo envolvemos aquí */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
