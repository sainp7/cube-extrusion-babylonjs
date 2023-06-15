/// <reference path='./vendor/babylon.d.ts' />

import {createCube ,createButton, createTextBlock, computeNormalInCameraSpace, computeExtrusionLength, calculateDistanceBetweenOppositeFaces, performExtrusion, calculateActualExtrusionLength} from './helper.js';

window.addEventListener('DOMContentLoaded', function () {
    let canvas = document.getElementById("renderCanvas");
    let engine = new BABYLON.Engine(canvas, true);
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, 5));
    camera.attachControl(canvas, true);
    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 10, 0), scene);
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    let textBlock = createTextBlock(
        "Extrusion Length: 0", 
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT, 
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    );
    advancedTexture.addControl(textBlock);

    let resetButton = createButton(
        "reset-button", 
        "Reset", 
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT, 
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    );

    let cube;
    let pickedFace = null;
    let initialPointerX;
    let initialPointerY;
    let initialVertices;
    let cameraSpaceNormal;
    let distanceBetweenOppositeFaces;
    let indices;

    const init = () => {
        cube = createCube(scene);
        indices = cube.getIndices();
        
        scene.onPointerDown = (evt, pickingInfo) => {
            if(!pickingInfo.hit) {
                return;
            }
            pickedFace = Math.floor(pickingInfo.faceId/2);
            console.log(pickedFace);
            camera.detachControl(canvas);
            initialPointerX = scene.pointerX;
            initialPointerY = scene.pointerY;
            initialVertices = cube.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            cameraSpaceNormal = computeNormalInCameraSpace(initialVertices, pickedFace, camera);
            distanceBetweenOppositeFaces = calculateDistanceBetweenOppositeFaces(pickedFace, initialVertices);
        }
        
        scene.onPointerMove = () => {
            if(pickedFace == null) {
                return;
            }
            let extrusionLength =  computeExtrusionLength(initialPointerX, scene.pointerX, initialPointerY, scene.pointerY, cameraSpaceNormal, pickedFace);
            let actualExtrusionLength = calculateActualExtrusionLength(pickedFace, extrusionLength);
            extrusionLength = (pickedFace === 1 || pickedFace === 2 || pickedFace === 5) ? (-1) * extrusionLength : extrusionLength;

            if(distanceBetweenOppositeFaces + actualExtrusionLength <= 0){
                return;
            }
            performExtrusion(cube, initialVertices, pickedFace, indices, extrusionLength);
            textBlock.text = "Extrusion Length: " + actualExtrusionLength;
        }
        
        scene.onPointerUp = () => {
            if(pickedFace == null){
                return;
            }
            pickedFace = null;
            camera.attachControl(canvas);
        }
    }    
 
    resetButton.onPointerUpObservable.add( () => {
        textBlock.text = "Extrusion Length: 0";
        cube.dispose();
        pickedFace = null;
        init();
    });
    advancedTexture.addControl(resetButton);

    init();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
});
