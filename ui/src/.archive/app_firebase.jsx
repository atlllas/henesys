import React, { useRef, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import * as THREE from 'three';
import FloatingInput from '../components/FloatingInput';
import './app.css'

// import and setup firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyAgexmC8Fdo3K1q9AOoUCkzIU5SHH28UmA",
    authDomain: "comms-b64df.firebaseapp.com",
    databaseURL: "https://comms-b64df-default-rtdb.firebaseio.com",
    projectId: "comms-b64df",
    storageBucket: "comms-b64df.appspot.com",
    messagingSenderId: "858755236439",
    appId: "1:858755236439:web:82d2b680c5e856cd8d5912"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

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
    const [userShadows, setUserShadows] = useState([]);
    const [ownShadow, setOwnShadow] = useState(null);


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
    
    useEffect(() => {
    auth.signInAnonymously()
        .then((userCredential) => {
        // User signed in anonymously.
        const user = userCredential.user;
        // Do something with the signed-in user.
        })
        .catch((error) => {
        // Handle errors here.
        console.error(error);
        });
    }, []);

    // Store shadow positions
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            const userRef = database.ref(`users/${user.uid}`);
            const initialShadowPosition = { x: 0, y: 0 };
      
            // Set user data in the database, including shadow position and online status
            userRef.set({
              uid: user.uid,
              shadowPosition: initialShadowPosition,
              status: "online"
            });
      
            // Detect when the user goes offline
            const isOfflineForDatabase = {
              status: "offline",
              lastOnline: firebase.database.ServerValue.TIMESTAMP,
            };
      
            const isOnlineForDatabase = {
              status: "online",
            };
      
            const connectionRef = database.ref(".info/connected");
            connectionRef.on("value", (snapshot) => {
              if (snapshot.val() === true) {
                // User is connected
                userRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                  userRef.set(isOnlineForDatabase);
                });
              }
            });
      
            // Listen for changes in the user's shadow position and update the state accordingly
            userRef.on('value', (snapshot) => {
              const userData = snapshot.val();
              // Update shadow position in your state or component logic
            });
          }
        });
      }, []);
      
      // Fetch shadow positions
      useEffect(() => {
        const fetchData = () => {

        // Fetch user data from Firebase and update the state
        const userRef = database.ref("users");
        userRef.on("value", (snapshot) => {
          const users = snapshot.val();
          if (users) {
            const newShadows = Object.values(users).map((user) => user.shadowPosition);
            setUserShadows(newShadows);
            console.log("Updated Shadows:", newShadows);
          }
        });
      }

      fetchData();

      const intervalId = setInterval(fetchData, 3000);

      return () => clearInterval(intervalId);
    }, []);    
      

    // THREE.js scene
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
                
                float shaderColor = 3.2 - (3.0 * length(2.0 * p));
                for (int i = 1; i <= 7; i++) {
                    float power = pow(2.0, float(i));
                    shaderColor += (1.5 / power) * snoise(coord + vec3(0.0, -u_time * 0.05, u_time * 0.01), power * 3.0);
                }
                            
                // Combine fire color with shader effect color
                vec3 fireColor = vec3(0.349, 0.416, 0.416);
                vec3 finalColor = mix(fireColor, fireColor * vec3(shaderColor), 0.3);
                
                gl_FragColor = vec4(finalColor, 1.0);
            } 
            `
        });
        const bg = new THREE.Mesh(plane, material);
        scene.add(bg);

        //add new shadows for each shadow
        userShadows.forEach((shadowPosition) => {

          const orb = new THREE.SphereGeometry(0.087, 32, 32);
          const orbMaterial = new THREE.MeshBasicMaterial({ color: 0xefefef });
          const shadow = new THREE.Mesh(orb, orbMaterial);
          shadow.position.set(shadowPosition.x, shadowPosition.y, shadowPosition.z);

          scene.add(shadow);
        });

        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        const cursorTarget = new THREE.Vector3();
        const orbGeometry = new THREE.SphereGeometry(0.087, 32, 32);
        const orbMaterial = new THREE.MeshBasicMaterial({ color: 0xefefef });
        const ownShadowMesh = new THREE.Mesh(orbGeometry, orbMaterial);
      
        // Set your own shadow's initial position
        ownShadowMesh.position.set(0, 0, 0); // You can set the initial position as needed
      
        // Add your own shadow to the scene
        scene.add(ownShadowMesh);
      
        // Store your own shadow mesh in the state
        setOwnShadow(ownShadowMesh);
      
        function onMouseMove(event) {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(scene.children);
        
          if (intersects.length > 0) {
            const intersection = intersects[0];
            cursorTarget.copy(intersection.point); // Store the target position
            const dampingFactor = 0.1; // Adjust the damping factor as needed
        
            // Update the position of your own shadow
            if (ownShadow) {
              ownShadow.position.lerp(cursorTarget, dampingFactor);
              
              // Update your own shadow position in the database based on mouse position
              auth.onAuthStateChanged((user) => {
                if (user) {
                  const userRef = database.ref(`users/${user.uid}`);
                  userRef.update({
                    shadowPosition: { x: cursorTarget.x, y: cursorTarget.y, z: cursorTarget.z },
                  });
                }
              });
            }
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
    }, [userShadows]);

    return (
        // Future TODO send mouse position to urbit
        <div>
            <canvas ref={canvasRef}></canvas>
            <main className='main'>
                {!oracle.position
                    ?
                    <FloatingInput onSubmit={handleIntentionSubmit}/>

                    :
                    <div className='oracle'>
                        <div>intention: {oracle.intention}</div><p />
                        <div>position: {oracle.position}</div>
                        <div>momentum: {oracle.momentum}</div><p />
                        <button onClick={() => setOracle({})}>X</button>
                    </div>}
            </main>
        </div>
    )
};