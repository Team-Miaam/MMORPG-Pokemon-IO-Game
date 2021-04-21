//     Application = PIXI.Application,
//     loader = PIXI.loader,
//     resources = PIXI.loader.resources,
//     Sprite = PIXI.Sprite;
//     TextureCache = PIXI.utils.TextureCache

let app = new PIXI.Application({
	width: 960,
	height: 960,
	antialias: true,
	transparent: false,
	resolution: 1,
});
document.body.appendChild(app.view);
//let world = makeTiledWorld('JSON/worldtile.json', 'images/worldtileset.png');
let camera, message, leftArrow, upArrow, downArrow, rightArrow;
let world;
let num = 13;
function setup() {
	world = makeTiledWorld('./JSON/worldtile.json', './images/worldtilesetmini2.png', app.stage);
	num = 12;
	console.log(world);
}
setup();
