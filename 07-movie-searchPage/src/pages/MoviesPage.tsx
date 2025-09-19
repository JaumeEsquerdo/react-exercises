import { useState } from "react";
import { useMovies } from "../hooks/useMovies";

const MoviesPage = () => {

    const [query, setQuery] = useState("")
    const { data: movies, isLoading, isError } = useMovies(query)

    return (
        <div style={{ padding: "rem", display: "flex", flexDirection: "column", gap: "20px", width:"100%", justifyContent:"center", alignItems:"center" }}>
            <h2>🎬 Buscador de pelis!</h2>

            {/* input */}

            <input type="text" placeholder="Busca una pelicula... (Matrix...)" value={query} onChange={(e) => setQuery(e.target.value)} style={{
                padding: "0.5rem",
                width: "300px",
                marginBottom: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
            }} />

            {/* loading */}

            {isLoading && <p>Está cargando resultados</p>}

            {isError && <p>Error en la búsqueda.</p>}

            {/*Resultados */}
            <ul>
                {movies?.map((movie) => (
                    <li key={movie.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}>
                        {movie.poster ?
                            <img src={movie.poster} alt={movie.title} style={{ width: "80px", marginRight: "1rem" }} />
                            :
                            (
                                <div
                                    style={{
                                        width: "80px",
                                        height: "120px",
                                        marginRight: "1rem",
                                        background: "#eee",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "12px",
                                        color: "#666",
                                    }}
                                >
                                    Sin póster
                                </div>
                            )}
                            <div style={{display:"flex", flexDirection:"column", gap:"12px"}}>
                            <span style={{fontSize:"1.4rem", fontWeight:500}}>{movie.title}</span>
                            <span>{movie.year}</span>

                            </div>
                    </li>
                ))}
            </ul>


        </div>
    );
}

export default MoviesPage;