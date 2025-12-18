import React, { useEffect, useRef } from 'react';
import styles from './ProjectHero.module.css';

interface Point {
    x: number;
    y: number;
    z: number;
}

const ProjectHero: React.FC = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const track = trackRef.current;
        if (!canvas || !track) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let animationFrameId: number;

        // --- Configuration ---
        const particleCount = 1000;
        // Increased base radius significantly to fill screen (0.25 -> 0.45)
        const baseRadius = Math.min(width, height) * 0.45;

        // --- Shape Generation ---

        // Shape 1: Helix / Wave (Original)
        const shape1: Point[] = [];
        for (let i = 0; i < particleCount; i++) {
            const t = i / particleCount;
            const theta = t * Math.PI * 10;
            // Spread along X axis - wider for full screen feel
            const x = (t - 0.5) * width * 1.8;
            const y = Math.sin(theta) * 150; // Taller wave
            const z = Math.cos(theta) * 150;
            shape1.push({ x, y, z });
        }

        // Shape 2: Sphere
        const shape2: Point[] = [];
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        for (let i = 0; i < particleCount; i++) {
            const theta = 2 * Math.PI * i / goldenRatio;
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            // Slightly scale up sphere
            const x = baseRadius * 1.2 * Math.sin(phi) * Math.cos(theta);
            const y = baseRadius * 1.2 * Math.sin(phi) * Math.sin(theta);
            const z = baseRadius * 1.2 * Math.cos(phi);
            shape2.push({ x, y, z });
        }

        // Shape 3: Torus (Donut)
        const shape3: Point[] = [];
        for (let i = 0; i < particleCount; i++) {
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const tubeRadius = baseRadius * 0.5; // Thicker tube
            const ringRadius = baseRadius * 1.0;

            const x = (ringRadius + tubeRadius * Math.cos(v)) * Math.cos(u);
            const y = (ringRadius + tubeRadius * Math.cos(v)) * Math.sin(u);
            const z = tubeRadius * Math.sin(v);
            shape3.push({ x, y, z });
        }

        // Current particle state
        const currentParticles = shape1.map(p => ({ ...p }));

        // --- Animation Loop ---

        const render = (time: number) => {
            // 1. Calculate Raw Scroll Progress (0 to 1) based on track height
            let rawProgress = 0;
            if (track) {
                const rect = track.getBoundingClientRect();
                const scrollableDistance = rect.height - window.innerHeight;
                const scrolled = -rect.top;

                if (scrollableDistance > 0) {
                    rawProgress = scrolled / scrollableDistance;
                }
            }

            // Clamp
            rawProgress = Math.max(0, Math.min(1, rawProgress));

            // 2. Define Phases with HOLD times
            // 0.0 - 0.2: Hold Shape 1
            // 0.2 - 0.4: Morph 1 -> 2
            // 0.4 - 0.7: Hold Shape 2
            // 0.7 - 0.9: Morph 2 -> 3
            // 0.9 - 1.0: Hold Shape 3

            let sourceShape = shape1;
            let targetShape = shape1;
            let mixFactor = 0; // 0 = source, 1 = target

            if (rawProgress < 0.2) {
                // Phase 1: Hold Helix
                sourceShape = shape1;
                targetShape = shape1;
                mixFactor = 0;
            } else if (rawProgress < 0.4) {
                // Phase 2: Morph Helix -> Sphere
                sourceShape = shape1;
                targetShape = shape2;
                mixFactor = (rawProgress - 0.2) / 0.2; // 0..1
            } else if (rawProgress < 0.7) {
                // Phase 3: Hold Sphere
                sourceShape = shape2;
                targetShape = shape2;
                mixFactor = 0;
            } else if (rawProgress < 0.9) {
                // Phase 4: Morph Sphere -> Torus
                sourceShape = shape2;
                targetShape = shape3;
                mixFactor = (rawProgress - 0.7) / 0.2; // 0..1
            } else {
                // Phase 5: Hold Torus
                sourceShape = shape3;
                targetShape = shape3;
                mixFactor = 0;
            }

            // Smoothstep ease
            const ease = (t: number) => t * t * (3 - 2 * t);
            const easedT = ease(mixFactor);

            // Update particles
            const rotationSpeed = time * 0.0002;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#6495ED'; // Cornflower Blue

            const cx = width / 2;
            const cy = height / 2;

            for (let i = 0; i < particleCount; i++) {
                const src = sourceShape[i];
                const dst = targetShape[i];

                // Lerp position
                let px = src.x + (dst.x - src.x) * easedT;
                let py = src.y + (dst.y - src.y) * easedT;
                let pz = src.z + (dst.z - src.z) * easedT;

                // Rotate around Y axis
                const cosR = Math.cos(rotationSpeed);
                const sinR = Math.sin(rotationSpeed);

                const xRot = px * cosR - pz * sinR;
                const zRot = pz * cosR + px * sinR;
                px = xRot;
                pz = zRot;

                // Add "noise" wave
                py += Math.sin(time * 0.001 + px * 0.01) * 10;

                // 3D Perspective Projection
                const fov = 800;
                const scale = fov / (fov + pz + 400);

                const x2d = cx + px * scale;
                const y2d = cy + py * scale;
                const size = Math.max(0.5, 2 * scale);

                // Draw
                ctx.globalAlpha = 0.6 + Math.sin(i + time * 0.002) * 0.3; // Twinkle
                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        render(0);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={trackRef} className={styles.scrollTrack}>
            <div className={styles.heroStickyContainer}>
                <canvas ref={canvasRef} className={styles.canvas} />

                <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>Fullstack</h1>
                    <p className={styles.description}>
                        Antigravity's Agents place an emphasis on verification, communicating to users via Artifacts and tasks to tackle more complex challenges and build user trust in their code.
                    </p>

                    <button className={styles.actionButton}>
                        Explore use case
                    </button>

                    <div className={styles.chipsContainer}>
                        <div className={styles.chip}>
                            <svg className={styles.chipIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                            Professional
                        </div>
                        <div className={styles.chip}>
                            <svg className={styles.chipIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="16 18 22 12 16 6"></polyline>
                                <polyline points="8 6 2 12 8 18"></polyline>
                            </svg>
                            Frontend
                        </div>
                        <div className={`${styles.chip} ${styles.chipActive}`}>
                            <svg className={styles.chipIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                            Fullstack
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectHero;
