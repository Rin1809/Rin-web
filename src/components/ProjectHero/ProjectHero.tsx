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

        // --- Cau hinh ---
        const particleCount = 2000; // Tang len ti cho hanh tinh no chi tiet
        // Dung Math.max de dam bao no bao phu het man hinh, 0.6 la ti le vang (chem gio day)
        const baseRadius = Math.max(width, height) * 0.6;

        // Ham random diem trong hinh cau (Hoc toan roi cung co luc dung)
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

        // --- Tao hinh khoi ---

        // Shape 0: Ngan Ha (Spiral Galaxy) - Dep me hon
        const shape0: Point[] = [];
        const galaxyArms = 3; // 3 canh tay xoan oc la vua dep
        const galaxyScale = baseRadius * 3.5; // Phong to het co

        for (let i = 0; i < particleCount; i++) {
            // 1. Chon canh tay de nhet hat vao
            const armIndex = i % galaxyArms;

            // 2. Cang vao gan tam cang sang (phan bo mu)
            const distFactor = Math.random();
            // Xoan tit tho lo: 3 vong (6PI)
            const spiralAngle = distFactor * Math.PI * 6;
            const armBaseAngle = (armIndex / galaxyArms) * Math.PI * 2;

            const angle = armBaseAngle + spiralAngle;
            const r = distFactor * galaxyScale;

            // 3. Lam roi doi hinh (Scatter)
            // Cang ra xa cang roi loan, doi ma
            const randomOffset = (Math.random() - 0.5) + (Math.random() - 0.5);
            const spread = randomOffset * (baseRadius * 0.15 + r * 0.15);

            const x = Math.cos(angle) * r + Math.cos(angle + Math.PI / 2) * spread;
            const z = Math.sin(angle) * r + Math.sin(angle + Math.PI / 2) * spread;
            const y = (Math.random() - 0.5) * (baseRadius * 0.1);

            // Mau sac (To mau cho cuoc song)
            let rCol = 0, gCol = 0, bCol = 0;
            if (distFactor < 0.1) {
                rCol = 255; gCol = 240; bCol = 200; // Tam sang nhu mat troi chan ly
            } else {
                const colorRand = Math.random();
                if (colorRand > 0.5) {
                    rCol = 100 + Math.random() * 100; // Tim tim mong mo
                    gCol = 50;
                    bCol = 255;
                } else {
                    rCol = 50;
                    gCol = 100 + Math.random() * 50;
                    bCol = 255; // Xanh xanh hy vong
                }
            }

            shape0.push({ x, y, z, r: rCol, g: gCol, b: bCol });
        }

        // Shape 1: He Mat Troi (Solar System) - Chi tiet den tung hat bui
        const shape1: Point[] = [];
        const systemScale = baseRadius * 1.5;

        // Ham them hanh tinh (God mode)
        const addPlanet = (
            count: number,
            orbitRadius: number,
            planetRadius: number,
            colorFn: () => { r: number, g: number, b: number },
            hasRing: boolean = false
        ) => {
            // Goc quy dao random (cho no tu nhien)
            const orbitAngle = Math.random() * Math.PI * 2;
            const cx = Math.cos(orbitAngle) * orbitRadius;
            const cz = Math.sin(orbitAngle) * orbitRadius; // Quy dao tren mat phang XZ la chu yeu

            // Than hanh tinh
            for (let i = 0; i < count; i++) {
                const p = randomSpherePoint(planetRadius);
                const col = colorFn();
                shape1.push({
                    x: cx + p.x,
                    y: p.y, // Det det thoi
                    z: cz + p.z,
                    ...col
                });
            }

            // Check xem co phai Sao Tho khong de ve cai vanh
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

            // Duong quy dao (vach ke duong)
            const orbitPoints = 40;
            for (let k = 0; k < orbitPoints; k++) {
                const angle = (k / orbitPoints) * Math.PI * 2;
                shape1.push({
                    x: Math.cos(angle) * orbitRadius,
                    y: 0,
                    z: Math.sin(angle) * orbitRadius,
                    r: 50, g: 50, b: 50 // Duong mo mo ao ao
                });
            }

            // Tra ve tam de con ve mat trang (neu co)
            return { x: cx, y: 0, z: cz };
        };

        // 1. Mat troi (Big Boss)
        for (let i = 0; i < 400; i++) {
            const p = randomSpherePoint(systemScale * 0.3); // Mat troi to dung
            shape1.push({ ...p, r: 255, g: 100 + Math.random() * 100, b: 50 });
        }

        // 2. Sao Thuy
        addPlanet(30, systemScale * 0.3, systemScale * 0.03, () => ({ r: 150, g: 150, b: 150 }));

        // 3. Sao Kim
        addPlanet(40, systemScale * 0.45, systemScale * 0.05, () => ({ r: 200, g: 180, b: 100 }));

        // 4. Trai Dat + Mat Trang (Que huong)
        const earthPos = addPlanet(60, systemScale * 0.65, systemScale * 0.06, () => ({
            r: Math.random() > 0.5 ? 50 : 255,
            g: Math.random() > 0.5 ? 200 : 255,
            b: 255
        }));
        // Mat Trang (Chi Hang)
        for (let i = 0; i < 15; i++) {
            const p = randomSpherePoint(systemScale * 0.01);
            shape1.push({
                x: earthPos.x + systemScale * 0.07 + p.x,
                y: p.y,
                z: earthPos.z + p.z,
                r: 200, g: 200, b: 200
            });
        }

        // 5. Sao Hoa (Elon Musk thich dieu nay)
        addPlanet(50, systemScale * 0.85, systemScale * 0.05, () => ({ r: 255, g: 100, b: 100 }));

        // 6. Sao Moc
        addPlanet(150, systemScale * 1.3, systemScale * 0.15, () => ({ r: 200, g: 150, b: 100 }));

        // 7. Sao Tho + Vanh dai (Dac san)
        addPlanet(120, systemScale * 1.8, systemScale * 0.12, () => ({ r: 220, g: 200, b: 100 }), true);

        // Con thua hat nao thi lam sao nen cho lap lanh
        while (shape1.length < particleCount) {
            const angle = Math.random() * Math.PI * 2;
            const dist = systemScale * 0.2 + Math.random() * systemScale * 1.5;
            shape1.push({
                x: Math.cos(angle) * dist,
                y: (Math.random() - 0.5) * 500, // Background star o xa xa
                z: Math.sin(angle) * dist,
                r: 255, g: 255, b: 255
            });
        }

        // Shape 2: Trai Dat & Mat Trang (Can canh)
        const shape2: Point[] = [];
        for (let i = 0; i < particleCount; i++) {
            if (i < 1000) {
                // Hinh cau Trai Dat (Co dai duong + Dat lien + ti nhieu)
                const p = randomSpherePoint(baseRadius);
                // Noise don gian de phan biet dat lien voi bien
                const noise = Math.sin(p.x * 0.02) + Math.cos(p.y * 0.02) + Math.sin(p.z * 0.02);
                const isLand = noise > 0.5;

                shape2.push({
                    ...p,
                    r: isLand ? 50 : 30,
                    g: isLand ? 150 : 100,
                    b: isLand ? 50 : 255 // Xanh la cay vs Xanh nuoc bien
                });
            } else {
                // Mat Trang (Dang quay xung quanh)
                const p = randomSpherePoint(baseRadius * 0.25);
                shape2.push({
                    x: p.x + baseRadius * 1.6, // Leeh phai ti
                    y: p.y,
                    z: p.z,
                    r: 200, g: 200, b: 200 // Mau xam xit
                });
            }
        }

        // Shape 3: Loi Trai Dat (Mo xe ra xem ben trong)
        const shape3: Point[] = [];
        for (let i = 0; i < particleCount; i++) {
            if (i < 300) {
                // Loi (Hat nhan) -> Lay lai may hat tu Mat Troi cung duoc
                const p = randomSpherePoint(baseRadius * 0.5);
                shape3.push({
                    ...p,
                    r: 255, g: 50, b: 50 // Do ruc lua
                });
            } else if (i < 1000) {
                // Lop vo/Lop man (Tach doi ra)
                const p = shape2[i]; // Copy Earth position relative to center
                // Logic: Ban cau trai di sang trai, phai sang phai
                const splitDist = baseRadius * 1.2; // Tach rong ra ti moi thay loi
                const direction = p.x > 0 ? 1 : -1;

                shape3.push({
                    x: p.x + direction * splitDist,
                    y: p.y,
                    z: p.z,
                    r: 40, g: 30, b: 30 // Da den si
                });
            } else {
                // Mat trang (Van o do hoac bay mau)
                const p = shape2[i];
                shape3.push({
                    x: p.x + 100, // Bay mau luon
                    y: p.y - 100,
                    z: p.z,
                    r: 100, g: 100, b: 100 // Mo nhat dan chon ky niem
                });
            }
        }

        // --- Animation Loop (Vong lap vo tan) ---

        const render = (time: number) => {
            // 1. Tinh toan tien do scroll (Keo xuong den dau roi?)
            let rawProgress = 0;
            if (track) {
                const rect = track.getBoundingClientRect();
                const scrollableDistance = rect.height - window.innerHeight;
                const scrolled = -rect.top;

                if (scrollableDistance > 0) {
                    rawProgress = scrolled / scrollableDistance;
                }
            }

            // Kiem soat no trong khoang 0-1 de khoi loi
            rawProgress = Math.max(0, Math.min(1, rawProgress));

            // 2. Dinh nghia cac giai doan (4 giai doan cuoc doi)
            // 0.00 - 0.15: Galaxy
            // 0.15 - 0.35: -> Solar
            // 0.35 - 0.50: Solar
            // 0.50 - 0.65: -> Earth
            // 0.65 - 0.75: Earth
            // 0.75 - 0.90: -> Core
            // 0.90 - 1.00: Core

            let sourceShape = shape0;
            let targetShape = shape0;
            let mixFactor = 0; // 0 = ban cu, 1 = ban moi

            if (rawProgress < 0.15) {
                // Giai doan 0: Ngan Ha
                sourceShape = shape0;
                targetShape = shape0;
                mixFactor = 0;
            } else if (rawProgress < 0.35) {
                // Bien hinh: Ngan Ha -> He Mat Troi
                sourceShape = shape0;
                targetShape = shape1;
                mixFactor = (rawProgress - 0.15) / 0.20;
            } else if (rawProgress < 0.50) {
                // Giai doan 1: He Mat Troi
                sourceShape = shape1;
                targetShape = shape1;
                mixFactor = 0;
            } else if (rawProgress < 0.65) {
                // Bien hinh: He Mat Troi -> Trai Dat
                sourceShape = shape1;
                targetShape = shape2;
                mixFactor = (rawProgress - 0.50) / 0.15;
            } else if (rawProgress < 0.75) {
                // Giai doan 2: Trai Dat
                sourceShape = shape2;
                targetShape = shape2;
                mixFactor = 0;
            } else if (rawProgress < 0.90) {
                // Bien hinh: Trai Dat -> Loi Trai Dat (Mo xe)
                sourceShape = shape2;
                targetShape = shape3;
                mixFactor = (rawProgress - 0.75) / 0.15;
            } else {
                // Giai doan 3: Loi Trai Dat
                sourceShape = shape3;
                targetShape = shape3;
                mixFactor = 0;
            }

            // Lam muot chuyen dong (Ease in/out)
            const ease = (t: number) => t * t * (3 - 2 * t);
            const easedT = ease(mixFactor);

            // Cap nhat vi tri hat
            const rotationSpeed = time * 0.0001;

            ctx.clearRect(0, 0, width, height);

            // Chinh lai mau sao cho toi toi ti

            const cx = width / 2;
            const cy = height / 2;

            for (let i = 0; i < particleCount; i++) {
                const src = sourceShape[i];
                const dst = targetShape[i];

                // Noi suy vi tri (Lerp Position)
                let px = src.x + (dst.x - src.x) * easedT;
                let py = src.y + (dst.y - src.y) * easedT;
                let pz = src.z + (dst.z - src.z) * easedT;

                // Noi suy mau (Lerp Color)
                const r = Math.round(src.r + (dst.r - src.r) * easedT);
                const g = Math.round(src.g + (dst.g - src.g) * easedT);
                const b = Math.round(src.b + (dst.b - src.b) * easedT);

                // Xoay Camera/The gioi
                const cosR = Math.cos(rotationSpeed);
                const sinR = Math.sin(rotationSpeed);

                // 1. Xoay truc Y (Spin)
                let xNew = px * cosR - pz * sinR;
                let zNew = pz * cosR + px * sinR;
                let yNew = py;

                // 2. Xoay truc X (Tilt) - Khoang 30 do cho nghe thuat
                const tilt = 0.5; // radians
                const cosT = Math.cos(tilt);
                const sinT = Math.sin(tilt);

                let yTilted = yNew * cosT - zNew * sinT;
                let zTilted = yNew * sinT + zNew * cosT;

                px = xNew;
                py = yTilted;
                pz = zTilted;

                // Chieu 3D
                const fov = 2000;
                // Camera tu dong thu phong de khong bi cat hinh (antoan la tren het)
                const cameraZ = baseRadius * 4 + 2000;

                const scale = fov / (fov + pz + cameraZ);

                const x2d = cx + px * scale;
                const y2d = cy + py * scale;
                const size = Math.max(1.5, 6 * scale);

                // Ve thoi
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

                    <div
                        className={styles.scrollDownWrapper}
                        onClick={() => {
                            const section = document.getElementById('latest-projects');
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        <span className={styles.scrollText}>Scroll Down</span>
                        <svg
                            className={styles.scrollArrow}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ProjectHero;
