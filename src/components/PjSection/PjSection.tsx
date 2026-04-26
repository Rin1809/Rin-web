import styles from './PjSection.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const projects = [
    {
        id: 1,
        title: "About Me",
        description: "I am Rin or Lyn (born 18/09/2006). Am now is Integration Engineer at ETC | Lead Developer of Yurineko.",
        image: "/11.png"
    },
    {
        id: 2,
        title: "Personal Hobbies",
        description: "Reading novels and watching movies, drawing, singing, and shopping. Do you know am very love playing with cats?",
        image: "/2.jpg"
    },
    {
        id: 3,
        title: "Skills I Can Do",
        description: "We all have blind spots when it comes to our own character.",
        image: "/12.jpg"
    },
    {
        id: 4,
        title: "Languages I Can Speak",
        description: "Vietnamese Native, Japanese (N2), English self-assessed to be at least equivalent to my Japanese level. Using English for work - schools. Japanese for friends. :)",
        image: "/jp.jpg"
    },
    {
        id: 5,
        title: "!!!!",
        description: "Only read inbox from DMs discord !!!",
        image: "/13.jpg"
    }
];

const PjSection = () => {
    const navigate = useNavigate();
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
                rootMargin: '-20% 0px -20% 0px',
                threshold: 0.1
            }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section} id="projects">
            <div className={styles.container}>
                <div className={styles.textColumn}>
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => { sectionRefs.current[index] = el; }}
                            className={`${styles.textBlock} ${index === activeIndex ? styles.active : ''}`}
                            data-index={index}
                        >
                            <h2 className={styles.title}>{project.title}</h2>
                            <p className={styles.description}>{project.description}</p>
                            {index === projects.length - 1 && (
                                <button className={styles.exploreButton} onClick={() => navigate('/project')}>
                                    Explore Me
                                </button>
                            )}
                        </div>
                    ))}
                    {/* Dem them ty o duoi de scroll cho thoang, dung hoi, not fix bug dau */}
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
