import React, { useRef, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import HelloCanvas from '../components/HelloCanvas';
import FloatingInput from '../components/FloatingInput';
import './app.css'


const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
    const [log, setLog] = useState(new Map())
    const [shipLog, setShipLog] = useState(new Map())
    const [oracle, setOracle] = useState({})
    const [intention, setIntention] = useState('')
    const [subEvent, setSubEvent] = useState({})
    const [status, setStatus] = useState(null)
    const [error, setError] = useState(null)

    const canvasRef = useRef(null);
    const materialRef = useRef(null);
    const [overlayOpacity, setOverlayOpacity] = useState(0); // 0 means fully transparent

    const [num, setNum] = useState(0.0);
    const [showHelloCanvas, setShowHelloCanvas] = useState(true);
    const incrementValue = 0.1; // Adjust the increment value as needed


    useEffect(() => {
        const init = async () => {
            subscribe()
            setShipLog(await getShipLog())
            setLog(await getLog())

        }
        window.urbit = new Urbit("")
        window.urbit.ship = window.ship

        window.urbit.onOpen = () => setStatus("con")
        window.urbit.onRetry = () => setStatus("try")
        window.urbit.onError = () => setStatus("err")

        init()
    }, []);

    useEffect(() => {
        const updateFun = () => {
            setOracle(subEvent)
            console.log('test', subEvent)
        }
        updateFun()
    }, [subEvent]);

    const getShipLog = async () => {
        return window.urbit.scry({
            app: 'yijing',
            path: `/log/~${window.ship}`,
        })
    };

    const getLog = async () => {
        return window.urbit.scry({
            app: 'yijing',
            path: `/log`,
        })
    };


    const subscribe = () => {
        try {
            window.urbit.subscribe({
                app: "yijing",
                path: "/updates",
                event: setSubEvent,
                err: () => console.log("Subscription rejected"),
                quit: () => console.log("Kicked from subscription"),
            })
        } catch {
            console.log("Subscription failed");
        }
    };

    const cast = (intention) => {
        window.urbit.poke({
            app: "yijing",
            mark: "yijing-action",
            json: { cast: { intention: intention } },
            onSuccess: () => console.log('successful cast. . .'),
            onError: () => setError("cast lost in dimensions. . ."),
        })
    };

    // --> Moved to FloatingInput.jsx
    // const onKeyDown = e => {
    //     if (e.key === 'Enter' && !e.shiftKey) {
    //         e.preventDefault()
    //         e.target.value && cast(e.target.value)
    //         e.target.value = ''
    //         setIntention('')
    //     }
    // };

    console.log('log', log)
    console.log('ship', window.ship)
    console.log('shiplog', shipLog)

    const handleIntentionSubmit = (intention) => {
        cast(intention);
      };
    
    // UI
    const toggleCanvas = () => {
        setShowHelloCanvas(!showHelloCanvas);
    };


    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

        const setRendererSize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            renderer.setSize(newWidth, newHeight);
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
        };
        setRendererSize();

        renderer.domElement.classList.add('renderer');
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', setRendererSize);

        const plane = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_resolution: new THREE.Uniform(new THREE.Vector2()),
                u_time: { value: 0.0 },
                u_shaderColor: { value: 0.0 } // Add the u_shaderColor uniform here
            },
            fragmentShader: `
            #ifdef GL_ES
            precision mediump float;
            #endif
            
            uniform vec2 u_resolution;
            uniform float u_time;
            
            float snoise(vec3 uv, float res)
            {
                const vec3 s = vec3(1e0, 1e2, 1e3);
                
                uv *= res;
                
                vec3 uv0 = floor(mod(uv, res)) * s;
                vec3 uv1 = floor(mod(uv + vec3(1.), res)) * s;
                
                vec3 f = fract(uv);
                f = f * f * (3.0 - 2.0 * f);
            
                vec4 v = vec4(uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,
                              uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z);
            
                vec4 r = fract(sin(v * 1e-1) * 1e3);
                float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
                
                r = fract(sin((v + uv1.z - uv0.z) * 1e-1) * 1e3);
                float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
                
                return mix(r0, r1, f.z) * 2.0 - 1.0;
            }
            
            void main() {
                vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / u_resolution.xy;
                p.x *= u_resolution.x / u_resolution.y;
                
                float fire = 0.0;
                vec3 coord = vec3(atan(p.x, p.y) / 6.2832 + 0.5, length(p) * 0.9, 11);

                float oscillatingValue = sin(u_time * 0.1); // Adjust the frequency of the oscillation by changing the multiplier (0.1 in this case)
                float timeFactor = abs(oscillatingValue); // Map the oscillating value to the range [0, 1]
                
                // Map the timeFactor from [0, 1] to [-6.4, 6.4] (or any desired range)
                timeFactor = mix(-1.9, 1.0, timeFactor); // Adjust the range based on your preference
                float shaderColor = 3.2 - (3.0 * length(2.0 * p)) + timeFactor;

                for (int i = 1; i <= 7; i++) {
                    float power = pow(2.0, float(i));
                    shaderColor += (1.5 / power) * snoise(coord + vec3(0.0, -u_time * 0.05, u_time * 0.01), power * 3.0);
                }
                vec3 skyBlue = vec3 (0.9686, 0.9686, 0.9686);  // Rough approximation of sky blue in RGB
          
                // Combine fire color with shader effect color
                vec3 fireColor = vec3 (0.9922, 1.0, 0.4157);
                vec3 finalColor = mix(skyBlue, fireColor, shaderColor);
                
                gl_FragColor = vec4(finalColor, 1.0);
            } 
            `
        });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 500; // Set the canvas width
        canvas.height = 100; // Set the canvas height
        
        const fontSize = 30; // Set the font size
        context.font = `Bold ${fontSize}px Arial`;
        context.fillStyle = 'black'; // Set the background color
        context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color
        context.fillStyle = 'white'; // Set the text color
        context.fillText('Your Text Here', 10, 40); // Draw the text
        
        const texture = new THREE.CanvasTexture(canvas);
        
        const textMaterial = new THREE.MeshBasicMaterial({ map: texture });

        const bg = new THREE.Mesh(plane, material);
        scene.add(bg);

        const orb = new THREE.SphereGeometry(0.087, 32, 32);
        const orbMaterial = new THREE.MeshBasicMaterial({ color: 0xefefef });
        const shadow = new THREE.Mesh(orb, orbMaterial);
        scene.add(shadow);

        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        const cursorTarget = new THREE.Vector3();
        
        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
        
            if (intersects.length > 0) {
                const intersection = intersects[0];
                cursorTarget.copy(intersection.point); // Store the target position
                const dampingFactor = 0.1; // Adjust the damping factor as needed
                shadow.position.lerp(cursorTarget, dampingFactor);
            }
        }
                window.addEventListener('mousemove', onMouseMove, false);

        camera.position.z = 5;
        const render = () => {
            const object = scene.children[0];
            object.material.uniforms.u_resolution.value.x = window.innerWidth;
            object.material.uniforms.u_resolution.value.y = window.innerHeight;
            renderer.render(scene, camera);
        }

        const animate = () => {
            requestAnimationFrame(animate);
            material.uniforms.u_time.value += 0.01;
            render();
        };
        animate();
        return () => {
            window.removeEventListener('resize', setRendererSize);
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    const increaseOpacity = () => {
        let newOpacity = overlayOpacity + incrementValue;
        if (newOpacity > 1) newOpacity = 0; // Reset to 0 if exceeds 1
        setOverlayOpacity(newOpacity);
    };
    
    return (
        <div>
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', backgroundColor: 'black', opacity: overlayOpacity}}></div>
            <canvas ref={canvasRef}></canvas>
            <main className='main'>
                {showHelloCanvas && <HelloCanvas />} {/* Render HelloCanvas component */}
    
                {!oracle.position
                    ?
                    <FloatingInput onSubmit={increaseOpacity}/>
                    :
                    <div className='oracle'>
                        <div>intention: {oracle.intention}</div><p />
                        <div>position: {oracle.position}</div>
                        <div>momentum: {oracle.momentum}</div><p />
                        <button onClick={() => setOracle({})}>X</button>
                    </div>}
            </main>
            <button style={{position: 'absolute', zIndex: 3}} onClick={increaseOpacity}>Increase Overlay Opacity</button>
        </div>
    )};