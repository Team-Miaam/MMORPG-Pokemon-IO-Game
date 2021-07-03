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

let playerTex = new PIXI.Texture.from('./images/enemy.png');
let playerSprite = new PIXI.Sprite(playerTex);
let player = new Player();
let camera;
let message;
let leftArrow;
let upArrow;
let downArrow, rightArrow, world;

/* ------------------ setting up game world---------------------- */

let g = new Miaam();
app.loader.add('ash', player.playerSpriteLocation);
player.playerBaseTexture = new PIXI.BaseTexture.from(
	app.loader.resources['ash'].url
);
app.loader.load(doneloading);

console.log(player);

function setup() {
	console.log(world.x);

	player.left.press = () => {
		console.log('left');
		if (!player.playerSprite.playing) {
			player.playerSprite.textures = player.playerSheet.walkWest;
			player.playerSprite.play();
			player.playerSprite.loop = true;
		}
		// Change the player's velocity when the key is pressed
		player.vx = -3;
		player.vy = 0;
		console.log(player.vx, player.vy);
	};

	// Left arrow key `release` method
	player.left.release = () => {
		// If the left arrow has been released, and the right arrow isn't down,
		// and player isn't moving vertically:
		// Stop the player
		if (!player.right.isDown && player.vy === 0) {
			player.vx = 0;
			player.playerSprite.textures = player.playerSheet.standWest;
			player.playerSprite.loop = false;
		}
	};
	// Up
	player.up.press = () => {
		console.log('up');
		if (!player.playerSprite.playing) {
			player.playerSprite.textures = player.playerSheet.walkNorth;
			player.playerSprite.play();
			player.playerSprite.loop = true;
		}
		player.vy = -3;
		player.vx = 0;
		console.log(player.vx, player.vy);
	};
	player.up.release = () => {
		if (!player.down.isDown && player.vx === 0) {
			player.vy = 0;
			player.playerSprite.textures = player.playerSheet.standNorth;
			player.playerSprite.loop = false;
		}
	};

	// Right
	player.right.press = () => {
		console.log('right');
		if (!player.playerSprite.playing) {
			player.playerSprite.textures = player.playerSheet.walkEast;
			player.playerSprite.loop = true;
			player.playerSprite.play();
		}
		player.vx = 3;
		player.vy = 0;
		console.log(player.vx, player.vy);
	};
	player.right.release = () => {
		if (!player.left.isDown && player.vy === 0) {
			player.vx = 0;
			player.playerSprite.textures = player.playerSheet.standEast;
			player.playerSprite.loop = false;
		}
	};

	// Down
	player.down.press = () => {
		console.log('down');
		if (!player.playerSprite.playing) {
			player.playerSprite.textures = player.playerSheet.walkSouth;
			player.playerSprite.loop = true;
			player.playerSprite.play();
		}
		player.vy = 3;
		player.vx = 0;
		console.log(player.vx, player.vy);
	};
	player.down.release = () => {
		if (!player.up.isDown && player.vx === 0) {
			player.vy = 0;
			player.playerSprite.textures = player.playerSheet.standSouth;
			player.playerSprite.loop = false;
		}
	};
}

/* --------------------- game loop ------------------- */

function doneloading() {
	player.createPlayerSheet();
	player.createPlayer();
	console.log(player.playerSprite);
	g.setPlayer(player);
	world = g.makeTiledWorld(
		'./JSON/worldtile.json',
		'./images/worldtilesetmini2.png',
		app.stage
	);
	camera = worldCamera(world, 960, 960);
	app.stage.addChild(world);
	camera.centerOver(player);
	setup();
	app.ticker.add((delta) => {
		// camera.follow(player.sprite);
		player.playerSprite.x += player.vx;
		player.playerSprite.y += player.vy;

		camera.follow(player.playerSprite);
		console.log(world.x, world.y);
	});
}

// player control
