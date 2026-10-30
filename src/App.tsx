import Header from "./components/Header/Header.tsx";
import Hero from "./components/Hero/Hero.tsx";
import About from "./components/About.tsx"; // 👈 Corregido aquí
import Projects from "./components/Projects/Projects.tsx";

function App() {
    return (
        <>
            <Header />
            <main className="main-content">
                <Hero />
                <About />
                    <section id="proyectos"><Projects /></section>
                <section id="contacto" className="contact-section">
                    <h2>Contacto</h2>
                </section>
            </main>
        </>
    );
}

export default App;
