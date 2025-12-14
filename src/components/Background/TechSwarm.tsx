import { useEffect, useRef } from 'react';

const TechSwarm = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Config
    const PARTICLE_COUNT = 80; // Enough for shapes
    const CONNECTION_DISTANCE = 100;
    const SWARM_RADIUS = 200;
    const MOUSE_SPRING = 0.05;

    // Shapes
    type ShapeFn = (i: number, total: number) => { x: number, y: number };

    const shapes: Record<string, ShapeFn> = {
        CLOUD: (_i, _total) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * SWARM_RADIUS;
            return {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            };
        },
        RING: (i, total) => {
            const angle = (i / total) * Math.PI * 2;
            return {
                x: Math.cos(angle) * SWARM_RADIUS,
                y: Math.sin(angle) * SWARM_RADIUS
            };
        },
        INFINITY: (i, total) => {
            const angle = (i / total) * Math.PI * 2;
            return {
                x: Math.cos(angle) * SWARM_RADIUS,
                y: Math.sin(angle * 2) * (SWARM_RADIUS / 2)
            };
        },
        STAR: (i, total) => {
            const angle = (i / total) * Math.PI * 2;
            // Astroid shape
            return {
                x: Math.pow(Math.cos(angle), 3) * SWARM_RADIUS,
                y: Math.pow(Math.sin(angle), 3) * SWARM_RADIUS
            };
        }
    };

    const shapeKeys = Object.keys(shapes);

    // State
    const particles = useRef<{
        x: number;
        y: number;
        targetX: number; // Target relative pos
        targetY: number;
        baseX: number; // Current relative pos
        baseY: number;
        vx: number;
        vy: number;
    }[]>([]);

    const swarmCenter = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const currentShapeIndex = useRef(0);
    const lastShapeChange = useRef(0);

    const reconfigure = () => {
        const shapeName = shapeKeys[currentShapeIndex.current];
        const shapeFn = shapes[shapeName];

        particles.current.forEach((p, i) => {
            const pos = shapeFn(i, particles.current.length);
            p.targetX = pos.x;
            p.targetY = pos.y;
        });

        // Next shape
        currentShapeIndex.current = (currentShapeIndex.current + 1) % shapeKeys.length;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Init Particles
        if (particles.current.length === 0) {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.current.push({
                    x: 0,
                    y: 0,
                    targetX: 0,
                    targetY: 0,
                    baseX: 0,
                    baseY: 0,
                    vx: 0,
                    vy: 0
                });
            }
            reconfigure(); // Initial shape
        }

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        const animate = (time: number) => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Shape Cycle
            if (time - lastShapeChange.current > 3500) { // Every 3.5s
                reconfigure();
                lastShapeChange.current = time;
            }

            // 1. Move Swarm Center towards Mouse (Spring physics)
            const dx = mouse.current.x - swarmCenter.current.x;
            const dy = mouse.current.y - swarmCenter.current.y;
            swarmCenter.current.x += dx * MOUSE_SPRING;
            swarmCenter.current.y += dy * MOUSE_SPRING;

            // 2. Update and Draw Particles
            ctx.strokeStyle = 'rgba(66, 133, 244, 0.15)'; // Tech Blue lines
            ctx.fillStyle = '#4285F4'; // Tech Blue dots
            ctx.lineWidth = 1;

            particles.current.forEach((p, index) => {
                // Lerp relative position to target shape
                p.baseX += (p.targetX - p.baseX) * 0.05;
                p.baseY += (p.targetY - p.baseY) * 0.05;

                // Rotation effect (global)
                const rotationSpeed = 0.0005;
                const cos = Math.cos(rotationSpeed);
                const sin = Math.sin(rotationSpeed);
                const nx = p.baseX * cos - p.baseY * sin;
                const ny = p.baseX * sin + p.baseY * cos;
                p.baseX = nx;
                p.baseY = ny;
                // Update target too so they rotate together
                const tnx = p.targetX * cos - p.targetY * sin;
                const tny = p.targetX * sin + p.targetY * cos;
                p.targetX = tnx;
                p.targetY = tny;


                // Breather effect (expand/contract)
                const breath = 1 + Math.sin(time * 0.002) * 0.05;

                // Calculate absolute position
                const finalX = swarmCenter.current.x + p.baseX * breath;
                const finalY = swarmCenter.current.y + p.baseY * breath;

                // Smooth approach to target absolute position
                p.x += (finalX - p.x) * 0.1;
                p.y += (finalY - p.y) * 0.1;

                // Mouse Repulsion (Scatter & Dissolve)
                const dmx = p.x - mouse.current.x;
                const dmy = p.y - mouse.current.y;
                const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);
                const REPULSION_RADIUS = 180; // Slightly larger range to start fade earlier
                let dissolveFactor = 0; // 0 = normal, 1 = fully dissolved

                if (distMouse < REPULSION_RADIUS) {
                    const force = (REPULSION_RADIUS - distMouse) / REPULSION_RADIUS;
                    dissolveFactor = force; // Fade out as it gets closer

                    // Push away
                    const angle = Math.atan2(dmy, dmx);
                    const push = force * 12;
                    p.x += Math.cos(angle) * push;
                    p.y += Math.sin(angle) * push;
                }

                // Draw Dot
                ctx.beginPath();
                // Shrink based on dissolve
                const size = 1.5 * (1 - dissolveFactor * 0.5);
                ctx.arc(p.x, p.y, Math.max(0, size), 0, Math.PI * 2);

                // Fade out based on dissolve
                ctx.globalAlpha = Math.max(0, 1 - dissolveFactor);
                ctx.fill();
                ctx.globalAlpha = 1; // Reset

                // Draw Connections
                for (let j = index + 1; j < particles.current.length; j++) {
                    const p2 = particles.current[j];
                    const distSq = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;

                    if (distSq < CONNECTION_DISTANCE ** 2) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        // Opacity based on distance AND dissolve factor
                        // If one particle is dissolving, the line fades too
                        const opacity = (1 - Math.sqrt(distSq) / CONNECTION_DISTANCE) * (1 - dissolveFactor);

                        if (opacity > 0) {
                            ctx.strokeStyle = `rgba(66, 133, 244, ${opacity * 0.4})`;
                            ctx.stroke();
                        }
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                background: '#ffffff',
            }}
        />
    );
};

export default TechSwarm;
