import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "./Header.css";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        // Posición de referencia que permanece fija hasta cambiar dirección o superar el umbral
        let referenceScrollY = window.scrollY;
        // Registro de la dirección anterior para detectar cuándo el usuario cambia de sentido
        let wasScrollingDown = false;

        const scrollThreshold = 10;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            const isScrollingDown = currentScrollY > referenceScrollY;
            const isScrollingUp = currentScrollY < referenceScrollY;
            const scrollDifference = Math.abs(currentScrollY - referenceScrollY);
            const passedMinHeight = currentScrollY > 50;

            // Detectar si el usuario cambia el sentido del desplazamiento
            if (isScrollingDown !== wasScrollingDown) {
                referenceScrollY = currentScrollY;
                wasScrollingDown = isScrollingDown;
                return; // Reiniciamos el conteo desde este punto exacto de giro
            }

            setHidden((prevHidden) => {
                // Regla 1: Al inicio de la página se muestra siempre obligatoriamente
                if (!passedMinHeight) {
                    return false;
                }

                // Si baja acumulando 10px o más, se oculta
                if (isScrollingDown && scrollDifference >= scrollThreshold) {
                    referenceScrollY = currentScrollY;
                    return true;
                }

                //  Si sube acumulando 10px o más, reaparece
                if (isScrollingUp && scrollDifference >= scrollThreshold) {
                    referenceScrollY = currentScrollY;
                    return false;
                }

                //  Si no alcanza el umbral de movimiento, conserva el estado actual
                return prevHidden;
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`header-wrapper ${hidden ? "header--hidden" : ""}`}>
            <div className="header-container">
                <div className="header-title">
                    <h1>WILFREDO ALEXIS MARIANO</h1>
                </div>

                <button
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className={`main-nav ${isMenuOpen ? "main-nav--open" : ""}`}>
                    <ul>
                        <li className="nav-item"><a href="#inicio">Inicio</a></li>
                        <li className="nav-item"><a href="#sobre-mi">Sobre mí</a></li>
                        <li className="nav-item"><a href="#proyectos">Proyectos</a></li>
                        <li className="nav-item"><a href="#contacto">Contacto</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
