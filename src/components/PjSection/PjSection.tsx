import styles from './PjSection.module.css';
import { useEffect, useRef, useState } from 'react';

const projects = [
    {
        id: 1,
        title: "1",
        description: "Rin Antigravity's Editor view offers tab autocompletion, natural language code commands, and a configurable, context-aware agent.",
        image: "/project-ide.png"
    },
    {
        id: 2,
        title: "2",
        description: "Mobile Development environment with real-time preview and diverse device emulation capabilities.",
        image: "/project_mobile_1765771713318.png"
    },
    {
        id: 3,
        title: "3",
        description: "Data Science Research Platform featuring interactive node graphs and matrix-style visualizations.",
        image: "/project_data_1765771729800.png"
    },
    {
        id: 4,
        title: "4",
        description: "Server Infrastructure Dashboard providing real-time metrics and network topology mapping.",
        image: "/project_infra_1765771746758.png"
    }
];

const PjSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            {
                rootMargin: '-40% 0px -40% 0px',
                threshold: 0.2
            }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.textColumn}>
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => { sectionRefs.current[index] = el; }}
                            className={styles.textBlock}
                            data-index={index}
                        >
                            <h2 className={styles.title}>{project.title}</h2>
                            <p className={styles.description}>{project.description}</p>
                        </div>
                    ))}
                    {/* Spacer to allow last item to scroll fully away if needed, or just enough padding */}
                    <div className={styles.spacer}></div>
                </div>

                <div className={styles.imageColumn}>
                    <div className={styles.stickyWrapper}>
                        {projects.map((project, index) => (
                            <img
                                key={project.id}
                                src={project.image}
                                alt={`Project ${project.title}`}
                                className={`${styles.ideImage} ${index === activeIndex ? styles.active : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PjSection;
