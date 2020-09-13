import React, {useEffect, useState, useRef} from "react";
import { useListener } from 'react-bus';
import {connect} from 'react-redux'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import glbmodel from "./models/3d_model_6m.glb";
import * as THREE from "three";
import show from "./ShowModel.scss";

let intervalCont = undefined;
let model = undefined;
let countDbl = 0;
const renderer = new THREE.WebGLRenderer({antialias: true});
const camera = new THREE.PerspectiveCamera(80, (window.innerWidth - 300) / 500, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
const scene = new THREE.Scene();
const loader = new GLTFLoader();
const loaderModel = new Promise((resolve, reject) => {
    loader.load(glbmodel, (gltf) => {
        resolve(gltf);
    }, undefined, error => {
        console.log(error);
        reject(error);
    });
});

const Show = ({csvList}) => {
    const canvas = useRef(null);
    const range = useRef(null);
    let [height, setHeight] = useState(0);
    let [time, setTime] = useState(0);
    let [count, setCount] = useState(0);
    let [playStop, setPlayStop] = useState(false);

    const csvListData = () => {
        return csvList[0].data
    };

    const max = () => {
        return csvListData().length;
    };

    const handlerChangeCount = (res) => {
        countDbl = res;
        setCount(countDbl);
    };

    const countTime = () => {
        let data = csvListData();
        let dataLength = max();
        let timeFirst = undefined;
        let timeLast = undefined;
        let time = undefined;
        if(typeof data[0].time === "string") {
            if(data[0].time.indexOf(":") != -1) {
                timeFirst = data[0].time.split(":");
                timeLast = data[dataLength - 1].time.split(":");
                timeFirst =
                    timeFirst[0] * 3600000 +
                    timeFirst[1] * 60000 +
                    timeFirst[2] * 1000 +
                    timeFirst[3];
                timeLast =
                    timeLast[0] * 3600000 +
                    timeLast[1] * 60000 +
                    timeLast[2] * 1000 +
                    timeLast[3];
                time = timeLast - timeFirst;
            } else {
                time = parseFloat(data[dataLength - 1].time.replace(/\,/g, "."))
            }
        } else {
            time = data[dataLength - 1].time;
        }

        return time / dataLength;
    };

    const initInterval = () => {
        intervalCont =  setInterval(() => {
            if (max() - 1 > countDbl) {
                setCount(countDbl++);
                return;
            }
            clearInterval(intervalCont);
        }, countTime());
    };

    const handlerPlay = () => {
        if(!playStop ){ play()} else {stop()};
        setPlayStop(!playStop);
    };

    const play = () => {
        clearInterval(intervalCont);
        initInterval();
    };

    const stop = () => {
        clearInterval(intervalCont);
    };

    const handlerRange = rn => {
        countDbl = parseInt(rn.target.value);
        setCount(countDbl);
    };

    const smoothing = (positionObject, nextVal, coeff) => {
       return nextVal > positionObject + coeff  || nextVal < positionObject - coeff ? nextVal : positionObject;
    };

    const countMath = () => {
        let arr = csvListData();

        let x = 1.57 * arr[count].gfx;
        let y = 1.57 * arr[count].gfy;
        let z = 1.57 * arr[count].gfz;
        let top = 0;

        setHeight(top);
        setTime(arr[count].time);
        let dist = 30;
        if(camera) {
            dist = 100 / (2 * Math.tan(camera.fov * Math.PI / 360));
        }

        return {x, y, z, top, dist};
    };

    const animate = () => {
        controls.update();
        const {x, y, top, dist} = countMath();
        if(model) {
            model.rotation.x = smoothing(model.rotation.x, x, 0.1);
            model.rotation.z = smoothing(model.rotation.z, y, 0.1);
            model.position.y = top;
        }
        renderer.render(scene, camera);
        camera.position.set(0, 60, 160 + dist);
    };

    useEffect(() => {
            animate();
    }, [count]);

    useEffect(() => {
        renderer.setSize(window.innerWidth - 300, 500);
        canvas.current.appendChild(renderer.domElement);
        scene.add(new THREE.GridHelper(window.innerWidth - 300, 100));
        camera.position.set(0, 60, 160);
        const stacy_mtl = new THREE.MeshPhongMaterial({
            emissive: "yellow",
        });
        loaderModel.then(res => {
             model = res.scene;
            res.scene.traverse(o => {
                if (o.isMesh) {
                    o.material = stacy_mtl;
                }
            });
             scene.add(res.scene);
            animate();
        });

    }, []) ;

    useListener("handlerChangeCount", handlerChangeCount);

    return (
        <div>
            <div ref={canvas}></div>
            <div className={show.navigation}>
                <div className={!playStop ? show.play:show.stop} onClick={handlerPlay}></div>
                {/*<div className={show.stop} onClick={stop}></div>*/}
                <input className={show.track} ref={range} type="range" min="0" max={max() - 1} step="1"
                       onChange={handlerRange}
                       value={count}/>
                <div>time: {time} </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
        csvList: state.csvList,
    });


export default connect(
    mapStateToProps,
    []
)(Show);
