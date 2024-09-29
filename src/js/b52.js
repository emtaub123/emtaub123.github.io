import * as THREE from 'three';
                    import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
                    import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
                    import { RGBELoader } from '../three/examples/jsm/loaders/RGBELoader.js';
                    //import { FilmShader } from 'three/examples/jsm/Addons.js';


                    //import stars from './img/stars.jpg';
                    //may need to replace "Addons.js" with "OrbitControls.js"
                    function createScene(containerId) {

                        
                        const b52URL = new URL('/static/b52/b52.gltf', import.meta.url);

                        const renderer = new THREE.WebGLRenderer({antialias: true}, {alpha: true});
                        const container = document.getElementById(containerId);
                        renderer.shadowMap.enabled = true;
                        renderer.setSize(container.clientWidth, container.clientHeight);
                        container.appendChild(renderer.domElement);

                        const scene = new THREE.Scene();
                        scene.background = new THREE.Color(0xFFFFFF);
                        const camera = new THREE.PerspectiveCamera(
                            45,
                            container.clientWidth / container.clientHeight,
                            0.1,
                            1000
                        );

                        const orbit = new OrbitControls(camera, renderer.domElement);
                        orbit.minDistance = 110;
                        orbit.maxDistance = 220;
                        orbit.enablePan = false;


                        camera.position.set(-91.8, 45.2, 110.7);
                        orbit.update();

                        const ambientLight = new THREE.AmbientLight(0x333333);
                        scene.add(ambientLight);

                        const spotLight = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight);
                        spotLight.position.set(100, -100, -1000);
                        spotLight.castShadow = true;
                        spotLight.angle = Math.PI/2;
                        spotLight.intensity = 10000000;

                        const spotLight2 = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight2);
                        spotLight2.position.set(-100, -100, 1000);
                        spotLight2.castShadow = true;
                        spotLight2.angle = Math.PI/2;
                        spotLight2.intensity = 10000000;

                        // const sLightHelper = new THREE.SpotLightHelper(spotLight);
                        // scene.add(sLightHelper);


                        scene.fog = new THREE.FogExp2(0xFFFFFF, 0.001);

                        const loader = new THREE.TextureLoader();
                        const textureLoader = new THREE.TextureLoader();

                        const assetLoader = new GLTFLoader();
                        const rgbeLoader = new RGBELoader();

                        renderer.outputEncoding = THREE.sRGBEncoding;
                        renderer.toneMapping = THREE.ACESFilmicToneMapping;
                        renderer.toneMappingExposure = 1.5;

                        let model3;

                        assetLoader.load(b52URL.href, function(gltf) {
                            model3 = gltf.scene;
                            scene.add(model3);
                            model3.position.set(-10, 0, 0);
                            model3.castShadow = true;
                            model3.traverse(function (child) {
                                if (child.isMesh) {
                                    child.material.color.set(0x222222);
                                }
                            });
                        }, undefined, function(error) {
                            console.error(error);
                        });


                        let step = 0;

                        function animate(time) {
                            if (model3) {
                                model3.rotation.y = 0 / 2500;
                            }

                            renderer.render(scene, camera);
                        }

                        renderer.setAnimationLoop(animate);
                    }

                    createScene("b52")
                    createScene("b52-2")


