//import './style.css'
// Find the latest version by visiting https://cdn.skypack.dev/three.
  
    import gsap from 'gsap';
    import * as THREE from 'https://cdn.skypack.dev/three@0.126.1';
    import {OrbitControls} from 'https://cdn.skypack.dev/three@0.126.1/examples/jsm/controls/OrbitControls.js'
    import * as dat from 'dat.gui'

    // GUI console for to change values
    const gui = new dat.GUI()
    const world = {
        plane:{
            width: 400,
            height: 400,
            widthSegments: 108,
            heightSegments: 87
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
    // Create depth to the geometry with a loop and target de z axis
    const {array} = planeMesh.geometry.attributes.position;
    const randomValues = []
    for (let i=0; i<array.length; i++){
        if(i%3 === 0){
            const x = array[i]
        const y = array[i+1]
        const z = array[i+2]
        array[i+2] = z + Math.random()
        array[i] = x + (Math.random() -0.5) * 3
        array[i+1] = y + (Math.random() -0.5) * 3
        array[i+2] = z + (Math.random()- 0.5) * 3
        }
        randomValues.push(Math.random() * Math.PI * 2)
    }
    
    // Duplicate the array of position
    planeMesh.geometry.attributes.position.randomValues = 
    randomValues
    planeMesh.geometry.attributes.position.originalPosition = 
    planeMesh.geometry.attributes.position.array
        // Set colors attribute for the mousemove
        const colors = []
        for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
            colors.push(0,.19,0.4) 
        }
        planeMesh.geometry.setAttribute('color', 
        new THREE.BufferAttribute(
            new Float32Array(colors),3)
            )
    }


    // Set scene, camera, raycaster and renderer properties
    const raycaster = new THREE.Raycaster()
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75, 
        innerWidth/innerHeight, 
        0.1, 
        1000
        )
    const renderer = new THREE.WebGLRenderer()

    // Set renderer and append it
    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(devicePixelRatio)
    document.body.appendChild(renderer.domElement);

    // Create a plane geometry
    const planeGeometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments)
    const planeMaterial = new THREE.MeshPhongMaterial({
        
        side : THREE.DoubleSide,
        // Add this to see the depth
        flatShading : THREE.FlatShading,
        vertexColors : true
    })
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
    scene.add(planeMesh)
    generatePlane()

    // Lights
    // Front light
    const fontLight = new THREE.DirectionalLight(0xFFFFFF, 1)
    fontLight.position.set(0, 1, 1)
    scene.add(fontLight)

    // Back light
    const backLight = new THREE.DirectionalLight(0xFFFFFF, 1)
    backLight.position.set(0, 0, -1)
    scene.add(backLight)

    // Camera position
    new OrbitControls(camera, renderer.domElement)
    camera.position.z = 40

    // Event listener for the mouse
    const mouse = {
        x:undefined,
        y:undefined
    }
    addEventListener("mousemove", (event) =>{
        mouse.x = (event.clientX /innerWidth)*2-1
        mouse.y = -(event.clientY /innerHeight)*2+1
    })

    let frame = 0
    // Rotate animation and Raycaster(pointer which detect the object)
    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        raycaster.setFromCamera(mouse, camera)
        //Animate the postion (vectors)
        frame +=0.01
        const {array,
             originalPosition, 
             randomValues} = planeMesh.geometry.attributes.position
        for (let i = 0; i < array.length; i+=3) {
            // x
            array[i] = originalPosition[i] + 
            Math.cos(frame+randomValues[i])*0.003
            //y
            array[i+1] = originalPosition[i+1] + 
            Math.sin(frame+randomValues[i])*0.006
            
        }
        planeMesh.geometry.attributes.position.needsUpdate = true

        //Animate the colors with an hover effect
        const intersects = raycaster.intersectObject(planeMesh)
        if(intersects.length>0){
            const {color} = intersects[0].object.geometry.attributes
            //vertice 1
            color.setX(intersects[0].face.a,0.1)
            color.setY(intersects[0].face.a,0.5)
            color.setZ(intersects[0].face.a,1)
            //vertice 1
            color.setX(intersects[0].face.b,0.1)
            color.setY(intersects[0].face.b,0.5)
            color.setZ(intersects[0].face.b,1)
            //vertice 1
            color.setX(intersects[0].face.c,0.1)
            color.setY(intersects[0].face.c,0.5)
            color.setZ(intersects[0].face.c,1)
            intersects[0].object.geometry.attributes.color.needsUpdate = true

            // GSAP color hover effect
            const initialColors ={
                r: 0,
                g: 0.19,
                b: 0.4
            }

            const hoverColors ={
                r: 0.1,
                g: 0.5,
                b: 1
            }
            gsap.to(hoverColors, {
                r: initialColors.r,
                g: initialColors.g,
                b: initialColors.b,
                onUpdate:()=>{
                    //vertice 1
                    color.setX(intersects[0].face.a,hoverColors.r)
                    color.setY(intersects[0].face.a,hoverColors.g)
                    color.setZ(intersects[0].face.a,hoverColors.b)
                    //vertice 1
                    color.setX(intersects[0].face.b,hoverColors.r)
                    color.setY(intersects[0].face.b,hoverColors.g)
                    color.setZ(intersects[0].face.b,hoverColors.b)
                    //vertice 1
                    color.setX(intersects[0].face.c,hoverColors.r)
                    color.setY(intersects[0].face.c,hoverColors.g)
                    color.setZ(intersects[0].face.c,hoverColors.b)
                    intersects[0].object.geometry.attributes.color.needsUpdate = true
                }
            })
        }
        //boxMesh.rotation.x +=0.01
        //boxMesh.rotation.y +=0.01
    }
    
    animate()
    // Roration of the planeMesh
    planeMesh.rotation.x = 2.3;
    planeMesh.rotation.y = -.45;

    

