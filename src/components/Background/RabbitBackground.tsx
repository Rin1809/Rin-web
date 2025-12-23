import { useEffect, useRef } from 'react';

const RabbitBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Cau hinh con tho

    const MOUSE_REPULSION_RADIUS = 100;
    const MOUSE_PUSH_FORCE = 15;


    interface Particle {
        x: number;
        y: number;
        baseX3D: number;
        baseY3D: number;
        baseZ3D: number;
        r: number;
        g: number;
        b: number;
        size: number;
    }

    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Khoi tao cac hat de ve con tho (magic)
        if (particles.current.length === 0) {
            const sizeScale = Math.min(width, height) * 0.22;

            const randomPointInEllipsoid = (rx: number, ry: number, rz: number, cx: number, cy: number, cz: number) => {
                const u = Math.random();
                const v = Math.random();
                const theta = 2 * Math.PI * u;
                const phi = Math.acos(2 * v - 1);
                const r = Math.cbrt(Math.random());
                const sinPhi = Math.sin(phi);
                return {
                    x: cx + r * rx * sinPhi * Math.cos(theta),
                    y: cy + r * ry * sinPhi * Math.sin(theta),
                    z: cz + r * rz * Math.cos(phi)
                };
            };

            // Ti le con tho, hoi ao ma mot chut nhung nhin cung giong
            const shapes = [
                // Cai minh tron ung
                { count: 800, rx: 1.2, ry: 1.0, rz: 1.0, cx: 0, cy: 0.8, cz: 0 },
                // Phan co noi tiep, cho no muot
                { count: 200, rx: 0.7, ry: 0.6, rz: 0.7, cx: 0, cy: -0.2, cz: 0.2 },

                // Cai dau nho xiu nam tren co
                { count: 500, rx: 0.6, ry: 0.55, rz: 0.6, cx: 0, cy: -0.8, cz: 0.2 },
                // Cai mui xinh xinh
                { count: 100, rx: 0.25, ry: 0.2, rz: 0.3, cx: 0, cy: -0.8, cz: 0.8 },

                // Doi tai dai ngoang
                // Left Ear
                { count: 200, rx: 0.15, ry: 0.9, rz: 0.15, cx: -0.3, cy: -2.0, cz: 0, tiltZ: 0.1, tiltX: 0.1 },
                // Right Ear
                { count: 200, rx: 0.15, ry: 0.9, rz: 0.15, cx: 0.3, cy: -2.0, cz: 0, tiltZ: -0.1, tiltX: 0.1 },

                // Cai duoi cut ngun 
                { count: 80, rx: 0.2, ry: 0.2, rz: 0.2, cx: 0, cy: 1.6, cz: -0.8 },
            ];

            shapes.forEach(shape => {
                for (let i = 0; i < shape.count; i++) {
                    let p = randomPointInEllipsoid(
                        shape.rx * sizeScale,
                        shape.ry * sizeScale,
                        shape.rz * sizeScale,
                        shape.cx * sizeScale,
                        shape.cy * sizeScale,
                        shape.cz * sizeScale
                    );

                    // Nghieng dau lam dang ty nao
                    if (shape.tiltZ || shape.tiltX) {
                        const lx = p.x - (shape.cx * sizeScale);
                        const ly = p.y - (shape.cy * sizeScale);
                        const lz = p.z - (shape.cz * sizeScale);

                        let nx = lx, ny = ly, nz = lz;

                        // Xoay chong chong
                        if (shape.tiltZ) {
                            const c = Math.cos(shape.tiltZ);
                            const s = Math.sin(shape.tiltZ);
                            const tx = nx * c - ny * s;
                            const ty = nx * s + ny * c;
                            nx = tx; ny = ty;
                        }
                        // Gat gu gat gu
                        if (shape.tiltX) {
                            const c = Math.cos(shape.tiltX);
                            const s = Math.sin(shape.tiltX);
                            const ty = ny * c - nz * s;
                            const tz = ny * s + nz * c;
                            ny = ty; nz = tz;
                        }

                        p.x = nx + (shape.cx * sizeScale);
                        p.y = ny + (shape.cy * sizeScale);
                        p.z = nz + (shape.cz * sizeScale);
                    }


                    // Mau long tho

                    let rCol, gCol, bCol;
                    const isEar = shape.cy < -1.5; // Rough check for ears
                    const isEyeArea = shape.cz > 0.6 && shape.cy < -0.6; // Front of face

                    // Highlight random cho tai va mat them sinh dong
                    let isPink = false;

                    if (isEar && p.x * (shape.cx > 0 ? 1 : -1) > 0 && Math.random() > 0.6) {
                        // Mat trong tai thi cho mau hong phan
                        isPink = true;
                    }
                    if (isEyeArea && Math.random() > 0.95) {
                        isPink = true;
                    }

                    if (isPink) {
                        // Hong dam nhat 
                        if (Math.random() > 0.5) {
                            rCol = 242; gCol = 39; bCol = 78;
                        } else {
                            rCol = 252; gCol = 185; bCol = 198;
                        }
                    } else {
                        // Long trang muot ma
                        const v = Math.random() * 20;
                        rCol = 235 + v;
                        gCol = 235 + v;
                        bCol = 235 + v;
                    }

                    particles.current.push({
                        x: 0,
                        y: 0,
                        baseX3D: p.x,
                        baseY3D: p.y,
                        baseZ3D: p.z,
                        r: rCol,
                        g: gCol,
                        b: bCol,
                        size: Math.random() * 2 + 1
                    });
                }
            });
        }

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY + window.scrollY;
        };
        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId: number;

        const render = (time: number) => {
            ctx.clearRect(0, 0, width, height);


            const cx = width / 2;
            const cy = height / 2;

            const fov = 1000;
            const cameraZ = 1200;

            // Lac lu cai dau cho no sinh dong
            const rotY = Math.sin(time * 0.0005) * 0.3; // Swing left/right

            const cosR = Math.cos(rotY);
            const sinR = Math.sin(rotY);

            particles.current.forEach(p => {
                // 1. Xoay 3D (quay deu quay deu)
                let x1 = p.baseX3D * cosR - p.baseZ3D * sinR;
                let z1 = p.baseZ3D * cosR + p.baseX3D * sinR;
                let y1 = p.baseY3D;

                // 2. Chieu len man hinh 2D
                const scale = fov / (fov + z1 + cameraZ);
                const targetX = cx + x1 * scale;
                const targetY = cy + y1 * scale;

                // 3. Tuong tac voi chuot (ne ne ra)
                const dx = targetX - mouse.current.x;
                const dy = targetY - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let offsetX = 0;
                let offsetY = 0;

                if (dist < MOUSE_REPULSION_RADIUS) {
                    const force = (MOUSE_REPULSION_RADIUS - dist) / MOUSE_REPULSION_RADIUS;
                    const angle = Math.atan2(dy, dx);
                    const push = force * MOUSE_PUSH_FORCE;
                    offsetX = Math.cos(angle) * push * 20;
                    offsetY = Math.sin(angle) * push * 20;
                }

                const finalTargetX = targetX + offsetX;
                const finalTargetY = targetY + offsetY;

                p.x += (finalTargetX - p.x) * 0.1;
                p.y += (finalTargetY - p.y) * 0.1;

                // Ve thoi
                const size = Math.max(0.1, p.size * scale);
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
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: -1,
                background: '#ffffff',
            }}
        />
    );
};

export default RabbitBackground;
