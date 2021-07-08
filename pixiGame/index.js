import * as PIXI from 'pixi.js';
import Miaam from './Miaam';
import Player from './Player';
import worldCamera from './Camera';

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

let g = new Miaam();

function playerAnimationLoadProto(animJson, animSpritesheet) {
	app.loader.add('player', animSpritesheet).add('playerjson', animJson);
	player.playerBaseTexture = new PIXI.BaseTexture.from(
		app.loader.resources['player'].url
	);
	app.loader.load(setup);
}

playerAnimationLoadProto(
	'./JSON/playerAnimation.json',
	player.playerSpriteLocation
);
function playerSetup() {
	player.createPlayerSheet();
	player.createPlayer();
}

function setup() {
	// let playerMetaData = app.loader.resources['playerjson'].data;
	// console.log(playerMetaData);
	playerSetup();
	g.setPlayer(player);
	const world = g.makeTiledWorld(
		'./JSON/worldtile.json',
		'./images/worldtilesetmini2.png'
	);
	camera = worldCamera(world, 960, 960);
	app.stage.addChild(world);
	camera.centerOver(player);
	player.playerMovement();
	let index = {};
	let xOff = 0;
	let yOff = 10.5;
	console.log(`Tiled Map:`);

	/* --------------------- game loop ------------------- */
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
				// console.log(index, world.tiledMap.layers[1].data[index]);
				player.playerSprite.x -= player.vx;
				player.playerSprite.y -= player.vy;
			}
		}
	});
}

// player control
