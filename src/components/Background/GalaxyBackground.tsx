import { useEffect, useRef } from 'react';

const GalaxyBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Cau hinh vu tru 
    const PARTICLE_COUNT = 2000; // Nhieu hat qua thi lag, it qua thi trong hoi pheng
    const GALAXY_ARMS = 3;
    const MOUSE_REPULSION_RADIUS = 100;
    const MOUSE_PUSH_FORCE = 15;

    // Dinh nghia kieu du lieu
    interface Particle {
        x: number;      // Current 2D drawing position (with interaction)
        y: number;
        baseX3D: number; // Base 3D position in Galaxy
        baseY3D: number;
        baseZ3D: number;
        r: number;
        g: number;
        b: number;
        size: number;
    }

    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: -1000, y: -1000 }); // Gia bo chuot o xa tit mu khoi de khoi bi xao dong

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Khoi tao Ngan Ha (Galaxy) 
        if (particles.current.length === 0) {
            // Base radius hoi to ti cho no dep
            const baseRadius = Math.max(width, height) * 0.6;
            const galaxyScale = baseRadius * 3.5;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                // Copy logic tao hinh xoan oc tu cai ProjectHero qua
                const armIndex = i % GALAXY_ARMS;
                const distFactor = Math.random();

                // Xoay xoay xoay xoay
                const spiralAngle = distFactor * Math.PI * 6;
                const armBaseAngle = (armIndex / GALAXY_ARMS) * Math.PI * 2;

                const angle = armBaseAngle + spiralAngle;
                const r = distFactor * galaxyScale;

                // Lam roi tung len mot ty cho tu nhien
                const randomOffset = (Math.random() - 0.5) + (Math.random() - 0.5);
                const spread = randomOffset * (baseRadius * 0.15 + r * 0.15);

                const x3d = Math.cos(angle) * r + Math.cos(angle + Math.PI / 2) * spread;
                const z3d = Math.sin(angle) * r + Math.sin(angle + Math.PI / 2) * spread;
                const y3d = (Math.random() - 0.5) * (baseRadius * 0.1);

                // Mau me hoa la he
                let rCol, gCol, bCol;
                if (distFactor < 0.1) {
                    // Tam diem ruc ro
                    rCol = 242; gCol = 39; bCol = 78;
                } else {
                    // Mau hong chu dao, nhin cho no dep
                    const v = (Math.random() - 0.5) * 30;
                    rCol = 252 + v;
                    gCol = 185 + v;
                    bCol = 198 + v;
                }

                particles.current.push({
                    x: 0,
                    y: 0,
                    baseX3D: x3d,
                    baseY3D: y3d,
                    baseZ3D: z3d,
                    r: rCol,
                    g: gCol,
                    b: bCol,
                    size: Math.random() * 2 + 0.5
                });
            }
        }

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);

        const onMouseMove = (e: MouseEvent) => {
            // Tinh ca cai scroll cua trinh duyet nua 
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY + window.scrollY;
        };
        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId: number;

        const render = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            const rotationSpeed = time * 0.0001;
            const cx = width / 2;
            const cy = height / 2;

            // Goc nhin camera
            const fov = 2000;
            const tilt = 0.5; // Radians, standard pleasant tilt
            const cosT = Math.cos(tilt);
            const sinT = Math.sin(tilt);
            const cosR = Math.cos(rotationSpeed);
            const sinR = Math.sin(rotationSpeed);

            // Dat camera xa xa ti moi thay het duoc
            const baseRadius = Math.max(width, height) * 0.6;
            const cameraZ = baseRadius * 4 + 2000;

            particles.current.forEach(p => {
                // 1. Quay 3D
                // Truc Y
                let x1 = p.baseX3D * cosR - p.baseZ3D * sinR;
                let z1 = p.baseZ3D * cosR + p.baseX3D * sinR;
                let y1 = p.baseY3D;

                // Truc X (nghieng nghieng)
                let y2 = y1 * cosT - z1 * sinT;
                let z2 = y1 * sinT + z1 * cosT;

                // 2. Chieu tu 3D xuong 2D de ve len man hinh
                // Phep chieu phoi canh
                const scale = fov / (fov + z2 + cameraZ);
                const targetX = cx + x1 * scale;
                const targetY = cy + y2 * scale;

                // 3. Tuong tac (Ne chuot ra)
                // Hat nao gan chuot qua thi bi day ra, giong nhu nam cham cung cuc vay

                // Tinh luc day
                const dx = targetX - mouse.current.x;
                const dy = targetY - mouse.current.y;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                let offsetX = 0;
                let offsetY = 0;

                if (dist < MOUSE_REPULSION_RADIUS) {
                    const force = (MOUSE_REPULSION_RADIUS - dist) / MOUSE_REPULSION_RADIUS;
                    const angle = Math.atan2(dy, dx);
                    const push = force * MOUSE_PUSH_FORCE;

                    // Day no di cho khac

                    // Cach don gian nhat: Vi tri moi = Vi tri cu + Luc day
                    offsetX = Math.cos(angle) * push * 20; // 20 multiplier to make it noticeable
                    offsetY = Math.sin(angle) * push * 20;
                }

                const finalTargetX = targetX + offsetX;
                const finalTargetY = targetY + offsetY;

                // Chuyen dong muot ma (Linear Interpolation)
                p.x += (finalTargetX - p.x) * 0.1;
                p.y += (finalTargetY - p.y) * 0.1;

                // Ve thoi, cho gi nua
                // To nho tuy thuoc vao xa gan
                const size = Math.max(1.5, 6 * scale);
                ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render(0);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', // Scroll theo page chu khong dung im, cai nay quan trong nha
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh', // Chi can phu kin man hinh luc dau thoi 
                pointerEvents: 'none',
                zIndex: -1,
                background: '#ffffff', // Nen trang tinh khoi
            }}
        />
    );
};

export default GalaxyBackground;
