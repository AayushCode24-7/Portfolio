// ==========================================================================
// PHASE 2 ENGINE: MAIN WEBSITE BACKGROUND SPACE & PHYSICS INTERACTIVITY
// ==========================================================================

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.5;

const canvas = document.querySelector('#three-bg');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- MULTI-LAYERED HOLOGRAM MESH DESIGNS ---
const geometry = new THREE.IcosahedronGeometry(1.2, 1);

const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, wireframe: true });
const wireframeMesh = new THREE.Mesh(geometry, lineMaterial);
scene.add(wireframeMesh);

// Add an overlaid points constellation grid right on top of the vectors
const pointMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04 });
const pointsMesh = new THREE.Points(geometry, pointMaterial);
scene.add(pointsMesh);

// --- SCROLL METRICS INTERFACING ---
let currentScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    currentScrollY = window.scrollY;
});

// --- GLOBAL RENDERING CONTROL FUNCTION ---
// Invoked strictly by loader.js once asset lifecycle targets are cleared
function mainPortfolioAnimate() {
    requestAnimationFrame(mainPortfolioAnimate);

    // Completely automated, predictable idle vector physics
    wireframeMesh.rotation.x += 0.002;
    wireframeMesh.rotation.y += 0.003;
    pointsMesh.rotation.x += 0.002;
    pointsMesh.rotation.y += 0.003;

    // Map current vertical scroll distance values directly to depth transformations
    const normalizedScroll = currentScrollY / window.innerHeight;
    
    // Twist and advance the structural spaces forward as the user scans downward
    wireframeMesh.rotation.z = normalizedScroll * 2.5;
    pointsMesh.rotation.z = normalizedScroll * 2.5;
    
    wireframeMesh.position.z = normalizedScroll * 1.0;
    pointsMesh.position.z = normalizedScroll * 1.0;

    renderer.render(scene, camera);
}

// System layout adaptation scales adjustment
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});