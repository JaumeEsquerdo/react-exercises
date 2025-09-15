import { useState, useEffect } from "react";

/* guardar un estado en localstorage para q tenga memoria al recargar */

export const HookLocalStorage = (key, initialValue) => {
    // Inicializa con el valor de localStorage (si existe) o con el inicial
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        /* aqui igual, la key es solo identificador, lo q se pone es el value de despues de la coma */
        localStorage.setItem(key, JSON.stringify(value))
    },[key, value])

    return [value, setValue];
}

