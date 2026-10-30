import ProjectCard from "../ProjectCard/ProjectCard";
import { projects } from "../../data/projects";
import "./Projects.css";

function Projects() {
    return (
        <section className="projects">
            <header className="projects__header">
                <h2 className="projects__title">Proyectos</h2>
                <p className="projects__subtitle">
                    Algunos de los proyectos en los que he trabajado.
                </p>
            </header>

            <div className="projects__container">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}

export default Projects;