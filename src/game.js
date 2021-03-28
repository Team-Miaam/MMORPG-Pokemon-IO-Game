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
	update(obj) {
		this.x += this.xspeed;
		this.y += this.yspeed;
		if (
			this.x - obj.x < obj.width &&
			this.x - obj.x > -obj.width &&
			this.y - obj.y < obj.height &&
			this.y - obj.y > -obj.height - 12
		) {
			// if (obj.x > this.x) {
			// 	this.x = obj.x - obj.width;
			// }
			// if (obj.x < this.x) {
			// 	this.x = obj.x + obj.width;
			// }
			if (obj.y > this.y) {
				this.y = obj.y - obj.height - 12;
			}
			if (obj.y < this.y) {
				this.y = obj.y + obj.height;
			}
			// this.y = obj.y - 5;
		}
	},
};
const sketch = (p) => {
	p.preload = () => {
		betamapData = p.loadJSON('../maps/betamap.json');
		//		worldtileData = p.loadJSON('../maps/newmap.json');
		betamapData.worldtilemap = p.loadImage('../images/worldtileset.png');
		tilesetSource = p.loadJSON('../maps/worldtileset.json');
	};
	setInterval(console.log('5 seconds'), 5000);
	p.setup = () => {
		p.createCanvas(1280, 640);
		// console.log(tilesetSource);
		// console.log(worldtileData.layers[0].data.length);
		p.frameRate(15);
		demoWorld = WorldRenderer(betamapData, tilesetSource, 32, 32, player);
	};

	p.draw = () => {
		demoWorld.draw(p);
		// console.log('wtf');
		if (p.keyIsDown(p.LEFT_ARROW)) {
			player.goLeft();
		} else if (p.keyIsDown(p.DOWN_ARROW)) {
			player.goDown();
		} else if (p.keyIsDown(p.UP_ARROW)) {
			player.goUp();
		} else if (p.keyIsDown(p.RIGHT_ARROW)) {
			player.goRight();
		}
	};
};

const game = new p5(sketch, document.getElementById('game'));

// arrow funtion
