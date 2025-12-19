import React, { useEffect, useRef } from 'react';
import styles from './ProjectHero.module.css';

interface Point {
    x: number;
    y: number;
    z: number;
    r: number;
    g: number;
    b: number;
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
        const particleCount = 2000; // Increased for planet details
        // Use Math.max to ensure it covers the width on landscape, and 0.6 for "full screen" feel
        const baseRadius = Math.max(width, height) * 0.6;

        // Helper to randomize point in sphere
        const randomSpherePoint = (radius: number) => {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = Math.cbrt(Math.random()) * radius;
            const sinPhi = Math.sin(phi);
            return {
                x: r * sinPhi * Math.cos(theta),
                y: r * sinPhi * Math.sin(theta),
                z: r * Math.cos(phi)
            };
        };

        // --- Shape Generation ---

        // Shape 0: Galaxy Spiral (Ngân Hà)
        const shape0: Point[] = [];
        const galaxyArms = 3; // Fewer arms for clarity
        const galaxyScale = baseRadius * 3.5; // HUGE scaling

        for (let i = 0; i < particleCount; i++) {
            // 1. Choose an arm
            const armIndex = i % galaxyArms;

            // 2. Exponential distance for bright center
            const distFactor = Math.random();
            // Tighter winding: 3 full turns (6PI)
            const spiralAngle = distFactor * Math.PI * 6;
            const armBaseAngle = (armIndex / galaxyArms) * Math.PI * 2;

            const angle = armBaseAngle + spiralAngle;
            const r = distFactor * galaxyScale;

            // 3. Scatter/Spread
            // Spread increases with radius, but kept tight
            const randomOffset = (Math.random() - 0.5) + (Math.random() - 0.5);
            const spread = randomOffset * (baseRadius * 0.15 + r * 0.15);

            const x = Math.cos(angle) * r + Math.cos(angle + Math.PI / 2) * spread;
            const z = Math.sin(angle) * r + Math.sin(angle + Math.PI / 2) * spread;
            const y = (Math.random() - 0.5) * (baseRadius * 0.1);

            // Colors
            let rCol = 0, gCol = 0, bCol = 0;
            if (distFactor < 0.1) {
                rCol = 255; gCol = 240; bCol = 200; // Bright Center
            } else {
                const colorRand = Math.random();
                if (colorRand > 0.5) {
                    rCol = 100 + Math.random() * 100; // Purpleish
                    gCol = 50;
                    bCol = 255;
                } else {
                    rCol = 50;
                    gCol = 100 + Math.random() * 50;
                    bCol = 255; // Blueish
                }
            }

            shape0.push({ x, y, z, r: rCol, g: gCol, b: bCol });
        }

        // Shape 1: Detailed Solar System
        const shape1: Point[] = [];
        const systemScale = baseRadius * 1.5;

        // Helper to add a planet
        const addPlanet = (
            count: number,
            orbitRadius: number,
            planetRadius: number,
            colorFn: () => { r: number, g: number, b: number },
            hasRing: boolean = false
        ) => {
            // Random angle for orbit position
            const orbitAngle = Math.random() * Math.PI * 2;
            const cx = Math.cos(orbitAngle) * orbitRadius;
            const cz = Math.sin(orbitAngle) * orbitRadius; // Orbit on XZ plane roughly

            // Planet Body
            for (let i = 0; i < count; i++) {
                const p = randomSpherePoint(planetRadius);
                const col = colorFn();
                shape1.push({
                    x: cx + p.x,
                    y: p.y, // Flat plane
                    z: cz + p.z,
                    ...col
                });
            }

            // Saturn Rings check
            if (hasRing) {
                const ringCount = 100;
                for (let j = 0; j < ringCount; j++) {
                    const angle = (j / ringCount) * Math.PI * 2;
                    const r = planetRadius * 1.5 + Math.random() * planetRadius * 0.8;
                    shape1.push({
                        x: cx + Math.cos(angle) * r,
                        y: (Math.random() - 0.5) * 5,
                        z: cz + Math.sin(angle) * r,
                        r: 180, g: 180, b: 150
                    });
                }
            }

            // Orbital Path (Trail)
            const orbitPoints = 40;
            for (let k = 0; k < orbitPoints; k++) {
                const angle = (k / orbitPoints) * Math.PI * 2;
                shape1.push({
                    x: Math.cos(angle) * orbitRadius,
                    y: 0,
                    z: Math.sin(angle) * orbitRadius,
                    r: 50, g: 50, b: 50 // Faint grey orbit line
                });
            }

            // Return center for moons etc
            return { x: cx, y: 0, z: cz };
        };

        // 1. Sun (Center)
        for (let i = 0; i < 400; i++) {
            const p = randomSpherePoint(systemScale * 0.3); // Big Sun
            shape1.push({ ...p, r: 255, g: 100 + Math.random() * 100, b: 50 });
        }

        // 2. Mercury
        addPlanet(30, systemScale * 0.3, systemScale * 0.03, () => ({ r: 150, g: 150, b: 150 }));

        // 3. Venus
        addPlanet(40, systemScale * 0.45, systemScale * 0.05, () => ({ r: 200, g: 180, b: 100 }));

        // 4. Earth + Moon
        const earthPos = addPlanet(60, systemScale * 0.65, systemScale * 0.06, () => ({
            r: Math.random() > 0.5 ? 50 : 255,
            g: Math.random() > 0.5 ? 200 : 255,
            b: 255
        }));
        // Moon
        for (let i = 0; i < 15; i++) {
            const p = randomSpherePoint(systemScale * 0.01);
            shape1.push({
                x: earthPos.x + systemScale * 0.07 + p.x,
                y: p.y,
                z: earthPos.z + p.z,
                r: 200, g: 200, b: 200
            });
        }

        // 5. Mars
        addPlanet(50, systemScale * 0.85, systemScale * 0.05, () => ({ r: 255, g: 100, b: 100 }));

        // 6. Jupiter
        addPlanet(150, systemScale * 1.3, systemScale * 0.15, () => ({ r: 200, g: 150, b: 100 }));

        // 7. Saturn + Rings
        addPlanet(120, systemScale * 1.8, systemScale * 0.12, () => ({ r: 220, g: 200, b: 100 }), true);

        // Fill remaining particle slots if any with random stars
        while (shape1.length < particleCount) {
            const angle = Math.random() * Math.PI * 2;
            const dist = systemScale * 0.2 + Math.random() * systemScale * 1.5;
            shape1.push({
                x: Math.cos(angle) * dist,
                y: (Math.random() - 0.5) * 500, // Background stars
                z: Math.sin(angle) * dist,
                r: 255, g: 255, b: 255
            });
        }

        // Shape 2: Earth & Moon
        const shape2: Point[] = [];
        for (let i = 0; i < particleCount; i++) {
            if (i < 1000) {
                // Earth Sphere (Ocean + Landish noise)
                const p = randomSpherePoint(baseRadius);
                // Simple noise for land/sea color
                const noise = Math.sin(p.x * 0.02) + Math.cos(p.y * 0.02) + Math.sin(p.z * 0.02);
                const isLand = noise > 0.5;

                shape2.push({
                    ...p,
                    r: isLand ? 50 : 30,
                    g: isLand ? 150 : 100,
                    b: isLand ? 50 : 255 // Green-ish vs Blue
                });
            } else {
                // Moon (Orbiting)
                const p = randomSpherePoint(baseRadius * 0.25);
                shape2.push({
                    x: p.x + baseRadius * 1.6, // Offset to right
                    y: p.y,
                    z: p.z,
                    r: 200, g: 200, b: 200 // Grey
                });
            }
        }

        // Shape 3: Earth Core (Split View)
        const shape3: Point[] = [];
        for (let i = 0; i < particleCount; i++) {
            if (i < 300) {
                // The Core (Inner dense sphere) -> Reuse "Sun" particles ideally, but mapping is direct index
                // Indexes 0-300 were Sun in Shape1. Let's make them the Core here.
                const p = randomSpherePoint(baseRadius * 0.5);
                shape3.push({
                    ...p,
                    r: 255, g: 50, b: 50 // Glowing Red Core
                });
            } else if (i < 1000) {
                // Mantle/Crust (Split)
                // We reuse Earth particles (Shape 2 indexes 300-1000 were part of Earth)
                const p = shape2[i]; // Copy Earth position relative to center
                // Logic: Move Left hemisphere Left, Right hemisphere Right
                const splitDist = baseRadius * 1.2; // Wider split
                const direction = p.x > 0 ? 1 : -1;

                shape3.push({
                    x: p.x + direction * splitDist,
                    y: p.y,
                    z: p.z,
                    r: 40, g: 30, b: 30 // Darker inner rock
                });
            } else {
                // Moon (Stays roughly same or moves away)
                const p = shape2[i];
                shape3.push({
                    x: p.x + 100, // Drift away
                    y: p.y - 100,
                    z: p.z,
                    r: 100, g: 100, b: 100 // Fading moon
                });
            }
        }

        // --- Animation Loop ---

        const render = (time: number) => {
            // 1. Calculate Raw Scroll Progress
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

            // 2. Define Phases with HOLD times (4 Phases)
            // 0.00 - 0.15: Galaxy
            // 0.15 - 0.35: -> Solar
            // 0.35 - 0.50: Solar
            // 0.50 - 0.65: -> Earth
            // 0.65 - 0.75: Earth
            // 0.75 - 0.90: -> Core
            // 0.90 - 1.00: Core

            let sourceShape = shape0;
            let targetShape = shape0;
            let mixFactor = 0; // 0 = source, 1 = target

            if (rawProgress < 0.15) {
                // Phase 0: Galaxy
                sourceShape = shape0;
                targetShape = shape0;
                mixFactor = 0;
            } else if (rawProgress < 0.35) {
                // Morph Galaxy -> Solar
                sourceShape = shape0;
                targetShape = shape1;
                mixFactor = (rawProgress - 0.15) / 0.20;
            } else if (rawProgress < 0.50) {
                // Phase 1: Solar
                sourceShape = shape1;
                targetShape = shape1;
                mixFactor = 0;
            } else if (rawProgress < 0.65) {
                // Morph Solar -> Earth
                sourceShape = shape1;
                targetShape = shape2;
                mixFactor = (rawProgress - 0.50) / 0.15;
            } else if (rawProgress < 0.75) {
                // Phase 2: Earth
                sourceShape = shape2;
                targetShape = shape2;
                mixFactor = 0;
            } else if (rawProgress < 0.90) {
                // Morph Earth -> Core
                sourceShape = shape2;
                targetShape = shape3;
                mixFactor = (rawProgress - 0.75) / 0.15;
            } else {
                // Phase 3: Core
                sourceShape = shape3;
                targetShape = shape3;
                mixFactor = 0;
            }

            // Ease
            const ease = (t: number) => t * t * (3 - 2 * t);
            const easedT = ease(mixFactor);

            // Update particles
            const rotationSpeed = time * 0.0001;

            ctx.clearRect(0, 0, width, height);

            // Background is white in CSS, no fillRect needed unless we want dark mode
            // Assuming white background based on CSS.
            // But particles are colored/light. Let's see. 
            // If background is white, 'Starry white' (200,200,255) won't show well.
            // Adjusting Solar System debris to be darker: 100, 100, 150

            const cx = width / 2;
            const cy = height / 2;

            for (let i = 0; i < particleCount; i++) {
                const src = sourceShape[i];
                const dst = targetShape[i];

                // Lerp Position
                let px = src.x + (dst.x - src.x) * easedT;
                let py = src.y + (dst.y - src.y) * easedT;
                let pz = src.z + (dst.z - src.z) * easedT;

                // Lerp Color
                const r = Math.round(src.r + (dst.r - src.r) * easedT);
                const g = Math.round(src.g + (dst.g - src.g) * easedT);
                const b = Math.round(src.b + (dst.b - src.b) * easedT);

                // Rotate Camera/World
                const cosR = Math.cos(rotationSpeed);
                const sinR = Math.sin(rotationSpeed);

                // 1. Y-axis rotation (Spin)
                let xNew = px * cosR - pz * sinR;
                let zNew = pz * cosR + px * sinR;
                let yNew = py;

                // 2. X-axis rotation (Tilt) - ~30 degrees
                const tilt = 0.5; // radians
                const cosT = Math.cos(tilt);
                const sinT = Math.sin(tilt);

                let yTilted = yNew * cosT - zNew * sinT;
                let zTilted = yNew * sinT + zNew * cosT;

                px = xNew;
                py = yTilted;
                pz = zTilted;

                // 3D Projection
                const fov = 2000;
                // Dynamic camera offset to ensure large shapes don't clip (safely fully viewable)
                // Max radius is approx 3.0 * baseRadius (debris). Let's use 4.0 * baseRadius + fov buffer.
                const cameraZ = baseRadius * 4 + 2000;

                const scale = fov / (fov + pz + cameraZ);

                const x2d = cx + px * scale;
                const y2d = cy + py * scale;
                const size = Math.max(1.5, 6 * scale);

                // Draw
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
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
                    <h1 className={styles.title}>Project</h1>
                    <p className={styles.description}>
                        This is place i show what i builded. Just some trash project, but i learned a lot from it - my trash. :)
                    </p>

                    <button
                        className={styles.actionButton}
                        onClick={() => {
                            const section = document.getElementById('latest-projects');
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        View Projects
                    </button>


                </div>
            </div>
        </div>
    );
};

export default ProjectHero;
