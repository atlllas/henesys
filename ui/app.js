// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 100);
camera.lookAt(scene.position);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Create six planes with white material
for (let i = 0; i < 6; i++) {
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.y = i * 20; // Vertically stack the planes
    scene.add(plane);

    // Add click event listener to flip the plane
    plane.userData.clicked = false;
    plane.userData.text = ""; // Store text in the plane
    plane.addEventListener('click', function() {
        plane.userData.clicked = !plane.userData.clicked;
        // Flip the plane by applying a rotation transformation
        if (plane.userData.clicked) {
            plane.rotation.x += Math.PI / 2; // Rotate 90 degrees around the x-axis
            // Show text on the plane
            if (plane.userData.text) {
                console.log(plane.userData.text); // You can replace this with your text display logic
            }
        } else {
            plane.rotation.x -= Math.PI / 2; // Rotate back 90 degrees
        }
    });

    // Enable raycasting for click events
    plane.raycast = () => [];
}



// Add text to the planes (optional)
const texts = ["Plane 1", "Plane 2", "Plane 3", "Plane 4", "Plane 5", "Plane 6"];
for (let i = 0; i < 6; i++) {
    scene.children[i].userData.text = texts[i];
}

// Main render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
