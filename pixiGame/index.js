import * as PIXI from 'pixi.js';
import Bump from './bump';
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
let world;

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
	player.playerMovement();
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
		// console.log(world.x, world.y);
		console.log(player.didHit);
	});
}

// player control
