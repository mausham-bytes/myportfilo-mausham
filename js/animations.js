import * as THREE from 'three';
import { gsap } from 'gsap';
import VanillaTilt from 'vanilla-tilt';

export function initAnimations() {
  // Initialize 3D background
  initBackground();
  
  // Initialize card tilt effects
  initTiltEffects();
  
  // Initialize scroll animations
  initScrollAnimations();
}

function initBackground() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  document.getElementById('hero').prepend(renderer.domElement);
  
  // Create animated particles
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  
  for (let i = 0; i < 5000; i++) {
    vertices.push(
      THREE.MathUtils.randFloatSpread(2000), // x
      THREE.MathUtils.randFloatSpread(1000), // y
      THREE.MathUtils.randFloatSpread(2000)  // z
    );
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
  const material = new THREE.PointsMaterial({
    color: 0x3366ff,
    size: 2,
    transparent: true,
    opacity: 0.8
  });
  
  const points = new THREE.Points(geometry, material);
  scene.add(points);
  
  camera.position.z = 1000;
  
  function animate() {
    requestAnimationFrame(animate);
    points.rotation.x += 0.0005;
    points.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function initTiltEffects() {
  const cards = document.querySelectorAll('.project-card');
  
  VanillaTilt.init(cards, {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.5,
    scale: 1.05
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-fade-up');
  
  elements.forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  });
}