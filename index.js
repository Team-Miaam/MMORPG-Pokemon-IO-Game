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
let camera, message, leftArrow, upArrow, downArrow, rightArrow, world;
function setup() {
	world = makeTiledWorld('./JSON/worldtile.json', './images/worldtilesetmini2.png', app.stage);
	// let playerTex = new PIXI.Texture.from('./images/enemy.png');
	// const player = new PIXI.Sprite(playerTex);
	// player.x = 480;
	// player.y = 480;
	// let objlayer = world.getObject('objects');
	// objlayer.addChild(player);
	// console.log(objlayer);
	// app.stage.addChild(player);
	console.log(world);

	//let objectsLayer = world.getObject('objects');
}
setup();
