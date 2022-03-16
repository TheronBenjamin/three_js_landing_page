//import './style.css'
// Find the latest version by visiting https://cdn.skypack.dev/three.
  
    import * as THREE from 'https://cdn.skypack.dev/three@0.126.1';
    import * as dat from 'dat.gui'

    // GUI console

    const gui = new dat.GUI()
    const world = {
        plane:{
            width: 10,
            height: 10,
            widthSegments: 10,
            heightSegments: 10
        }
    }
    gui.add(world.plane, "width", 1, 20).onChange(generatePlane)
    gui.add(world.plane, "height", 1, 20).onChange(generatePlane)
    gui.add(world.plane, "widthSegments", 1, 200).onChange(generatePlane)
    gui.add(world.plane, "heightSegments", 1, 200).onChange(generatePlane)

    function generatePlane() {
        planeMesh.geometry.dispose();
        planeMesh.geometry = new THREE.
        PlaneGeometry(
            world.plane.width,
            world.plane.height,
            world.plane.widthSegments,
            world.plane.heightSegments
            )
        const {array} = planeMesh.geometry.attributes.position;
        for (let i=0; i<array.length; i+=3){
        const x = array[i]
        const y = array[i+1]
        const z = array[i+2]
        array[i+2] = z + Math.random()
        }
    }


    // Set scene camera and renderer properties

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75, 
        innerWidth/innerWidth, 
        0.1, 
        1000
        )
    const renderer = new THREE.WebGLRenderer()

    //console.log(scene)
    //console.log(camera)
    //console.log(renderer)

    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(devicePixelRatio)
    document.body.appendChild(renderer.domElement);

    // Create a plane geometry
    const planeGeometry = new THREE.PlaneGeometry(10,10,10,10)
    const planeMaterial = new THREE.MeshPhongMaterial({
        color:0x0000FF, 
        side : THREE.DoubleSide,
        // Add this to see the depth
        flatShading : THREE.FlatShading
    })
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
    scene.add(planeMesh)
    console.log(planeMesh.geometry.attributes.position.array)
    const {array} = planeMesh.geometry.attributes.position;

    // Create depth to the geometry with a loop and target de z axis

    for (let i=0; i<array.length; i+=3){
        const x = array[i]
        const y = array[i+1]
        const z = array[i+2]
        array[i+2] = z + Math.random()
    }
    // Lights

    const light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(0, 0, 2)
    scene.add(light)

    // Camera setup

    camera.position.z = 10
    
    // Rotate animation

    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        //boxMesh.rotation.x +=0.01
        //boxMesh.rotation.y +=0.01
        //planeMesh.rotation.x += 0.004;
    }
    animate()



    

