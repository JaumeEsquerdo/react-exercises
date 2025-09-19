import { useQuery } from "@tanstack/react-query";


// Tipado de la respuesta cruda de la API
interface ApiMovie {
    "#IMDB_ID": string;
    "#TITLE": string;
    "#YEAR": number;
    "#IMG_POSTER"?: string;
}

interface ApiResponse {
    ok: boolean;
    error_code: number;
    description: ApiMovie[];
}

// Tipado limpio para usar en la app
interface Movie {
    id: string;
    title: string;
    year: number;
    poster: string | null;
}

async function fetchMovies(query: string): Promise<Movie[]> {
    // encodeURIComponent para construir urls dinamicas y seguras que no rompan la estructura de la url y complete espacios

    const res = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(query)}`);
    /* seria mejor filtrar en la url los campos que pasan o por un backend (para mejorar el rendimiento del filtro) */


    const data: ApiResponse = await res.json();
    console.log(data)


    // Recorre cada ApiMovie y lo transforma a tu interfaz Movie
    /* OJO!!
- Aquí sí estás filtrando datos:
Solo tomas #IMDB_ID, #TITLE, #YEAR, #IMG_POSTER.

Cualquier otra propiedad que viniera en el objeto ApiMovie se queda en el aire; no pasa a tu array final de Movie[].

Es decir, aunque la API devuelva más datos, tu app solo trabaja con lo que tú defines en Movie. */
    return (data.description ?? []).map((item) => ({
        id: item["#IMDB_ID"],
        title: item["#TITLE"],
        year: item["#YEAR"],
        poster: item["#IMG_POSTER"] ?? null,
    }));
    /* porque ?? solo reemplaza null o undefined, dejando arrays vacíos [] intactos, mientras que || también reemplaza falsy como "" o 0.
Así expresas claramente: “si no hay description, uso []” sin afectar valores válidos.  */
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