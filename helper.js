const createCube = (scene) => {
    let cube = BABYLON.MeshBuilder.CreateBox("box", {
        size: 1,
        updatable: true
   }, scene, true);
   cube.actionManager = new BABYLON.ActionManager(scene);
   return cube;
}

const createButton = (name, text, horizontalAlignment, verticalAlignment, width = "7%") => {
    var button = BABYLON.GUI.Button.CreateSimpleButton(name,text);
    button.width = width;
    button.height = "6%";
    button.color = "white";
    button.fontSize = "4%";
    button.cornerRadius = 20;
    button.background = "green";
    button.horizontalAlignment = horizontalAlignment;
    button.verticalAlignment = verticalAlignment;
    return button;
    }

const createTextBlock = (text, textHorizontalAlignment, textVerticalAlignment) => {
    var textBlock = new BABYLON.GUI.TextBlock();
    textBlock.text = text;
    textBlock.color = "white";
    textBlock.fontSize = "5%";
    textBlock.background = "green";
    textBlock.textHorizontalAlignment = textHorizontalAlignment;
    textBlock.textVerticalAlignment = textVerticalAlignment;
    return textBlock;
}

const calculateExtrusionDistance = (initialPositionList, currentPositionList) => {
    let sumOfDeltaSquare = 0;
    for(let itr  = 0; itr < currentPositionList.length; ++itr ){
        sumOfDeltaSquare += Math.pow(initialPositionList[itr] - currentPositionList[itr], 2)
    }
    return Math.sqrt(sumOfDeltaSquare) * 2;
}

const performExtrusion  = (cube, pickedFace, extrusionLength) => {
    let currentVertices = cube.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    let axis = (Math.floor(pickedFace/2) + 2) % 3; // Add two to correct picked axis.
    for(let i = 0; i < FaceNoToVerticesMapping[pickedFace].length; i++){
        if(pickedFace % 2 === 0){
            currentVertices[FaceNoToVerticesMapping[pickedFace][i]* 3 + axis] += extrusionLength;
        }
        else{
            currentVertices[FaceNoToVerticesMapping[pickedFace][i]* 3 + axis] -= extrusionLength;
        }
            
    }
    cube.updateVerticesData(BABYLON.VertexBuffer.PositionKind, currentVertices);
    return cube;
}

const FaceNoToVerticesMapping = [
    [0,1,2,3,10,11,12,13,16,19,20,23], // Face 0
    [4,5,6,7,8,9,14,15,17,18,21,22], //  Face 1
    [0,3,4,7,8,9,10,11,18,19,20,21], // Face 2
    [1,2,5,6,12,13,14,15,16,17,22,23], // Face 3
    [2,3,4,5,8,11,12,15,16,17,18,19], // Face 4
    [0,1,6,7,9,10,13,14,20,21,22,23] //Face 5
];


export {createCube, createButton, createTextBlock, calculateExtrusionDistance, performExtrusion};