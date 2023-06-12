/// <reference path='./vendor/babylon.d.ts' />

import {createCube ,createButton, createTextBlock, calculateExtrusionDistance, performExtrusion} from './helper.js';

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
        "Extrusion Distance: 0", 
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

    let cube = null;
    let initialPosition = null;
    let pickedFace = null;
    let pointerDown = false;
    
    const init = () => {
        cube = createCube(scene);


        scene.onPointerDown = (evt, pickingInfo) => {
            if(pickingInfo.hit) {
                pickedFace = Math.floor(pickingInfo.faceId/2);
                initialPosition = cube.position;
                console.log(initialPosition);
            }
        }

        scene.onPointerMove = (evt, pickingInfo) =>{
            if(pickedFace != null){
                console.log(scene.pointerX);
                console.log(scene.pointerY);
            }
        }

        scene.onPointerUp = () => {
            pickedFace = null;
            initialPosition = null;
        }
 

    }    
 
    resetButton.onPointerUpObservable.add( () => {
        textBlock.text = "Extrusion Distance: 0";
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
