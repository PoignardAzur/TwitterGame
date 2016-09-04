// main code of the application

let renderer = PIXI.autoDetectRenderer(512, 512);
let resources = PIXI.loader.resources;
renderer.backgroundColor = 0x000000;

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

let stage = new PIXI.Container();

renderer.render(stage);
