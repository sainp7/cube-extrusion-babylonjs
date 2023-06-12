# cube-extrusion-babylonjs
### Implementaion of Cube Extrusion in babylonjs
Cube Extrusion: The process of scaling a cube by pulling out or pushing in one of it's face along it's normal to alter the structure of that cube.

Implementations: 
1. Gizmo based implementation: Using Gizmo object of babylon-js to implement cube extrusion. A gizmo is tool that allows mouse-controlled translation, rotation and scaling in the 3D Viewport.
2. VerticesData based implementation (Under Work) : Select a face of the cube, and provide the extrusion length. Then simply translate the relevant vertices of the cube to perform extrusion.
 
How to use it: 
1. Double click on the cube to place gizmo on it.
2. Use gizmo overlay to scale and rotate the cube.
3. To perform extrusion, click on of dot on the center of the any of the faces of the cube and move the dot to scale the cube along the normal of that face.

Code Explanation:
1. Create a canvas, engine, scene, camera, and light. Also, create a UI to add buttons and text. Create Buttons and Text Block and add them to UI.
2. For Gizmo based implementation, create an init function to initialize cube, and gizmo. Also, register an action on cube to call a callback function to attach cube to gizmo whenever the cube is double clicked. Also, create a callback function to detach cube from gizmo whenever we click anywhere else than the cube.
3. Add a callback function on gizmo for when we just start dragging gizmo to save the initial position of the cube. And, add another callback function on gizmo for when the scaleBox is dragged to fetch the current position of cube (as gizmo is dragged) Use it to calculate the extrusion length and display it by changing Text of Text Block. Extrusion length is twice the length of displacement of center of cube (midpoint theorem).
4. Add a callback function on reset button to dispose cube and gizmo, reset the text of text block, and call init.
5. For VerticesData based implementation, we do not need gizmo rather we need the vertices data (position kind) of the cube and we'll alter this verticesData to perform extrusion.
6. VerticesData for cube will be an array of 72 floating point numbers, this is because a cube in babylonjs is made up of 6 faces (plane mesh) and each face has 4 vertices. Therefore, we get a 24 total vertices and each Vertex is made up of 3 floating point number to store it's X, Y and, Z coordinate respectively.
7. The face number of the Cube can be simply determined by adding a callback function to onPointerUp on scene to get the faceId of the face that was clicked and each face have 2 face IDs we devide it by 2 to get the face number we want to perform extrusion on.
8. Now, in order to figure out which indices of VerticesData we need to change and by how much to perform extrusion we can refer to faceNoToVerticesMapping list that I have created. The mapping list gives us 24 different indices ranging from 0 to 23, as three consecutive indices from VerticesData array belong to same Vertex. So, we'll perform translation of these vertices and update them in the cube, based on the face of cube we get selected in last step.

See it live: [babylonjs-playground](https://www.babylonjs-playground.com/#HV8MD9#1)
