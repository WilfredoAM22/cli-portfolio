import { useState, useRef, useEffect } from "react";
import "./InterestTerminal.css"; // 1. IMPORTACIÓN: Vincula tus estilos desacoplados

// Tipado estricto para los comandos válidos
type TerminalCommand = "help" | "arquitectura" | "ddd" | "agnostico" | "cleancode" | "hola" | "contacto";

function InterestTerminal() {
    // Estado para almacenar en tiempo real lo que el usuario escribe en el input.
    const [input, setInput] = useState<string>("");
    // Estado para guardar el historial de líneas que se muestran en la pantalla de la terminal.
    const [history, setHistory] = useState<string[]>([
        "Bienvenido a mi terminal interactiva.",
        "Escribe 'help' para ver las áreas de interés disponibles.",
        "" // Línea en blanco decorativa
    ]);

    // Estado para recordar los comandos que el usuario ha ejecutado (para las flechas).
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    // Estado para saber en qué posición del historial de comandos estamos parados.
    const [historyIndex, setHistoryIndex] = useState<number>(-1);

    // Referencia para hacer scroll automático al final de la terminal.
    const historyEndRef = useRef<HTMLDivElement>(null);
    // Referencia para poder regresar el foco al input del teclado de forma manual.
    const inputRef = useRef<HTMLInputElement>(null);

    // Diccionario (Objeto literal) que mapea cada comando con su respectiva respuesta.
    const commandResponses: Record<TerminalCommand, string> = {
        help: "Comandos disponibles: arquitectura, ddd, agnostico, cleancode, hola, contacto, clear",
        arquitectura: "➜ Me encargo del diseño de arquitecturas técnicas y estructuras robustas orientadas al software moderno. Configuro sistemas capaces de absorber de forma estable y fluida el crecimiento del mañana, evitando cuellos de botella a medida que el negocio escala.",
        ddd: "➜ Aplico un enfoque analítico profundo antes de escribir la primera línea de código. Me enfoco en comprender y delimitar las fronteras reales del negocio para asegurar que el software refleje con precisión las reglas operativas, independientemente de la tecnología elegida.",
        agnostico: "➜ No me ato a un framework o lenguaje en particular. Mi metodología se basa en la evaluación neutral y selección crítica de herramientas, eligiendo estrictamente aquellas que resuelvan mejor el caso de uso y el problema técnico específico.",
        cleancode: "➜ Escribo código altamente eficiente, legible y de alto rendimiento. Trabajo bajo los más altos estándares de desarrollo, garantizando que el software sea fácil de mantener, testear y evolucionar por cualquier miembro del equipo.",
        hola: "➜ ¡Hola! Bienvenido a mi portafolio. Soy Wilfredo Alexis Mariano, Ingeniero de Software apasionado por la arquitectura de sistemas, el desarrollo de software y la creación de soluciones tecnológicas.",
        contacto: "➜ GitHub: https://github.com/WilfredoAM22 | YouTube: https://www.youtube.com/@Aprendiendo-con-Wilfredo | Instagram: https://www.instagram.com/madebywilfrd/?hl=es | LinkedIn: https://linkedin.com | Correo: Ingenieroalexis.mariano@gmail.com",
    };

    // Desplazar el scroll hacia abajo cada vez que cambia el historial.
    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    // Función que devuelve el foco al input cuando haces clic en la terminal (si no estás seleccionando texto).
    const handleTerminalClick = () => {
        if (window.getSelection()?.toString() === "") {
            inputRef.current?.focus();
        }
    };

    // Solución al error de TypeScript usando un Type Guard seguro.
    const isCommand = (cmd: string): cmd is TerminalCommand => Object.prototype.hasOwnProperty.call(commandResponses, cmd);

    // Función principal encargada de procesar el comando ingresado por el usuario.
    const executeCommand = (command: string) => {
        const cleanCommand = command.trim().toLowerCase();

        if (!cleanCommand) return;

        // Guardamos el comando en el historial de navegación de flechas y reseteamos el índice.
        setCommandHistory((prev) => [...prev, command]);
        setHistoryIndex(-1);

        // Si el comando es 'clear', vaciamos el historial por completo y salimos de la función.
        if (cleanCommand === "clear") {
            setHistory([]);
            setInput("");
            return;
        }

        // Buscamos la respuesta en el diccionario. Si no existe, devolvemos un mensaje de error por defecto.
        const response = isCommand(cleanCommand)
            ? commandResponses[cleanCommand]
            : `Comando no reconocido: '${cleanCommand}'. Escribe 'help' para ver las opciones.`;

        // Alternativa organizada: Construimos las nuevas líneas en un arreglo temporal.
        const newLines = [
            `wilfredo@portfolio:~$ ${command}`, // Muestra lo que el usuario escribió
            response,                           // Muestra la respuesta del sistema
            ""                                  // Agrega un espacio en blanco para mejorar la lectura
        ];

        // Actualizamos el historial UNA SOLA VEZ inyectando el nuevo bloque de líneas.
        setHistory((prevHistory) => [...prevHistory, ...newLines]);
        // Limpiamos la caja de texto para dejarla lista para el siguiente comando.
        setInput("");
    };

    // Función que detecta cuando el usuario presiona una tecla dentro del input.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(input);
        }
        // Si presiona Flecha Arriba, navega hacia los comandos anteriores.
        else if (e.key === "ArrowUp") {
            e.preventDefault(); // Evita que el cursor se mueva al inicio del input
            if (commandHistory.length === 0) return;

            const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]); // Carga el comando viejo en el input
        }
        // Si presiona Flecha Abajo, navega hacia los comandos más recientes o limpia el input.
        else if (e.key === "ArrowDown") {
            e.preventDefault(); // Evita movimientos raros del cursor
            if (historyIndex === -1) return;

            const newIndex = historyIndex + 1;
            if (newIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                setInput(""); // Si llega al final, vacía el input
            } else {
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        }
    };

    // Función que detecta automáticamente enlaces web y correos electrónicos para hacerlos clickeables
    const renderLineContent = (line: string) => {
        const regex = /(https?:\/\/[^\s|]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

        if (regex.test(line)) {
            regex.lastIndex = 0;
            const parts = line.split(regex);

            return parts.map((part, i) => {
                // Caso 1: Es un enlace web de tus redes sociales (Usa .terminal-link)
                if (part.startsWith("http")) {
                    return (
                        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="terminal-link">
                            {part}
                        </a>
                    );
                }
                // Caso 2: Es tu dirección de correo electrónico (Usa .terminal-link)
                if (part.includes("@") && !part.includes("/")) {
                    return (
                        <a key={i} href={`mailto:${part}`} className="terminal-link">
                            {part}
                        </a>
                    );
                }
                // Caso 3: Es texto regular
                return part;
            });
        }
        return line;
    };

    return (
        <div onClick={handleTerminalClick} className="terminal-container">
            <h2 className="terminal-title">
                Terminal de Intereses - Wilfredo
            </h2>

            {/* Contenedor del historial con clases css */}
            <div className="terminal-history">
                {history.map((line, index) => {
                    const isUserCommand = line.startsWith("wilfredo@portfolio:");
                    return (
                        <div
                            key={index}
                            className={`terminal-line ${isUserCommand ? "terminal-command" : ""}`}
                        >
                            {renderLineContent(line)}
                        </div>
                    );
                })}
                {/* Elemento ancla para el auto-scroll */}
                <div ref={historyEndRef} />
            </div>

            {/* Línea de comandos activa ($ input) con clases css */}
            <div className="terminal-input-container">
                <span className="terminal-prompt">wilfredo@portfolio:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    placeholder="Escribe aquí..."
                    autoFocus
                />
            </div>
        </div>
    );
}

export default InterestTerminal;
