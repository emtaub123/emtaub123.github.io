import * as THREE from 'three';
                    import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
                    import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
                    import { RGBELoader } from '../three/examples/jsm/loaders/RGBELoader.js';
                    //import { FilmShader } from 'three/examples/jsm/Addons.js';


                    //import stars from './img/stars.jpg';
                    //may need to replace "Addons.js" with "OrbitControls.js"
                    function createScene(containerId) {
                        const dogUrl = new URL('/static/dog/dog.gltf', import.meta.url);

                        const renderer = new THREE.WebGLRenderer({antialias: true});
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
                        orbit.minDistance = 18;
                        orbit.maxDistance = 35;
                        orbit.enablePan = false;

                        camera.position.set(20, 20, 35);
                        orbit.update();

                        const ambientLight = new THREE.AmbientLight(0x333333);
                        scene.add(ambientLight);

                        const spotLight = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight);
                        spotLight.position.set(-100, 100, -1000);
                        spotLight.castShadow = true;
                        spotLight.angle = Math.PI/2;
                        spotLight.intensity = 10000000;


                        scene.fog = new THREE.FogExp2(0xFFFFFF, 0.001);

                        const loader = new THREE.TextureLoader();
                        const textureLoader = new THREE.TextureLoader();

                        const assetLoader = new GLTFLoader();

                        let model4;

                        assetLoader.load(dogUrl.href, function(gltf) {
                            model4 = gltf.scene;
                            scene.add(model4);
                            model4.position.set(0, 3.4, 0);
                            model4.castShadow = true;
                            model4.traverse(function (child) {
                                if (child.isMesh) {
                                    child.material.color.set(0x222222);
                                }
                            });
                        }, undefined, function(error) {
                            console.error(error);
                        });


                        let step = 0;

                        function animate(time) {

                            if (model4) {
                                model4.rotation.y = 0 / 2500;
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
                    createScene("dog");
                    createScene("dog2");
                    createScene("dog3");