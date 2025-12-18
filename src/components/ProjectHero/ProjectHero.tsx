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
        const particleCount = 800; // Increased count for better shape definition
        const baseRadius = Math.min(width, height) * 0.25;

        // --- Shape Generation ---

        // Shape 1: Helix / Wave (Original)
        const shape1: Point[] = [];
        for (let i = 0; i < particleCount; i++) {
            const t = i / particleCount;
            const theta = t * Math.PI * 10;
            // Spread along X axis
            const x = (t - 0.5) * width * 1.5;
            const y = Math.sin(theta) * 100;
            const z = Math.cos(theta) * 100;
            shape1.push({ x, y, z });
        }

        // Shape 2: Sphere
        const shape2: Point[] = [];
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        for (let i = 0; i < particleCount; i++) {
            const theta = 2 * Math.PI * i / goldenRatio;
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            const x = baseRadius * Math.sin(phi) * Math.cos(theta);
            const y = baseRadius * Math.sin(phi) * Math.sin(theta);
            const z = baseRadius * Math.cos(phi);
            shape2.push({ x, y, z });
        }

        // Shape 3: Torus (Donut)
        const shape3: Point[] = [];
        for (let i = 0; i < particleCount; i++) {
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const tubeRadius = baseRadius * 0.4;
            const ringRadius = baseRadius;

            const x = (ringRadius + tubeRadius * Math.cos(v)) * Math.cos(u);
            const y = (ringRadius + tubeRadius * Math.cos(v)) * Math.sin(u);
            const z = tubeRadius * Math.sin(v);
            shape3.push({ x, y, z });
        }

        // Current particle state
        const currentParticles = shape1.map(p => ({ ...p }));

        // --- Animation Loop ---

        const render = (time: number) => {
            // 1. Calculate Scroll Progress
            // We want progress to go from 0 to 2 (since we have 3 shapes, 2 transitions)
            // progress 0 = shape 1
            // progress 1 = shape 2
            // progress 2 = shape 3
            let progress = 0;
            if (track) {
                const rect = track.getBoundingClientRect();
                // How far we've scrolled into the track. 
                // When rect.top is 0, we correspond to 0 progress.
                // When rect.bottom is window.innerHeight, we are at the end.
                const scrollableDistance = rect.height - window.innerHeight;
                const scrolled = -rect.top;

                if (scrollableDistance > 0) {
                    progress = (scrolled / scrollableDistance) * 2;
                }
            }

            // Clamp progress
            progress = Math.max(0, Math.min(2, progress));

            // 2. Interpolate
            // Determine which transition we are in
            let targetShape: Point[];
            let sourceShape: Point[];
            let localT: number; // 0 to 1 for the current transition

            if (progress < 1) {
                sourceShape = shape1;
                targetShape = shape2;
                localT = progress; // 0 -> 1
            } else {
                sourceShape = shape2;
                targetShape = shape3;
                localT = progress - 1; // 0 -> 1
            }

            // Ease the transition for smoothness
            // simple ease-in-out
            const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const easedT = ease(localT);

            // Update particles
            const rotationSpeed = time * 0.0002;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#6495ED'; // Cornflower Blue

            // Center of screen
            const cx = width / 2;
            const cy = height / 2;

            for (let i = 0; i < particleCount; i++) {
                const src = sourceShape[i];
                const dst = targetShape[i];

                // Lerp position
                let px = src.x + (dst.x - src.x) * easedT;
                let py = src.y + (dst.y - src.y) * easedT;
                let pz = src.z + (dst.z - src.z) * easedT;

                // Add some rotation to the whole object so it's not static
                // Rotate around Y axis
                const cosR = Math.cos(rotationSpeed);
                const sinR = Math.sin(rotationSpeed);

                // Simple X/Z rotation
                const xRot = px * cosR - pz * sinR;
                const zRot = pz * cosR + px * sinR;
                px = xRot;
                pz = zRot;

                // Add some "noise" wave
                py += Math.sin(time * 0.001 + px * 0.01) * 10;

                // 3D Perspective Projection
                const fov = 800;
                const scale = fov / (fov + pz + 400); // 400 is camera distance offset

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
