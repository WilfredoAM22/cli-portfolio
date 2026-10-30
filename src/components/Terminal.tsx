import './Terminal.css'
import { type FunctionComponent, } from "react";

const Terminal: FunctionComponent = () => {
    // Puedes declarar tus estados aquí si los necesitas, por ejemplo:
    // const [history, setHistory] = useState<string[]>([]);

    return (
        <div className="terminal-container">
            <div className="terminal-header">
                <div className="terminal-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span className="terminal-title"> alexis@portfolio: ~ </span>
            </div>
            <div className="terminal-body">
                <h2>Bienvenido a mi portafolio</h2>
                <p className="terminal-command">alexis@portfolio:~$ whoami </p>
                <h1>Wilfredo Alexis Mariano</h1>
                <p className="terminal-role"> Software Engineering | Developer</p>
                <p className="terminal-description"> Ingeniero de Software enfocado en el desarrollo de soluciones,
                    computación en la nube y automatización de procesos.
                    Con experiencia técnica en el diagnóstico de hardware industrial
                    y pasión por optimizar flujos de trabajo
                    mediante infraestructura como código y desarrollo de scripts.</p>
                <p className="terminal-command"> alexis@portfolio:~$ skills.</p>
                <h3>Tecnologías y herramientas</h3>
                <div className="terminal-skills">
                    <span>Java + Spring Boot</span>
                    <span>TypeScript</span>
                    <span>Python</span>
                    <span>SQL</span>
                    <span>Git</span>
                    <span>Docker</span>
                </div>


            </div>
        </div>

    );
};

export default Terminal;
