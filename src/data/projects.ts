import type { Project } from "../types/project";

export const projects: Project[] = [
    {
        id: 1,
        title: "Pipeline de análisis y limpieza de logs financieros",
        description:
            "Pipeline en Python que procesa logs JSONL y CSV de sistemas financieros: limpia y valida los registros, protege los datos sensibles, detecta anomalías estadísticas y genera alertas con reglas configurables.",
        image: "/projects/finlog-pipeline.png",
        technologies: ["Python", "pandas", "PyArrow", "PyYAML", "Docker", "pytest", "Ruff"],
        features: [
            "Ingesta de JSONL y CSV sin detener el lote por filas mal formadas",
            "Normalización y validación de fechas, importes, monedas y estados",
            "Protección de datos sensibles con HMAC-SHA256 y enmascaramiento",
            "Detección de anomalías de latencia e importe (puntuación Z robusta)",
            "Alertas configurables por tasa de errores, latencia P95 e importes altos",
            "Informes en CSV, Parquet, JSON y Markdown, con CLI y ejecución en Docker",
        ],
        status: "completado",
    },
];