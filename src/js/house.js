import * as THREE from 'three';
                    import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
                    import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
                    import { RGBELoader } from '../three/examples/jsm/loaders/RGBELoader.js';
                    //import { FilmShader } from 'three/examples/jsm/Addons.js';


                    //import stars from './img/stars.jpg';
                    //may need to replace "Addons.js" with "OrbitControls.js"
                    function createScene(containerId) {
                        const doghouseUrl = new URL('/static/house/doghouse.gltf', import.meta.url);

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

                        orbit.minDistance = 60;
                        orbit.maxDistance = 140;
                        orbit.enablePan = false;

                        camera.position.set(45, 30, -45);
                        orbit.update();

                        const spotLight = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight);
                        spotLight.position.set(-50, 100, 0);
                        spotLight.castShadow = false;
                        spotLight.angle = Math.PI/2;
                        spotLight.intensity = 3000000;

                        const spotLight2 = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight2);
                        spotLight2.position.set(-50, 100, -50);
                        spotLight2.castShadow = false;
                        spotLight2.angle = Math.PI/2;
                        spotLight2.intensity = 3000000;

                        const spotLight3 = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight3);
                        spotLight3.position.set(-50, 100, 50);
                        spotLight3.castShadow = false;
                        spotLight3.angle = Math.PI/2;
                        spotLight3.intensity = 3000000;

                        const spotLight4 = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight4);
                        spotLight4.position.set(0, 100, 0);
                        spotLight4.castShadow = false;
                        spotLight4.angle = Math.PI/2;
                        spotLight4.intensity = 1000000;

                        const spotLight5 = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight5);
                        spotLight5.position.set(0, -100, 0);
                        spotLight5.castShadow = false;
                        spotLight5.angle = Math.PI/2;
                        spotLight5.intensity = 1000000;


                        scene.fog = new THREE.FogExp2(0xFFFFFF, 0.001);

                        const loader = new THREE.TextureLoader();
                        const textureLoader = new THREE.TextureLoader();

                        const assetLoader = new GLTFLoader();
                        const rgbeLoader = new RGBELoader();

                        renderer.outputEncoding = THREE.sRGBEncoding;
                        renderer.toneMapping = THREE.ACESFilmicToneMapping;
                        renderer.toneMappingExposure = .01;

                        let model6;

                        assetLoader.load(doghouseUrl.href, function(gltf) {
                            model6 = gltf.scene;
                            scene.add(model6);
                            model6.position.set(0, -4, 0);
                            model6.castShadow = true;
                        }, undefined, function(error) {
                            console.error(error);
                        });


                        let step = 0;

                        function animate(time) {

                            if (model6) {
                                model6.rotation.y = 0 / 2500;
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
                    createScene("doghouse");




                    