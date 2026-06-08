// ==========================================================================
// PHASE 1 ENGINE: 3D PROCEDURAL LIQUID PRE-LOADER
// ==========================================================================

const L_scene = new THREE.Scene();
const L_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
L_camera.position.set(0, 1.5, 5);

const L_canvas = document.querySelector('#loader-canvas');
const L_renderer = new THREE.WebGLRenderer({ canvas: L_canvas, alpha: true, antialias: true });
L_renderer.setSize(window.innerWidth, window.innerHeight);

// --- PROCEDURAL 3D SHAPE BUILDERS ---

// 1. Build the Can (Wireframe Cylinder)
const canGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 12);
const canMat = new THREE.MeshBasicMaterial({ color: 0x52525b, wireframe: true });
const canMesh = new THREE.Mesh(canGeo, canMat);
canMesh.position.set(-1.8, 1.8, 0);
canMesh.rotation.z = -Math.PI / 4; // Initial slight pour angle tilt
L_scene.add(canMesh);

// 2. Build the Glass (Open Cone)
const glassGeo = new THREE.CylinderGeometry(0.5, 0.35, 1.0, 12, 1, true); // Open-ended
const glassMat = new THREE.MeshBasicMaterial({ color: 0x71717a, wireframe: true });
const glassMesh = new THREE.Mesh(glassGeo, glassMat);
glassMesh.position.set(0.6, -0.6, 0);
L_scene.add(glassMesh);

// --- LIQUID PARTICLE ENGINE CONFIGURATION ---
const particleCount = 180;
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = [];

// Initialize starting positions at the mouth of the tilted can
for(let i = 0; i < particleCount; i++) {
    positions[i*3] = -1.4; // X coordinates alignment
    positions[i*3+1] = 1.6; // Y coordinates alignment
    positions[i*3+2] = (Math.random() - 0.5) * 0.1; // Z spread deep offset

    velocities.push({
        x: 0.02 + Math.random() * 0.015,
        y: -0.01 - Math.random() * 0.01,
        z: (Math.random() - 0.5) * 0.01
    });
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({
    color: 0x2dd4bf, // Signature Developer Teal Liquid
    size: 0.12,
    transparent: true,
    opacity: 0.8
});

const liquidParticles = new THREE.Points(particleGeometry, particleMaterial);
L_scene.add(liquidParticles);

// --- RUNTIME PRE-LOADER ANIMATION CYCLE ---
const L_clock = new THREE.Clock();
let pourActive = false;

const loaderAnimate = () => {
    const elapsed = L_clock.getElapsedTime();
    
    // Phase 1 timing checks: Tilt can further down at 0.8s mark to launch fluid flow
    if (elapsed > 0.8) {
        canMesh.rotation.z = THREE.MathUtils.lerp(canMesh.rotation.z, -Math.PI / 1.8, 0.05);
        pourActive = true;
    }

    if (pourActive) {
        const posAttr = liquidParticles.geometry.attributes.position;
        
        for (let i = 0; i < particleCount; i++) {
            // Apply gravity metrics to the Y velocity axis
            velocities[i].y -= 0.0015;

            // Move particle metrics along computed tracking vectors
            posAttr.array[i*3] += velocities[i].x;
            posAttr.array[i*3+1] += velocities[i].y;
            posAttr.array[i*3+2] += velocities[i].z;

            // Collision check: If fluid drops below the glass rim baseline boundary
            if (posAttr.array[i*3+1] < -0.4 && posAttr.array[i*3] > 0.2 && posAttr.array[i*3] < 1.0) {
                // Settle inside the glass base with an abstract swirling logic
                posAttr.array[i*3+1] = -1.0 + Math.random() * 0.4;
                posAttr.array[i*3] = 0.6 + (Math.random() - 0.5) * 0.4;
                velocities[i].y = 0;
                velocities[i].x = 0;
            }
            
            // Loop recycling system if particle maps drop entirely out of frame bounds
            if (posAttr.array[i*3+1] < -2.5) {
                posAttr.array[i*3] = -1.4;
                posAttr.array[i*3+1] = 1.6;
                velocities[i].y = -0.01;
                velocities[i].x = 0.02 + Math.random() * 0.015;
            }
        }
        posAttr.needsUpdate = true;
    }

    L_renderer.render(L_scene, L_camera);

    if (!document.getElementById('loader-overlay').classList.contains('fade-out')) {
        requestAnimationFrame(loaderAnimate);
    }
};

loaderAnimate();

// --- TIMED ENGINE HANDSHAKE ON SITE DISMISSAL ---
window.addEventListener('load', () => {
    // Allow the cinematic fluid loop to show off its cycle for 3.2 seconds total
    setTimeout(() => {
        document.getElementById('loader-overlay').classList.add('fade-out');
        document.getElementById('portfolio-content').classList.add('visible');
        document.getElementById('portfolio-content').classList.remove('hidden');

        // Safely switch GPU context allocations over to app.js pipeline
        if (typeof mainPortfolioAnimate === 'function') {
            mainPortfolioAnimate();
        }
    }, 3200);
});

// Viewport protection
window.addEventListener('resize', () => {
    L_camera.aspect = window.innerWidth / window.innerHeight;
    L_camera.updateProjectionMatrix();
    L_renderer.setSize(window.innerWidth, window.innerHeight);
});