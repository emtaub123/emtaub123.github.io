import * as THREE from 'three';
                    import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
                    import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader.js';
                    import { RGBELoader } from '../three/examples/jsm/loaders/RGBELoader.js';
                    //import { FilmShader } from 'three/examples/jsm/Addons.js';


                    //import stars from './img/stars.jpg';
                    //may need to replace "Addons.js" with "OrbitControls.js"
                    function createScene(containerId) {

                        
                        const yuzuURL = new URL('/static/yuzu/yuzu.gltf', import.meta.url);

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
                        orbit.minDistance = .8;
                        orbit.maxDistance = 4;
                        orbit.enablePan = false;

                        camera.position.set(1, 1, .8);
                        orbit.update();

                        const ambientLight = new THREE.AmbientLight(0x333333);
                        scene.add(ambientLight);

                        const spotLight = new THREE.SpotLight(0xFFFFFF);
                        scene.add(spotLight);
                        spotLight.position.set(-100, 100, -1000);
                        spotLight.castShadow = true;
                        spotLight.angle = Math.PI/2;
                        spotLight.intensity = 100000;


                        scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

                        const loader = new THREE.TextureLoader();
                        const textureLoader = new THREE.TextureLoader();

                        const assetLoader = new GLTFLoader();
                        const rgbeLoader = new RGBELoader();

                        renderer.outputEncoding = THREE.sRGBEncoding;
                        renderer.toneMapping = THREE.ACESFilmicToneMapping;
                        renderer.toneMappingExposure = 4;

                        let model5;

                        rgbeLoader.load('/static/yuzu/MR_INT-005_WhiteNeons_NAD.hdr', function(texture) {
                            texture.mapping = THREE.EquirectangularReflectionMapping;
                            scene.environment = texture;
                        
                            assetLoader.load(yuzuURL.href, function(gltf) {
                                model5 = gltf.scene;
                                scene.add(model5);
                                model5.position.set(0, 0, 0);
                                model5.castShadow = true;
                                model5.traverse(function (child) {
                                });
                            })
                        }, undefined, function(error) {
                            console.error(error);
                        });


                        let step = 0;

                        function animate(time) {
                            if (model5) {
                                model5.rotation.y = 0 / 2500;
                            }

                            renderer.render(scene, camera);
                        }

                        renderer.setAnimationLoop(animate);
                    }

                    createScene("yuzu")


