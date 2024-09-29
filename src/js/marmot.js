import * as THREE from 'three';
                    import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
                    import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
                    import { RGBELoader } from '../three/examples/jsm/loaders/RGBELoader.js';
                    //import { FilmShader } from 'three/examples/jsm/Addons.js';


                    //import stars from './img/stars.jpg';
                    //may need to replace "Addons.js" with "OrbitControls.js"
                    function createScene(containerId) {

                        
                        const marmotURL = new URL('/static/marmot/marmot.gltf', import.meta.url);

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
                        orbit.minDistance = 9;
                        orbit.maxDistance = 30;
                        orbit.enablePan = false;

                        camera.position.set(8, 10, 6);
                        orbit.update();

                        const ambientLight = new THREE.AmbientLight(0x333333);
                        scene.add(ambientLight);

                        const spotLight = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight);
                        spotLight.position.set(-100, 100, -1000);
                        spotLight.castShadow = true;
                        spotLight.angle = Math.PI/2;
                        spotLight.intensity = 10000000;


                        scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

                        const loader = new THREE.TextureLoader();
                        const textureLoader = new THREE.TextureLoader();

                        const assetLoader = new GLTFLoader();
                        const rgbeLoader = new RGBELoader();

                        renderer.outputEncoding = THREE.sRGBEncoding;
                        renderer.toneMapping = THREE.ACESFilmicToneMapping;
                        renderer.toneMappingExposure = 4;

                        let model;

                        rgbeLoader.load('/static/marmot/MR_INT-005_WhiteNeons_NAD.hdr', function(texture) {
                            texture.mapping = THREE.EquirectangularReflectionMapping;
                            scene.environment = texture;

                            assetLoader.load(marmotURL.href, function(gltf) {
                                model = gltf.scene;
                                scene.add(model);
                                model.position.set(0, -2, 0);
                                model.castShadow = true;
                                model.traverse(function (child) {
                                    // if (child.isMesh) {
                                    //     child.material.color.set(0xFF0099);
                                    // }
                                });
                            })
                        
                        }, undefined, function(error) {
                            console.error(error);
                        });


                        let step = 0;

                        function animate(time) {
                            if (model) {
                                model.rotation.y = 0 / 2500;
                            }

                            renderer.render(scene, camera);
                        }

                        renderer.setAnimationLoop(animate);
                    }

                    createScene("marmot")
                    createScene("marmot2")
                    createScene("marmot3")
                    createScene("marmot4")
                    createScene("marmot5")
                    createScene("marmot6")
                    createScene("marmot7")
                    createScene("marmot8")
                    createScene("marmot9")
                    createScene("marmot10")

