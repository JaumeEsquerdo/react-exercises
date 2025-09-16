import { useQuery } from "@tanstack/react-query";
import type { HackerNewsItem } from "../types/HackerNewsItem";

const HN_API = "https://hacker-news.firebaseio.com/v0";


async function fetchTopStories(): Promise<HackerNewsItem[]> { // devuelve una promesa de un array de HackerNewsItem
    const res = await fetch(`${HN_API}/topstories.json`);
    if (!res.ok) throw new Error("Error fetching top stories");

    const ids: number[] = await res.json(); // convierte la respuesta en un array de números (los IDs de los artículos).
    const top10 = ids.slice(0, 10); // toma solo los primeros 10 IDs,

    const articles = await Promise.all( // Promise.all([...]) espera a que todas las promesas se resuelvan, es decir, hasta que todos los artículos estén listos
        top10.map(async (id) => {
            const itemRes = await fetch(`${HN_API}/item/${id}.json`);
            if (!itemRes.ok) throw new Error("Error fetching article");
            return itemRes.json() as Promise<HackerNewsItem>;
        })
    );

    return articles;
}

export function useTopArticles() {
    return useQuery<HackerNewsItem[]>({
        queryKey: ["top-articles"], // identificador unico del caché
        queryFn: fetchTopStories, // le pasamos la función que hace el fetch de los datos
    });
}

/* **useQuery devuelve un objeto con:**

data → los datos que devuelve fetchTopStories.

isLoading → true mientras carga.

isError → true si ocurre algún error. */