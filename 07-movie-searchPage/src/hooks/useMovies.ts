import { useQuery } from "@tanstack/react-query";

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
}

async function fetchMovies(query: string): Promise<Movie[]> {
    // encodeURIComponent para construir urls dinamicas y seguras que no rompan la estructura de la url y complete espacios
    const res = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(query)}`);

    const data = await res.json();

    // la API devuelve { description: [ { id, title, image, ... } ] }

    return data.description || [];
}

export function useMovies(query: string) {
    return useQuery({
        queryKey: ["movies", query],
        // 🔑 queryKey: es el identificador único de la query en la cache de React Query.
        // Aquí usamos un array con ["movies", query] para que cada búsqueda distinta
        // (Matrix, Titanic, etc.) tenga su propio caché.
        queryFn: () => fetchMovies(query),
        // ⚙️ queryFn: la función que realmente hace la petición (fetch).
        // Usamos un arrow function para pasarle "query" dinámicamente.
        enabled: query.trim().length >= 2
    })
}

/* enabled: !!query */
// esto es un booleano que controla si la query se ejecuta o no automaticamente (NECESARIO PARA Q NO SE EJECUTE AL MONTARSE, YA Q ESTA VACIA LA BÚSQUEDA)

// Si query === "Matrix" → !query es false (porq un string si lo inviertes con ! es false). Se necesita poner !!query para convertir un string en un booleano real