# cube-extrusion-babylonjs
### Implementaion of Cube Extrusion in babylonjs
Cube Extrusion: The process of scaling a cube by pulling out or pushing in one of it's face along it's normal to alter the structure of that cube.
 
How to use it: Simply click on a face of the cube and start dragging it in or out to perform extrusion

How it works: For a selected side of the cube, vertices are filtered and translated in real time to perform cube extrusion based on the movement of your mouse.

Code Explanation:
1. Create a canvas, engine, scene, camera, and light. Also, create a UI to add buttons and text. Create Buttons and Text Block and add them to UI.
2. Add a callback function on reset button to dispose cube, reset the text of text block, and call init.
3. We add a callback function on pointer down to detach camera control and store the followings:
   1. Picked Face
   2. Positon of pointer 
   3. Vertices Data
   4. Normal of selected face wrt camera
   5. Distance betweeen the selected face and the face opposite to it.
4. We add another callback function on pointer move to compute extrusion length based on mouse movement, verify if extrusion is valid, perform extrusion, and display extrusion length in text block.
   1. To compute extrusion length we do a scalar multiplication of change in pointer's position and normal of the selected face(wrt camera). this gives us the extrusion length.
   2. To verify if extrusion is valid, we check the distance between faces should not go below zero after performing extrusion.
   3. To perform extrusion we translate the relevant vertices of the cube such that the face appears to move in and out along it's normal.
5. Lastly we add another callback function on pointer up to set all the values we stored in on pointer down's callback as null and re attach camera control.
6. Important things to know:
   1. Vertices data of the cube is an array of 72 floating point numbers, this is because a cube in babylonjs is made up of 6 faces (plane mesh) and each face has 4 vertices. Therefore, we get a 24 total vertices and each Vertex is denoted by 3 floating point number( X, Y and, Z) in 3D space.
   2. We require 12 vertices to perform extrusion on a face, 4 of that face and 2 each from it's neighbouring 4 faces. So, we have created a list that gives us indices of vertices that we need to translate in order to perform extrusion on that face.

Limitations:
1. Only works for non rotated cube. To make it work with rotated cube we need get the projection of extrusion length in all 3 axis and translate x, y and z co-ordinates of relevant vertices respectively. Then we'll need to make changes in computeNormalInCameraSpace function in helper.js.
2. Faces along X axis (i.e face 2 and face 3) doesn't move when aligned vertically(i.e. along Y axis). To fix this we need to debug the computeNormalInCameraSpace function in helper.js.

See it live here: [babylonjs-playground](https://www.babylonjs-playground.com/#FE11CH#1)
