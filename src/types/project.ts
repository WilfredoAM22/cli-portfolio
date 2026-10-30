export type ProjectStatus = "completado" | "en desarrollo" | "archivado";

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    features: string[];
    githubUrl?: string;
    demoUrl?: string;
    status: ProjectStatus;
}
