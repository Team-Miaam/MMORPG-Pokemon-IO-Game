import p5 from 'p5';
import WorldRenderer from './WorldRenderer.js';

let betamapData;
let worldtilemap;
let worldtileData;
let tilesetSource;
let demoWorld;
let player = {
	x: 50,
	y: 50,
	height: 32,
	width: 32,
	xspeed: 0,
	yspeed: 0,
	velocity: 3,
	goLeft() {
		this.x -= this.velocity;
	},
	goRight() {
		this.x += this.velocity;
	},
	goUp() {
		this.y -= this.velocity;
	},
	goDown() {
		this.y += this.velocity;
	},
	show(p) {
		p.fill(51);
		p.rect(this.x, this.y, this.width, this.height);
	},
	update() {
		this.x += this.xspeed;
		this.y += this.yspeed;
	},
};
const sketch = (p) => {
	p.preload = () => {
		betamapData = p.loadJSON('../maps/betamap.json');
		worldtileData = p.loadJSON('../maps/newmap.json');
		betamapData.worldtilemap = p.loadImage('../images/worldtileset.png');
		tilesetSource = p.loadJSON('../maps/worldtileset.json');
	};
	p.setup = () => {
		p.createCanvas(960, 640);
		// console.log(tilesetSource);
		// console.log(worldtileData.layers[0].data.length);
		p.frameRate(30);
		demoWorld = WorldRenderer(betamapData, tilesetSource, 32, 32, player);
	};

	p.draw = () => {
		// p.background(0);
		// p.image(worldtilemap, 0, 0, 32, 32, 32 * 6, 32 * 0, 32, 32);
		// p.image(worldtilemap, 32, 0, 32, 32, 32 * 7, 32 * 0, 32, 32);
		// p.image(worldtilemap, 0, 32, 32, 32, 32 * 6, 32 * 1, 32, 32);
		// p.image(worldtilemap, 32, 32, 32, 32, 32 * 7, 32 * 1, 32, 32);
		// p.image(worldtilemap, 32, 0, 32, 32, 32, 1984 + 32, 32, 32);
		demoWorld.draw(p);
		// console.log('wtf');
		if (p.keyIsDown(p.LEFT_ARROW)) {
			player.goLeft();
			console.log('left');
		} else if (p.keyIsDown(p.DOWN_ARROW)) {
			player.goDown();
			console.log(' down');
		} else if (p.keyIsDown(p.UP_ARROW)) {
			player.goUp();
			console.log(' up');
		} else if (p.keyIsDown(p.RIGHT_ARROW)) {
			player.goRight();
			console.log(' right');
		}
	};
};

const game = new p5(sketch, document.getElementById('game'));

// arrow funtion
