import styles from './PjSection.module.css';
import { useEffect, useRef, useState } from 'react';

const projects = [
    {
        id: 1,
        title: "Meow Coder",
        description: "Chuyên gia code dạo, bug đâu fix đó (tùy tâm trạng). Sở trường: React, Node.js và Pate.",
        image: "/cat_coder.png"
    },
    {
        id: 2,
        title: "Server Guardian",
        description: "Giám sát hệ thống 24/7 bằng phương pháp... ngủ trên server cho ấm. Đảm bảo uptime 99.9% (trừ giờ ăn).",
        image: "/cat_server.png"
    },
    {
        id: 3,
        title: "Data Analyst",
        description: "Phân tích dữ liệu hạt khô và cá ngừ. Thống kê chính xác lượng thức ăn cần nạp vào mỗi ngày.",
        image: "/cat_data.png"
    },
    {
        id: 4,
        title: "Cable Manager",
        description: "Quản lý dây cáp mạng bằng cách... cào và cắn. Đảm bảo hệ thống mạng luôn 'gọn gàng' theo cách riêng.",
        image: "/cat_infra.png"
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
        <section className={styles.section}>
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
                                <button className={styles.exploreButton}>
                                    Explore Me
                                </button>
                            )}
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
