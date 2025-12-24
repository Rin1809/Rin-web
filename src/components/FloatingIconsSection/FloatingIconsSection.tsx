import styles from './FloatingIconsSection.module.css';
import {
    CheckCircle2,
    PenTool,
    Folder,
    LayoutGrid,
    Copy,
    Sparkles,
    Move,
    Braces,
    Code2,
    Maximize2,
    RotateCcw,
    Link2,
    MousePointer2
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const icons = [
    { Icon: MousePointer2, delay: 0, offset: 0 },
    { Icon: CheckCircle2, delay: 1.2, offset: 40 },
    { Icon: PenTool, delay: 2.4, offset: 80 },
    { Icon: Folder, delay: 0.8, offset: 120 }, // Thap thap duoi dat
    { Icon: LayoutGrid, delay: 3.0, offset: 60 },
    { Icon: Sparkles, delay: 1.5, offset: -20 }, // Cao tit tren may
    { Icon: Braces, delay: 4.0, offset: 50 },
    { Icon: Move, delay: 2.2, offset: 100 },
    { Icon: Code2, delay: 0.5, offset: 30 },
    { Icon: Copy, delay: 3.5, offset: 70 },
    { Icon: Maximize2, delay: 1.8, offset: 110 },
    { Icon: RotateCcw, delay: 2.8, offset: 40 },
    { Icon: Link2, delay: 0.0, offset: 0 },
];

const FloatingIconsSection = () => {
    const fullText = "Welcome to my world !!\n\n 18さいです!\n\nNow its 2025 but still 18 years old... :D";
    const [displayedText, setDisplayedText] = useState("");
    const [hasStarted, setHasStarted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 } // Hien len khi thay duoc 30% roi
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;


        const timer = setInterval(() => {
            setDisplayedText((prev) => {
                // Khong duoc chay qua dai, hong het chu
                const nextIndex = prev.length + 1;
                if (nextIndex <= fullText.length) {
                    return fullText.slice(0, nextIndex);
                }
                clearInterval(timer);
                return prev;
            });
        }, 50);

        return () => clearInterval(timer);
    }, [hasStarted]);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.contentWrapper}>
                <div className={styles.splitLayout}>
                    {/* Ben trai: Hinh dong em Kurumi dang yeu */}
                    <div
                        className={styles.gifContainer}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img
                            src={isHovered ? "/kurumi2.png" : "/kurumi1.png"}
                            alt="Kurumi"
                            className={styles.gif}
                        />
                    </div>

                    {/* Ben phai: Chu chay nhu hacker */}
                    <div className={styles.titleWrapper}>
                        {/* Chu ma (Ghost) de giu cho, khong so bi nhay layout */}
                        <h2 className={`${styles.title} ${styles.ghost}`}>
                            {fullText.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </h2>

                        {/* Chu that hien len tung ky tu */}
                        <h2 className={styles.title}>
                            {displayedText.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index < displayedText.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                            <span className={styles.cursor}></span>
                        </h2>
                    </div>
                </div>

                <div className={styles.iconsContainer}>
                    {icons.map((item, index) => (
                        <div
                            key={index}
                            className={styles.iconWrapper}
                            style={{
                                transform: `translateY(${item.offset}px)`, // Song sin tinh (Static wave layout)
                            }}
                        >
                            <div
                                className={styles.iconBubble}
                                style={{
                                    animationDelay: `${item.delay}s` // Moi em mot nhip, khong ai giong ai
                                }}
                            >
                                <item.Icon size={40} strokeWidth={1.5} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FloatingIconsSection;
