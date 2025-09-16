import { useState, useEffect } from "react";

type MemoryGameProps = {
    images: string[]; // array de URLs de imágenes que se usarán en el juego
};

type Card = {
    id: number; // identificador único de la carta
    image: string; // URL de la imagen
    flipped: boolean; // si la carta está volteada
    matched: boolean; // si la carta ya se ha emparejado
};

// Función para barajar un array (Fisher-Yates algoritmo)
function shuffleArray<T>(array: T[]): T[] {
    const result = [...array]; // copiamos el array para no modificar el original
    for (let i = result.length - 1; i > 0; i--) { // va desde el final para abajo, siempre q sea mayor q 0
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]]; // intercambiamos elementos
    }
    return result; // devolvemos el array barajado
}

export default function MemoryGame({ images }: MemoryGameProps) {
    const [cards, setCards] = useState<Card[]>([]); // estado de todas las cartas
    const [flippedCards, setFlippedCards] = useState<number[]>([]); // índices de cartas volteadas

    // Inicializa las cartas duplicando y barajando las imágenes
    useEffect(() => {
        // se duplican las imagenes para tener pares
        const doubled = [...images, ...images].map((img, i) => ({
            id: i,
            image: img,
            flipped: false,
            matched: false,
        }));
        // shuffleArray baraja las cartas
        setCards(shuffleArray(doubled));
    }, [images]);

    // Maneja el clic en una carta
    const handleFlip = (index: number) => {
        if (flippedCards.length === 2 || cards[index].flipped) return; // evita más de 2 cartas volteadas o clics en cartas ya volteadas

        const newCards = [...cards];
        newCards[index].flipped = true; // volteamos la carta clicada
        setCards(newCards);
        setFlippedCards([...flippedCards, index]); // guardamos el índice de la carta volteada
    };

    // Comprueba coincidencia de cartas volteadas
    useEffect(() => {
        if (flippedCards.length === 2) {
            // solo cuando hay 2 cartas volteadas
            const [first, second] = flippedCards;
            if (cards[first].image === cards[second].image) {
                // si coinciden, marcamos como "matched"
                const newCards = [...cards];
                newCards[first].matched = true;
                newCards[second].matched = true;
                setCards(newCards);
            } else {
                // si no coinciden, las volteamos de nuevo después de 1 segundo
                setTimeout(() => {
                    const newCards = [...cards];
                    newCards[first].flipped = false;
                    newCards[second].flipped = false;
                    setCards(newCards);
                }, 1000);
            }
            setFlippedCards([]); // reiniciamos el estado de cartas volteadas
        }
    }, [flippedCards, cards]);

    // Render del tablero
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 150px)",
                gap: "10px",
            }}
        >
            {cards.map((card, index) => (
                <div
                    key={card.id}
                    onClick={() => handleFlip(index)}
                    style={{
                        width: "150px",
                        height: "150px",
                        backgroundColor: "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        border: "2px solid #333",
                        fontSize: "2rem",
                    }}
                >
                    {card.flipped || card.matched ? (
                        <img
                            src={card.image}
                            alt="card"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        <span>?</span> // placeholder cuando la carta está boca abajo
                    )}
                </div>
            ))}
        </div>
    );
}
