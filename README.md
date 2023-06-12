# cube-extrusion-babylonjs
### Implementaion of Cube Extrusion in babylonjs
Cube Extrusion: The process of scaling a cube by pulling out or pushing in one of it's face along it's normal to alter the structure of that cube.

Implementations: 
1. Gizmo based implementation: Using Gizmo object of babylon-js to implement cube extrusion. A gizmo is tool that allows mouse-controlled translation, rotation and scaling in the 3D Viewport.
2. Vertices based implementation (Under Work) : Select a face of the cube, and provide the extrusion length. Then simply translate the relevant vertices of the cube to perform extrusion.
 
How to use it: 
1. Double click on the cube to place gizmo on it.
2. Use gizmo overlay to scale and rotate the cube.
3. To perform extrusion, click on of dot on the center of the any of the faces of the cube and move the dot to scale the cube along the normal of that face.

Code Explanation:
1. Create a canvas, engine, scene, camera, and light. Also, a UI to add buttons and text.
2. Create Buttons and Text Block and add them to UI.
3. Create an init function to initialize cube, and gizmo. Register an action on cube to call a callback function to attach cube to gizmo whenever the cube is double clicked. Also, create a callback function to detach cube from gizmo whenever we click anywhere else than the cube.
4. Add a callback function on gizmo for when we just start dragging gizmo to save the initial position of the cube. And, add another callback function on gizmo for when the scaleBox is dragged to fetch the current position of cube (as gizmo is dragged) Use it to calculate the extrusion length and display it by changing Text of Text Block. Extrusion length is twice the length of displacement of center of cube (midpoint theorem).
5. Add a callback function for reset button to dispose cube and gizmo, reset the text of text block, and call init.

See it live: [babylonjs-playground](https://www.babylonjs-playground.com/#HV8MD9#1)
