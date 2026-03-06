/* ═══════════════════════════════════════════
   NEURAL NETWORK CANVAS BACKGROUND
   Three.js animated particle network
═══════════════════════════════════════════ */

export function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Particles ──────────────────────────────────
  const PARTICLE_COUNT = 120;
  const positions = [];
  const velocities = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions.push({
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 100,
      z: (Math.random() - 0.5) * 60,
    });
    velocities.push({
      x: (Math.random() - 0.5) * 0.04,
      y: (Math.random() - 0.5) * 0.04,
      z: (Math.random() - 0.5) * 0.02,
    });
  }

  // Point geometry
  const geo = new THREE.BufferGeometry();
  const posArr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    posArr[i * 3]     = positions[i].x;
    posArr[i * 3 + 1] = positions[i].y;
    posArr[i * 3 + 2] = positions[i].z;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));

  const mat = new THREE.PointsMaterial({ color: 0x7c3aed, size: 1.2, transparent: true, opacity: 0.7 });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // Line segments for connections
  const lineMat = new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.12 });
  let lineObj = null;

  function buildLines() {
    const lineVerts = [];
    const THRESHOLD = 28;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const dz = positions[i].z - positions[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < THRESHOLD) {
          lineVerts.push(positions[i].x, positions[i].y, positions[i].z);
          lineVerts.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
    if (lineObj) scene.remove(lineObj);
    lineObj = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineObj);
  }

  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame++;

    // Update positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i].x += velocities[i].x;
      positions[i].y += velocities[i].y;
      positions[i].z += velocities[i].z;
      // Wrap around
      if (positions[i].x > 80)  positions[i].x = -80;
      if (positions[i].x < -80) positions[i].x =  80;
      if (positions[i].y > 50)  positions[i].y = -50;
      if (positions[i].y < -50) positions[i].y =  50;

      posArr[i * 3]     = positions[i].x;
      posArr[i * 3 + 1] = positions[i].y;
      posArr[i * 3 + 2] = positions[i].z;
    }
    geo.attributes.position.needsUpdate = true;

    // Rebuild lines every 3 frames for performance
    if (frame % 3 === 0) buildLines();

    // Gentle camera drift
    camera.position.x = Math.sin(Date.now() * 0.0001) * 8;
    camera.position.y = Math.cos(Date.now() * 0.00008) * 4;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  buildLines();
  animate();
}
