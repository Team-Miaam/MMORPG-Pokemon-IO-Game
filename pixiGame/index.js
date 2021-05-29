//     Application = PIXI.Application,
//     loader = PIXI.loader,
//     resources = PIXI.loader.resources,
//     Sprite = PIXI.Sprite;
//     TextureCache = PIXI.utils.TextureCache
import * as PIXI from 'pixi.js';
import Miaam from './Miaam';
import Player from './Player';
import worldCamera from './Camera';

let app = new PIXI.Application({
	width: 512,
	height: 512,
	antialias: true,
	transparent: false,
	resolution: 1,
});
document.body.appendChild(app.view);
// let world = makeTiledWorld('JSON/worldtile.json', 'images/worldtileset.png');

let playerTex = new PIXI.Texture.from('./images/enemy.png');
let playerSprite = new PIXI.Sprite(playerTex);
let player = new Player(playerSprite);
let camera;
let message;
let leftArrow;
let upArrow;
let downArrow, rightArrow, world;
let g = new Miaam();
g.setPlayer(player);
world = g.makeTiledWorld(
	'./JSON/worldtile.json',
	'./images/worldtilesetmini2.png',
	app.stage
);
app.stage.addChild(world);
console.log(world.objects);
camera = worldCamera(world, 960, 960);
camera.centerOver(player.sprite);

// player control
function setup() {
	console.log(player.sprite);
	console.log(world.x);

	// camera.centerOver(player.sprite);

	player.left.press = () => {
		console.log('left');
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
		}
	};
	// Up
	player.up.press = () => {
		console.log('up');
		player.vy = -3;
		player.vx = 0;
		console.log(player.vx, player.vy);
	};
	player.up.release = () => {
		if (!player.down.isDown && player.vx === 0) {
			player.vy = 0;
		}
	};

	// Right
	player.right.press = () => {
		console.log('right');
		player.vx = 3;
		player.vy = 0;
		console.log(player.vx, player.vy);
	};
	player.right.release = () => {
		if (!player.left.isDown && player.vy === 0) {
			player.vx = 0;
		}
	};

	// Down
	player.down.press = () => {
		console.log('down');
		player.vy = 3;
		player.vx = 0;
		console.log(player.vx, player.vy);
	};
	player.down.release = () => {
		if (!player.up.isDown && player.vx === 0) {
			player.vy = 0;
		}
	};
}

console.log(world);
setup();
app.ticker.add((delta) => {
	// camera.follow(player.sprite);
	player.sprite.x += player.vx;
	player.sprite.y += player.vy;

	camera.follow(player.sprite);
	console.log(world.x, world.y);
	// count += 0.005;
	// player.sprite.x += player.vx;
	// if (!(player.sprite.x < 950) || !(player.sprite.x > 10)) {
	// 	player.sprite.anchor.set(0.5);
	// 	player.sprite.scale.x *= -1;
	// 	player.vx *= -1;
	// 	console.log(player.sprite.x);
	// }
});
