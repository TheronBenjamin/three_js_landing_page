//import './style.css'
// Find the latest version by visiting https://cdn.skypack.dev/three.
  
    import * as THREE from 'https://cdn.skypack.dev/three@0.126.1';
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerWidth, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()


    console.log(scene)
    console.log(camera)
    console.log(renderer)

    renderer.setSize(innerWidth, innerHeight)
    document.body.appendChild(renderer.domElement);