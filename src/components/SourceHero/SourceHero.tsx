import React, { useEffect, useRef } from 'react';
import styles from './SourceHero.module.css';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

interface Shape {
    x: number;
    y: number;
    size: number;
    type: 'circle' | 'square' | 'triangle' | 'pentagon';
    color: string;
    rotation: number;
    rotationSpeed: number;
    speed: number;
}

const SourceHero: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = canvas.parentElement?.offsetHeight || 400;

        // --- System 1: Data Network (Top 60%) ---
        const PARTICLE_COUNT = 50; // Increased for better density
        const CONNECTION_DIST = 100;
        const MOUSE_DIST = 150;
        const particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000 };

        // --- System 2: Geometric Shapes (Bottom 40%) ---
        const SHAPE_COUNT = 20; // Increased count
        const SEPARATOR_RATIO = 0.6;

        const shapes: Shape[] = [];
        const colors = [
            'rgba(59, 130, 246, 0.6)',   // Blue
            'rgba(139, 92, 246, 0.6)',   // Violet
            'rgba(236, 72, 153, 0.6)',   // Pink
            'rgba(16, 185, 129, 0.6)',   // Emerald
            'rgba(245, 158, 11, 0.6)',   // Amber
            'rgba(99, 102, 241, 0.6)',   // Indigo
        ];

        // Init Particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * (height * SEPARATOR_RATIO - 10), // Strict top limit
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1
            });
        }

        // Init Shapes
        const createShape = (startRight = false): Shape => {
            const type = ['circle', 'square', 'triangle', 'pentagon'][Math.floor(Math.random() * 4)] as Shape['type'];
            const size = 20 + Math.random() * 30; // Larger shapes
            const minY = (height * SEPARATOR_RATIO) + size + 20; // Buffer below line
            const maxY = height - size - 10;

            return {
                x: startRight ? width + Math.random() * 100 : Math.random() * width,
                y: minY + Math.random() * (maxY - minY),
                size,
                type,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                speed: 0.8 + Math.random() * 1.2
            };
        };

        for (let i = 0; i < SHAPE_COUNT; i++) {
            shapes.push(createShape(false));
        }

        const onResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = canvas.parentElement?.offsetHeight || 400;
        };
        window.addEventListener('resize', onResize);

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        // Helper to draw polygon
        const drawPolygon = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number, rotation: number) => {
            ctx.beginPath();
            for (let i = 0; i < sides; i++) {
                const angle = rotation + (i * 2 * Math.PI / sides);
                const px = x + radius * Math.cos(angle);
                const py = y + radius * Math.sin(angle);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // --- Draw Network (Layer 1) ---
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > width) p.vx *= -1;
                // Strict bounce at separator with buffer
                if (p.y < 0 || p.y > height * SEPARATOR_RATIO - 10) p.vy *= -1;

                // Mouse Repulsion
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_DIST) {
                    const angle = Math.atan2(dy, dx);
                    const force = (MOUSE_DIST - dist) / MOUSE_DIST;
                    p.x -= Math.cos(angle) * force * 2;
                    p.y -= Math.sin(angle) * force * 2;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = '#94a3b8';
                ctx.fill();

                // Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (dist2 < CONNECTION_DIST) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(148, 163, 184, ${1 - dist2 / CONNECTION_DIST})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            // --- Draw Divider Line ---
            const separatorY = height * SEPARATOR_RATIO;
            ctx.beginPath();
            ctx.moveTo(0, separatorY);
            ctx.lineTo(width, separatorY);
            ctx.strokeStyle = 'rgba(203, 213, 225, 0.3)'; // Subtle slate-300
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]); // Dashed line for style
            ctx.stroke();
            ctx.setLineDash([]); // Reset dash

            // --- Draw Shapes (Layer 2) ---
            shapes.forEach((s) => {
                s.x -= s.speed;
                s.rotation += s.rotationSpeed;

                // Respawn if off screen
                if (s.x < -100) {
                    const newShape = createShape(true);
                    s.x = newShape.x;
                    s.y = newShape.y;
                    s.size = newShape.size;
                    s.type = newShape.type;
                    s.color = newShape.color;
                    s.speed = newShape.speed;
                }

                ctx.fillStyle = s.color;
                // Add blur/shadow for glass effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = s.color;

                switch (s.type) {
                    case 'square':
                        ctx.save();
                        ctx.translate(s.x, s.y);
                        ctx.rotate(s.rotation);
                        ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
                        ctx.restore();
                        break;
                    case 'circle':
                        ctx.beginPath();
                        ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                    case 'triangle':
                        drawPolygon(ctx, s.x, s.y, s.size / 1.5, 3, s.rotation);
                        ctx.fill();
                        break;
                    case 'pentagon':
                        drawPolygon(ctx, s.x, s.y, s.size / 1.5, 5, s.rotation);
                        ctx.fill();
                        break;
                }

                // Reset shadow for next frame
                ctx.shadowBlur = 0;
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', onResize);
            canvas.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <section className={styles.heroSection}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>Rins Cloud</h1>
                <p className={styles.subtitle}>This Cloud is running on my Physical Server with Proxmox VE (PVE), so dont worry, its clean :D</p>

                <button
                    className={styles.goButton}
                    onClick={() => {
                        const element = document.getElementById('source-section');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    Go
                </button>
            </div>
        </section>
    );
};

export default SourceHero;
