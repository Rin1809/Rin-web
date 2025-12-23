import { useEffect, useRef } from 'react';

const TechSwarm = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Cau hinh ngon bo re, toi uu hoa de khong bi lag 
    const PARTICLE_COUNT = 50; // Giam bot hat xuong 50, chu nhieu qua may yeu kh load dc
    const CONNECTION_DISTANCE = 90; // Giam khoang cach noi day cho do roi mat
    const SWARM_RADIUS = 200;
    const MOUSE_SPRING = 0.05;

    // Cac hinh thu quai di ma dam hat se xep thanh
    type ShapeFn = (i: number, total: number) => { x: number, y: number };

    const shapes: Record<string, ShapeFn> = {
        CLOUD: (_i, _total) => { // Hinh dam may, hay con goi la "loan xa ngau"
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * SWARM_RADIUS;
            return {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            };
        },
        RING: (i, total) => { // Hinh chiec nhan, tron nhu qua trung ga
            const angle = (i / total) * Math.PI * 2;
            return {
                x: Math.cos(angle) * SWARM_RADIUS,
                y: Math.sin(angle) * SWARM_RADIUS
            };
        },
        INFINITY: (i, total) => { // Hinh vo cuc, yeu em mai mai
            const angle = (i / total) * Math.PI * 2;
            return {
                x: Math.cos(angle) * SWARM_RADIUS,
                y: Math.sin(angle * 2) * (SWARM_RADIUS / 2)
            };
        },
        STAR: (i, total) => { // Hinh ngoi sao, lap lanh lung linh
            const angle = (i / total) * Math.PI * 2;
            // Astroid shape
            return {
                x: Math.pow(Math.cos(angle), 3) * SWARM_RADIUS,
                y: Math.pow(Math.sin(angle), 3) * SWARM_RADIUS
            };
        }
    };

    const shapeKeys = Object.keys(shapes);

    // State quan ly dam "de tu" nay
    const particles = useRef<{
        x: number;
        y: number;
        targetX: number; // Dich den (tuong lai)
        targetY: number;
        baseX: number; // Vi tri hien tai (thuc tai )
        baseY: number;
        vx: number;
        vy: number;
    }[]>([]);

    const swarmCenter = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); // Chuot o giua man hinh cho de theo doi
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

        // Chuyen sang hinh tiep theo
        currentShapeIndex.current = (currentShapeIndex.current + 1) % shapeKeys.length;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Khoi tao dam hat (de tu)
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
            reconfigure(); // Xep hinh lan dau tien
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

            // Vong lap thay doi hinh dang
            if (time - lastShapeChange.current > 3500) { // 3.5 giay doi mot lan, vua du
                reconfigure();
                lastShapeChange.current = time;
            }

            // 1. Di chuyen tam cua ca bay theo chuot (hieu ung lo xo - nhun nhay)
            const dx = mouse.current.x - swarmCenter.current.x;
            const dy = mouse.current.y - swarmCenter.current.y;
            swarmCenter.current.x += dx * MOUSE_SPRING;
            swarmCenter.current.y += dy * MOUSE_SPRING;

            // 2. Cap nhat va ve tung con "de tu"
            ctx.strokeStyle = 'rgba(252, 203, 208, 0.2)'; // Day mau hong nhat, mong manh de vo
            ctx.fillStyle = '#EF5350'; // Cham tron mau hong dam hon chut
            ctx.lineWidth = 1;

            particles.current.forEach((p, index) => {
                // Tu tu bay ve vi tri muc tieu
                p.baseX += (p.targetX - p.baseX) * 0.05;
                p.baseY += (p.targetY - p.baseY) * 0.05;

                // Hieu ung xoay ca bay (cho no ao)
                const rotationSpeed = 0.0005;
                const cos = Math.cos(rotationSpeed);
                const sin = Math.sin(rotationSpeed);
                const nx = p.baseX * cos - p.baseY * sin;
                const ny = p.baseX * sin + p.baseY * cos;
                p.baseX = nx;
                p.baseY = ny;
                // Cap nhat luon ca muc tieu de xoay theo, khong la no lac troi do
                const tnx = p.targetX * cos - p.targetY * sin;
                const tny = p.targetX * sin + p.targetY * cos;
                p.targetX = tnx;
                p.targetY = tny;


                // Hieu ung tho (phinh ra top vao) nhu dang song
                const breath = 1 + Math.sin(time * 0.002) * 0.05;

                // Calculate absolute position
                const finalX = swarmCenter.current.x + p.baseX * breath;
                const finalY = swarmCenter.current.y + p.baseY * breath;

                // Luon lo den vi tri tuyet doi cuoi cung
                p.x += (finalX - p.x) * 0.1;
                p.y += (finalY - p.y) * 0.1;

                // Xua duoi ta ma (Mouse Repulsion) - Tan ra khi chuot den gan
                const dmx = p.x - mouse.current.x;
                const dmy = p.y - mouse.current.y;
                const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);
                const REPULSION_RADIUS = 180; // Ban kinh xua duoi, hoi rong ti cho no so
                let dissolveFactor = 0; // 0 la hien nguyen hinh, 1 la tan bien vao hu vo

                if (distMouse < REPULSION_RADIUS) {
                    const force = (REPULSION_RADIUS - distMouse) / REPULSION_RADIUS;
                    dissolveFactor = force; // Cang gan cang mờ aor

                    // Day ra xa
                    const angle = Math.atan2(dmy, dmx);
                    const push = force * 12;
                    p.x += Math.cos(angle) * push;
                    p.y += Math.sin(angle) * push;
                }

                // Draw Dot
                ctx.beginPath();
                // Thu nho dan khi tan bien
                const size = 1.5 * (1 - dissolveFactor * 0.5);
                ctx.arc(p.x, p.y, Math.max(0, size), 0, Math.PI * 2);

                // Mo dan khi tan bien
                ctx.globalAlpha = Math.max(0, 1 - dissolveFactor);
                ctx.fill();
                ctx.globalAlpha = 1; // Tra lai do trong suot mac dinh khong la loan het

                // Ve duong noi - DA TOI UU (Optimized)
                // Dung khoang cach binh phuong de tinh cho nhanh, do phai can bac hai hai nao
                const maxDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

                for (let j = index + 1; j < particles.current.length; j++) {
                    const p2 = particles.current[j];
                    const distSq = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;

                    if (distSq < maxDistSq) {
                        // Toi uu: Dung ti le binh phuong thay vi can bac hai de tinh do mo
                        // Cong thuc hoi khac ty nhung ma nhanh hon boi lan
                        const distRatio = distSq / maxDistSq;
                        const opacity = (1 - distRatio) * (1 - dissolveFactor);

                        if (opacity > 0.05) { // Mo qua thi thoi khoi ve, ton dien
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(252, 203, 208, ${opacity * 0.4})`;
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
