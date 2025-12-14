import { useEffect, useRef } from 'react';

const CursorTrail = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<{ x: number; y: number; size: number; life: number; color: string }[]>([]);
    const cursor = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const onMouseMove = (e: MouseEvent) => {
            cursor.current.x = e.clientX;
            cursor.current.y = e.clientY;

            // Add new particles on move
            for (let i = 0; i < 2; i++) {
                particles.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 5,
                    y: e.clientY + (Math.random() - 0.5) * 5,
                    size: Math.random() * 3 + 1,
                    life: 1,
                    // Brand colors or neutral
                    color: `rgba(66, 133, 244, ${Math.random() * 0.5 + 0.2})`
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];
                p.life -= 0.02; // Fade out speed
                p.x += (Math.random() - 0.5) * 1; // Slight drift
                p.y += (Math.random() - 0.5) * 1;

                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = p.color; // Already has opacity
                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

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
                zIndex: 9999,
            }}
        />
    );
};

export default CursorTrail;
