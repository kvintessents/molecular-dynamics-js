# molecular-dynamics-js
Simple Molecular Dynamics Simulator in JavaScript

# TODOs:
- Add Barnes-Hut algorithm. O(n^2) -> O(nlogn)
- Use PIXI.js as renderer
- Add video recording capabilities?
- Use number arrays instead of objects to represent particles (should speed up object copying for web workers)
- Add benchmarking capabilities (fps)
- Add manual particle creator
- Add world edge (particle going over the edge will be deleted from the world)
- Add center-of-mass or average x/y position camera option

# Done
- Add controllable camera