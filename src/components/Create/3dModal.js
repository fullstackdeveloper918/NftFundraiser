import { useState, useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Source } from "three";

function loadGLTFModel(scene, glbPath, options) {
    const { receiveShadow, castShadow } = options;
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(


            glbPath,
            (gltf) => {
                const obj = gltf.scene;
                obj.name = "dinosaur";
                obj.position.y = 0;
                obj.position.x = 0;
                obj.receiveShadow = receiveShadow;
                obj.castShadow = castShadow;
                scene.add(obj);

                obj.traverse(function (child) {
                    if (child.isMesh) {
                        child.castShadow = castShadow;
                        child.receiveShadow = receiveShadow;
                    }
                });

                resolve(obj);
            },
            undefined,
            function (error) {
                console.log(error);
                reject(error);
            }
        );
    });
}

function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 4));
}

const DModal = ({ vdo }) => {
    // debugger
    // const { vdo } = props
    const refContainer = useRef();
    const [loading, setLoading] = useState(true);
    const [renderer, setRenderer] = useState();
    const [source, setSource] = useState('')
    console.log('source', source)

    useEffect(() => {
        // debugger
        const file = vdo;
        // if (file?.name?.includes("gltf")) {

        //     const gltfToGlb = gltfPipeline.gltfToGlb;
        //     const gltf = fsExtra.readJsonSync(file);
        //     gltfToGlb(gltf).then(function (results) {
        //         fsExtra.writeFileSync(file, results.glb);
        //     });
        //     console.log('yessss')
        // }
        // let url = URL.createObjectURL(file);
        // url = window.URL.createObjectURL(new Blob([url]));
        // // const url = window.URL.createObjectURL(new Blob([Response.data]));
        // // this?.loaders?.gltfLoader?.load(url, (file) => {

        // // });

        // setSource(url);

        const { current: container } = refContainer;
        if (container && !renderer) {
            const scW = container.clientWidth;
            const scH = container.clientHeight;
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(scW, scH);
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild(renderer.domElement);
            setRenderer(renderer);

            const scene = new THREE.Scene();
            const scale = 5.6;
            const camera = new THREE.OrthographicCamera(
                -scale,
                scale,
                scale,
                -scale,
                0.01,
                50000
            );
            const target = new THREE.Vector3(-0.5, 1.2, 0);
            const initialCameraPosition = new THREE.Vector3(
                20 * Math.sin(0.2 * Math.PI),
                10,
                20 * Math.cos(0.2 * Math.PI)
            );
            const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
            scene.add(ambientLight);
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = false;
            controls.enableZoom = true;
            controls.minDistance = 0
            controls.minZoom = 0
            controls.target = target;

            const loader = new GLTFLoader()

            loader.load(
                file,
                function (gltf) {
                    gltf.scene.traverse(function (child) {
                        if (child.isMesh) {
                            const m = child
                            m.receiveShadow = true
                            m.castShadow = true
                        }
                        if (child.isLight) {
                            const l = child
                            l.castShadow = true
                            l.shadow.bias = -0.003
                            l.shadow.mapSize.width = 2048
                            l.shadow.mapSize.height = 2048
                        }
                    })
                    scene.add(gltf.scene)
                },
                (xhr) => {
                    animate();
                    setLoading(false);
                    // mdl(file)
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    // debugger
                    console.log(error)
                }
            )
            // loadGLTFModel(url, function (gltf) {
            //     const model = gltf.scene;
            //     URL.revokeObjectURL(url);
            // }, function () { }, function () {
            //     URL.revokeObjectURL(url);
            // }).

            // loadGLTFModel(scene, url, {
            //     receiveShadow: false,
            //     castShadow: false
            // })

            let req = null;
            let frame = 0;
            const animate = () => {
                req = requestAnimationFrame(animate);
                frame = frame <= 100 ? frame + 1 : frame;

                if (frame <= 100) {
                    const p = initialCameraPosition;
                    const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

                    camera.position.y = 10;
                    camera.position.x =
                        p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
                    camera.position.z =
                        p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
                    camera.lookAt(target);
                } else {
                    controls.update();
                }

                renderer.render(scene, camera);
            };

            return () => {
                cancelAnimationFrame(req);
                renderer.dispose();
            };
        }
    }, [vdo]);

    return (

        <div
            style={{ height: "300px", width: "330px", position: "relative" }}
            ref={refContainer}
        >

            {loading && (
                <span style={{ position: "absolute", left: "50%", top: "50%" }}>
                    Loading...
                </span>
            )}

        </div>

    );
};
export default DModal
// export default function App() {
//   return (
//     <div style={{ width: "100%", margin: "0 auto" }}>
//       <p>Click and hold to move around</p>
//       <p>
//         Credits for the model: "Dinosaur" (https://skfb.ly/6ZBXA) by
//         jeilocreativedesignworld is licensed under Creative Commons Attribution
//         (http://creativecommons.org/licenses/by/4.0/).
//       </p>
//       <Dinosaur />
//     </div>
//   );
// }
