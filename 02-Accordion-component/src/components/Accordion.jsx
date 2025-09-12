
import { useState, useRef, useEffect } from "react";


const AccordionItem = ({ item, isOpen, toggle }) => {
    const ref = useRef(null);
    const [height, setHeight] = useState("0px");

    useEffect(() => {
        if (ref.current) {
            setHeight(isOpen ? `${ref.current?.scrollHeight}px` : "0px");
        }
    }, [isOpen]);

    return (
        <div style={{ border: "1px solid gray", backgroundColor: "lightsalmon" }}>
            <button onClick={toggle}>{item.title}</button>
            <div
                style={{
                    height,
                    overflow: "hidden",
                    transition: "height 0.4s ease",
                    padding: isOpen ? "8px" : "0px",
                }}
            >
                <div ref={ref}>{item.content}</div>
            </div>
        </div>
    );
};


const Accordion = ({ items }) => {
    // const [openIndexes, setOpenIndexes] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);


    /* para q se abran todos los q clickes */
    // const toggleItem = (ind) => {
    //     if (openIndexes.includes(ind)) {
    //         setOpenIndexes(openIndexes.filter((i) => i !== ind));
    //     } else {
    //         setOpenIndexes([...openIndexes, ind]);
    //     }
    // };


    /* toggle de abrir un unico item del acordeon (si está abierto lo cierra y si esta cerrado lo abre, en base al ind pasado) */
    const toggleItem = (ind => {
        setOpenIndex(openIndex === ind ? null : ind)
    })

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                border: "solid 1px black",
            }}
        >
            {items.map((item, ind) => (
                <AccordionItem
                    key={ind}
                    item={item}
                    // isOpen={openIndexes.includes(ind)}
                    isOpen={openIndex === ind}
                    toggle={() => toggleItem(ind)}
                />
            ))}
        </div>
    );
};

export default Accordion;