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

const icons = [
    { Icon: MousePointer2, delay: 0, offset: 0 },
    { Icon: CheckCircle2, delay: 1.2, offset: 40 },
    { Icon: PenTool, delay: 2.4, offset: 80 },
    { Icon: Folder, delay: 0.8, offset: 120 }, // Low
    { Icon: LayoutGrid, delay: 3.0, offset: 60 },
    { Icon: Sparkles, delay: 1.5, offset: -20 }, // High
    { Icon: Braces, delay: 4.0, offset: 50 },
    { Icon: Move, delay: 2.2, offset: 100 },
    { Icon: Code2, delay: 0.5, offset: 30 },
    { Icon: Copy, delay: 3.5, offset: 70 },
    { Icon: Maximize2, delay: 1.8, offset: 110 },
    { Icon: RotateCcw, delay: 2.8, offset: 40 },
    { Icon: Link2, delay: 0.0, offset: 0 },
];

const FloatingIconsSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.contentWrapper}>
                <h2 className={styles.title}>
                    Rin Antigravity is our agentic<br />
                    development platform, evolving the<br />
                    IDE into the agent-first era.
                </h2>

                <div className={styles.iconsContainer}>
                    {icons.map((item, index) => (
                        <div
                            key={index}
                            className={styles.iconWrapper}
                            style={{
                                transform: `translateY(${item.offset}px)`, // Static wave layout
                            }}
                        >
                            <div
                                className={styles.iconBubble}
                                style={{
                                    animationDelay: `${item.delay}s` // Dynamic floating timing
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
