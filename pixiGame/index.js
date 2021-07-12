import * as PIXI from 'pixi.js';
import Miaam from './Miaam';
import Player from './Player';
import worldCamera from './Camera';

/* ------ pixi init -------- */
const app = new PIXI.Application({
	width: 512,
	height: 512,
	antialias: true,
	transparent: false,
	resolution: 1,
});
document.body.appendChild(app.view);

function setup(loader, resources) {
	console.log(resources);
	/* ------------varaibles-------------- */
	/* ------------------ setting up game world---------------------- */

	const game = new Miaam();
	const player = new Player(
		resources.playerSpritePNG,
		resources.playerAnimationJSON
	);
	// let playerMetaData = app.loader.resources['playerjson'].data;
	// console.log(playerMetaData);
	game.setPlayer(player);
	const world = game.makeTiledWorld(
		resources.worldTileMapJSON,
		resources.worldTileSetPNG.texture
	);
	const camera = worldCamera(world, 960, 960);
	app.stage.addChild(world);
	camera.centerOver(player);
	player.playerMovement();
	let index = {};
	let xOff = 0;
	let yOff = 10.5;

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

app.loader
	.add('worldTileMapJSON', './JSON/worldTile.json')
	.add('worldTileSetPNG', './images/worldtilesetmini2.png')
	.add('playerSpritePNG', './images/Webp.net-resizeimage.png')
	.add('playerAnimationJSON', './JSON/playerAnimation.json')
	.load(setup);
