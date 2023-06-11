/// <reference path='./vendor/babylon.d.ts' />

import {createCube ,createButton, createTextBlock, calculateExtrusionDistance, performExtrusion} from './helper.js';

window.addEventListener('DOMContentLoaded', function () {
    // Create a Babylon.js engine
    let canvas = document.getElementById("renderCanvas");
    let engine = new BABYLON.Engine(canvas, true);

    // Create a scene
    let scene = new BABYLON.Scene(engine);

    // Create a camera
    let camera = new BABYLON.ArcRotateCamera(
        "camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, 5));
    camera.attachControl(canvas, true);

    // Create a light
    let light = new BABYLON.HemisphericLight(
        "light", new BABYLON.Vector3(0, 10, 0), scene);

    // Create a cube with Action Manager
    let cube = createCube(scene);

    // Create GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //Create a TextBlock
    var textBlock = createTextBlock(
        "Extrusion Distance: 0", 
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT, 
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    );
    advancedTexture.addControl(textBlock);

    // Create a Reset Button
    var resetButton = createButton(
        "reset-button", 
        "Reset", 
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT, 
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    );

    // Create a Extrusion Button
    var extrusionButon = createButton(
        "extrusion-button", 
        "Perform Extrusion", 
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT, 
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
        "20%"
    );

    //Create a Gizmo
    let gizmo = new BABYLON.BoundingBoxGizmo(BABYLON.Color3.FromHexString("#0984e3"));
    gizmo.attachedMesh = null;

    //Attach action to cube
    cube.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnDoublePickTrigger,
             () => gizmo.attachedMesh = cube
        )
    );
    
    let pickedFace = null;
    scene.onPointerUp = (evt, pickingInfo)  => { 
        if(pickingInfo.hit){
            pickedFace = Math.floor(pickingInfo.faceId/2);
        }
    }
    
    //To remove gizmo clicking elsewhere
    scene.onPointerObservable.add((p)=>{
        if(p.type === BABYLON.PointerEventTypes.POINTERDOWN){
            gizmo.attachedMesh = null;
        }
    })
    
    // Clip initial position of Cube
    let initialPosition = null;
    gizmo.onDragStartObservable.add( () => {
        initialPosition = Object.values(cube.position).slice(1);
    })

    // Calculate Extrusion length and display it
    gizmo.onScaleBoxDragObservable.add( () => {
        let currentPosition = Object.values(cube.position).slice(1);
        textBlock.text = calculateExtrusionDistance(initialPosition, currentPosition);
    });

    // Define reset button actions
    resetButton.onPointerUpObservable.add( () => {
        textBlock.text = "Extrusion Distance: 0";
        gizmo.dispose();
        cube.dispose();
        cube = createCube(scene);
        gizmo = new BABYLON.BoundingBoxGizmo(BABYLON.Color3.FromHexString("#0984e3"));
        gizmo.attachedMesh = null;
        cube.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnDoublePickTrigger, 
                () => gizmo.attachedMesh = cube
            )
        );
    });
    advancedTexture.addControl(resetButton);

    // Define Extrusion button actions
    extrusionButon.onPointerUpObservable.add( () => {
        cube = performExtrusion(cube, pickedFace, 1);
    });
    //advancedTexture.addControl(extrusionButon); //Disabled for now
    
    // Run the render loop
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Resize the Babylon.js engine on window resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
});
