import { useState, useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 4));
}

const DModal = ({ vdo }) => {

    const refContainer = useRef();
    const [loading, setLoading] = useState(true);
    const [renderer, setRenderer] = useState();

    useEffect(() => {
        const file = vdo;
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
                },
                (error) => {
                    // 
                    console.log(error)
                }
            )
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
            style={{ height: "270px", width: "300px", position: "relative" }}
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
