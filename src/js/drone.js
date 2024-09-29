import * as THREE from 'three';
                    import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
                    import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
                    import { RGBELoader } from '../three/examples/jsm/loaders/RGBELoader.js';
                    //import { FilmShader } from 'three/examples/jsm/Addons.js';


                    //import stars from './img/stars.jpg';
                    //may need to replace "Addons.js" with "OrbitControls.js"
                    function createScene(containerId) {
                        const droneUrl = new URL('https://emtaub123.github.io/static/drone/Drone.gltf', import.meta.url);

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

                        orbit.minDistance = 20;
                        orbit.maxDistance = 60;
                        orbit.enablePan = false;

                        camera.position.set(20, 10, 20);
                        orbit.update();

                        // const ambientLight = new THREE.AmbientLight(0x333333);
                        // scene.add(ambientLight);

                        // const spotLight = new THREE.SpotLight(0xFFFFFF);
                        // scene.add(spotLight);
                        // spotLight.position.set(100, -100, -1000);
                        // spotLight.castShadow = true;
                        // spotLight.angle = Math.PI/2;
                        // spotLight.intensity = 10000000;

                        // const spotLight2 = new THREE.SpotLight(0xFFFFFF);
                        // scene.add(spotLight2);
                        // spotLight2.position.set(-100, -100, 1000);
                        // spotLight2.castShadow = true;
                        // spotLight2.angle = Math.PI/2;
                        // spotLight2.intensity = 10000000;

                        const spotLight3 = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight3);
                        spotLight3.position.set(0, 1000, 0);
                        spotLight3.castShadow = true;
                        spotLight3.angle = Math.PI/2;
                        spotLight3.intensity = 10000000;

                        const spotLight4 = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight4);
                        spotLight4.position.set(0, -1000, 0);
                        spotLight4.castShadow = true;
                        spotLight4.angle = Math.PI/2;
                        spotLight4.intensity = 10000000;


                        scene.fog = new THREE.FogExp2(0xFFFFFF, 0.001);

                        const loader = new THREE.TextureLoader();
                        const textureLoader = new THREE.TextureLoader();

                        const assetLoader = new GLTFLoader();
                        const rgbeLoader = new RGBELoader();

                        renderer.outputEncoding = THREE.sRGBEncoding;
                        renderer.toneMapping = THREE.ACESFilmicToneMapping;
                        renderer.toneMappingExposure = .5;

                        let model7;

                        assetLoader.load(droneUrl.href, function(gltf) {
                            model7 = gltf.scene;
                            scene.add(model7);
                            model7.position.set(0, 0, 0);
                            model7.castShadow = true;
                            // model7.traverse(function (child) {
                            //     if (child.isMesh) {
                            //         child.material.color.set(0x222222);
                            //     }
                            // });
                        }, undefined, function(error) {
                            console.error(error);
                        });


                        let step = 0;

                        function animate(time) {

                            if (model7) {
                                model7.rotation.y = 0 / 2500;
                            }

                            renderer.render(scene, camera);
                        }

                        renderer.setAnimationLoop(animate);

                        // window.addEventListener('resize', function() {
                        //     camera.aspect = windowinnerWidth / window.innerHeight;
                        //     camera.updateProjectionMatrix();
                        //     renderer.setSize(window.innerWidth, window.innerHeight);
                        // });
                    }
                    createScene("drone");
