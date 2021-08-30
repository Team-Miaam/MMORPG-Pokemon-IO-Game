import * as PIXI from 'pixi.js';
import Miaam from './Miaam';
import Player from './Player';
import worldCamera from './Camera';
import { Text } from 'pixi.js';
import TextManager from './TextManager';

/* ------ pixi init -------- */
let app = new PIXI.Application({
	width: 512,
	height: 512,
	antialias: true,
	transparent: false,
	resolution: 1,
});
document.body.appendChild(app.view);

/* ------------varaibles-------------- */
let player = new Player();
let camera;

/* ------------------ setting up game world---------------------- */
let textManager = new TextManager();
let g = new Miaam();
// let g2 = new Miaam();

app.loader.add('ash', player.playerSpriteLocation);
player.playerBaseTexture = new PIXI.BaseTexture.from(
	app.loader.resources['ash'].url
);
app.loader.load(doneloading);

console.log(player);

function setup() {
<<<<<<< Updated upstream
	player.playerMovement();
}

/* --------------------- game loop ------------------- */

function doneloading() {
	player.createPlayerSheet();
	player.createPlayer();
	console.log(player.playerSprite);
	g.setPlayer(player);
	const world = g.makeTiledWorld(
		'./JSON/worldtile.json',
		'./images/worldtilesetmini2.png',
		app.stage
=======
	player.playerAnimationLoadProto(app);
	player.playerSetup();
	g.setPlayer(player);
	let world;
	textManager.getApp(app);
	// world = g.makeTiledWorld(
	// 	'./JSON/worldtile.json',
	// 	'./images/worldtilesetmini2.png'
	// );
	// // console.log(world);
	// g.resetLoader();
	// console.log(world);
	world = g.makeTiledWorld(
		'./JSON/level2.json',
		'./images/worldtilesetmini2.png'
>>>>>>> Stashed changes
	);
	camera = worldCamera(world, 960, 960);
	app.stage.addChild(world);
	textManager.textKeyboardControl();
	let smltext = 'player pos: ';
	let smltexttt = 'aflkhauhehgouhgouohwoeeghauieg';

	let smallText = new PIXI.Text(smltext);

	// app.stage.addChild(textManager.textBoxinit());
	//	app.stage.addChild(smallText);
	camera.centerOver(player);
	setup();
	let index = {};
<<<<<<< Updated upstream
	let xOff = 8;
	let yOff = 24;
=======
	let xOff = 0; // modulo(tile_Width - player_Width)
	let yOff = 11; // modulo(tile_Height - player_HEIGHT) + 9;
>>>>>>> Stashed changes
	console.log(`Tiled Map:`);
	app.ticker.add((delta) => {
		// camera.follow(player.sprite);
		camera.follow(player.playerSprite);
		player.playerSprite.x += player.vx;
		player.playerSprite.y += player.vy;

		if (world.tiledMap) {
			index.pos =
				Math.floor((player.playerSprite.y + yOff) / world.tiledMap.tileheight) *
					30 +
				Math.floor((player.playerSprite.x + xOff) / world.tiledMap.tilewidth);
			index.neg =
				Math.floor((player.playerSprite.y + yOff) / world.tiledMap.tileheight) *
					30 +
				Math.floor((player.playerSprite.x - xOff) / world.tiledMap.tilewidth);
			if (
				world.tiledMap.layers[1].data[index.pos] !== 0 ||
				world.tiledMap.layers[1].data[index.neg] !== 0
			) {
				console.log(index, world.tiledMap.layers[1].data[index]);
				player.playerSprite.x -= player.vx;
				player.playerSprite.y -= player.vy;
			}
		}
		smallText.text =
			smltext + player.playerSprite.x + ' ' + player.playerSprite.y;
	});
}

// player control
