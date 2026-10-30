import "./Hero.css";

import {
    FaReact,
    FaJava,
    FaPython
} from "react-icons/fa";

import { SiTypescript } from "react-icons/si";

const technologies = [
    { name: "React", icon: FaReact },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Java", icon: FaJava },
    { name: "Python", icon: FaPython }
];

function Hero() {
    return (
        <section className="hero-container" id="inicio">
            <div className="hero-terminal">

                <div className="hero-terminal__header">
                    <div className="hero-terminal__dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <span className="hero-terminal__title">
                        alexis@portfolio:~
                    </span>
                </div>

                <div className="hero-terminal__body">

                    <p className="hero-command">
                        alexis@portfolio:~$ whoami
                    </p>

                    <span className="hero-greeting">
                        HOLA, SOY WILFREDO
                    </span>

                    <h1 className="hero-title">
                        Wilfredo Alexis Mariano
                    </h1>

                    <h2 className="hero-role">
                        Software Developer
                    </h2>

                    <p className="hero-description">
                        Transformo ideas complejas en aplicaciones web
                        intuitivas, creando soluciones eficientes y a
                        la medida a través del código.
                    </p>

                    <p className="hero-command">
                        alexis@portfolio:~$ stack --list
                    </p>

                    <div className="hero-tech-container">
                        <div className="hero-tech-list">
                            {technologies.map(({ name, icon: Icon }) => (
                                <span
                                    key={name}
                                    className="tech-badge notranslate"
                                    translate="no"
                                >
                                    <Icon
                                        className="tech-icon"
                                        aria-hidden="true"
                                    />
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="hero-command hero-command--last">
                        alexis@portfolio:~$ connect
                    </p>

                    <div className="hero-actions">
                        <a
                            href="#proyectos"
                            className="btn btn-primary"
                        >
                            Ver proyectos
                        </a>

                        <a
                            href="#contacto"
                            className="btn btn-secondary"
                        >
                            Contactar
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;
