//import './style.css'
// Find the latest version by visiting https://cdn.skypack.dev/three.
  
    import * as THREE from 'https://cdn.skypack.dev/three@0.126.1';
  
    // Set scene camera and renderer properties

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerWidth, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    //console.log(scene)
    //console.log(camera)
    //console.log(renderer)

    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(devicePixelRatio)
    document.body.appendChild(renderer.domElement);

    // Create a plane geometry
    const planeGeometry = new THREE.PlaneGeometry(2,4,2,10)
    const planeMaterial = new THREE.MeshPhongMaterial({color:0x0000FF, side : THREE.DoubleSide})
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
    scene.add(planeMesh)
    console.log(planeMesh)

    // Lights

    const light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(0, 0, 2)
    scene.add(light)

    // Camera setup

    camera.position.z = 5
    
    // Rotate animation

    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        //boxMesh.rotation.x +=0.01
        //boxMesh.rotation.y +=0.01
        //planeMesh.rotation.x += 0.004;
    }
    animate()



    

