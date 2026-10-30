import type { Project } from "../../types/project";
import "./ProjectCard.css";

interface ProjectCardProps {
    project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
    const { title, description, image, technologies, features, githubUrl, demoUrl, status } = project;

    return (
        <article className="project-card">
            <div className="project-card__media">
                <img src={image} alt={`Portada de ${title}`} className="project-card__image" />
                <span className={`project-card__status project-card__status--${status.replace(" ", "-")}`}>
          {status}
        </span>
            </div>

            <div className="project-card__body">
                <h3 className="project-card__title">{title}</h3>
                <p className="project-card__description">{description}</p>

                <h4 className="project-card__label">Funcionalidades</h4>
                <ul className="project-card__features">
                    {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>

                <h4 className="project-card__label">Tecnologías</h4>
                <ul className="project-card__tags">
                    {technologies.map((tech) => (
                        <li key={tech} className="project-card__tag">
                            {tech}
                        </li>
                    ))}
                </ul>

                <div className="project-card__links">
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-card__link">
                            GitHub
                        </a>
                    )}
                    {demoUrl && (
                        <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card__link project-card__link--primary"
                        >
                            Demo
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default ProjectCard;