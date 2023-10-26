let camera, scene, renderer, uniforms;

document.addEventListener('DOMContentLoaded', (event) => {
    init();
    animate();

    const input = document.getElementById('colorInput');
    input.addEventListener('input', updateColor);
});

function init() {
    // Set up camera and scene
    camera = new THREE.Camera();
    camera.position.z = 1;
    scene = new THREE.Scene();

    // Shader Material with uniforms
    uniforms = {
        u_resolution: { type: "v2", value: new THREE.Vector2() },
        u_time: { type: "f", value: 1.0 },
        u_color: { type: "c", value: new THREE.Color(0.1686, 0.5686, 0.2235) } // Initial color
    };

    const material = new THREE.ShaderMaterial({
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        uniforms: uniforms
    });

    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Renderer setup
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Adjust for resolution
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);

    uniforms.u_time.value += 0.05;
    renderer.render(scene, camera);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}

function updateColor(event) {
    const hexColor = event.target.value;
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexColor)) {
        const color = new THREE.Color(hexColor);
        uniforms.u_color.value = color;  // Update the shader's color uniform
        const vec3String = `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
        document.getElementById('vec3Output').textContent = vec3String;
        mesh.material.needsUpdate = true;
    }
}