import p5 from 'p5';
import WorldRenderer from './WorldRenderer.js';
let lar = false;
let rar = false;
let uar = false;
let dar = false;
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
	velocity: 4,
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
			this.x > obj.x - obj.width &&
			this.x < obj.x + obj.width &&
			this.y > obj.y - obj.height &&
			this.y < obj.y + obj.height
		) {
			// this.velocity = this.velocity * -1;
			// this.velocity = this.velocity * 0;
			if (rar) {
				this.x = obj.x - obj.width;
			} else if (lar) {
				this.x = obj.x + obj.width;
			} else if (dar) {
				this.y = obj.y - obj.height;
			} else if (uar) {
				this.y = obj.y + obj.height;
			}
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
			lar = true;
			rar = false;
			uar = false;
			dar = false;
		} else if (p.keyIsDown(p.DOWN_ARROW)) {
			player.goDown();
			lar = false;
			rar = false;
			uar = false;
			dar = true;
		} else if (p.keyIsDown(p.UP_ARROW)) {
			player.goUp();
			lar = false;
			rar = false;
			uar = true;
			dar = false;
		} else if (p.keyIsDown(p.RIGHT_ARROW)) {
			player.goRight();
			lar = false;
			rar = true;
			uar = false;
			dar = false;
		}
	};
};

const game = new p5(sketch, document.getElementById('game'));

// arrow funtion
