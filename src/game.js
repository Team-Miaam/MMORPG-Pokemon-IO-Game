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
let playerAnim;
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
		// p.fill(51);
		// p.rect(this.x, this.y, this.width, this.height);

		if (!rar && !lar && !uar && !dar) {
			p.image(playerAnim.srcImg, this.x, this.y, 32, 32, 0, 0, 32, 32);
		} else if (dar) {
			let i;
			for (i = 0.1; i < 4; i += 1) {
				p.image(playerAnim.srcImg, this.x, this.y, 32, 32, 32 * i, 32 * 0, 32, 32);
			}
			i = 0;
		} else if (lar) {
			let i;
			for (i = 0; i < 4; i += 1) {
				p.image(playerAnim.srcImg, this.x, this.y, 32, 32, 32 * i, 32 * 1, 32, 32);
			}
			i = 0;
		} else if (rar) {
			let i;
			for (i = 0; i < 4; i += 1) {
				p.image(playerAnim.srcImg, this.x, this.y, 32, 32, 32 * i, 32 * 2, 32, 32);
			}
			i = 0;
		} else if (uar) {
			let i;
			for (i = 0; i < 4; i += 1) {
				p.image(playerAnim.srcImg, this.x, this.y, 32, 32, 32 * i, 32 * 3, 32, 32);
			}
			i = 0;
		}
	},
	update(obj) {
		this.x += this.xspeed;
		this.y += this.yspeed;
		if (this.x > obj.x - 32 && this.x < obj.x + 32 && this.y > obj.y - 32 && this.y < obj.y + 32) {
			// this.velocity = this.velocity * -1;
			// this.velocity = this.velocity * 0;
			if (rar) {
				this.x = obj.x - 32;
			} else if (lar) {
				this.x = obj.x + 32;
			} else if (dar) {
				this.y = obj.y - 32;
			} else if (uar) {
				this.y = obj.y + 32;
			}
		}
	},
};

let viewport = {
	screen: [0, 0],
	startTile: [0, 0],
	endTile: [0, 0],
	offset: [0, 0],
	update(px, py) {
		this.offset[0] = Math.floor(this.screen[0] / 2 - px); // 32 is tile width
		this.offset[1] = Math.floor(this.screen[1] / 2 - py);
		let tile = [Math.floor(px / 32), Math.floor(py / 32)]; // 32 is tile height and width
		this.startTile[0] = tile[0] - 1 - Math.ceil(this.screen[0] / 2 / 32);
		this.startTile[1] = tile[1] - 1 - Math.ceil(this.screen[1] / 2 / 32);

		if (this.startTile[0] < 0) {
			this.startTile[0] = 0;
		}
		if (this.startTile[1] < 0) {
			this.startTile[1] = 0;
		}
		this.endTile[0] = tile[0] + 1 + Math.ceil(this.screen[0] / 2 / 32);
		this.endTile[1] = tile[1] + 1 + Math.ceil(this.screen[1] / 2 / 32);

		if (this.endTile[0] >= 1280) {
			this.endTile[0] = 1280 - 1; // 1280 is width of map
		}
		if (this.endTile[1] >= 640) {
			this.endTile[1] = 640 - 1;
		}
	},
};

const sketch = (p) => {
	p.preload = () => {
		betamapData = p.loadJSON('../maps/betamap.json');
		//		worldtileData = p.loadJSON('../maps/newmap.json');
		betamapData.worldtilemap = p.loadImage('../images/worldtileset.png');
		tilesetSource = p.loadJSON('../maps/worldtileset.json');
		playerAnim = p.loadJSON('../maps/playeranim.json');
		playerAnim.srcImg = p.loadImage('../images/player.png');
	};
	setInterval(console.log('5 seconds'), 5000);
	p.setup = () => {
		p.createCanvas(1280, 640);
		// console.log(tilesetSource);
		// console.log(worldtileData.layers[0].data.length);
		p.frameRate(15);
		demoWorld = WorldRenderer(betamapData, tilesetSource, 32, 32, player);
		viewport.screen = [1280, 640];
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
		viewport.update(player.x + player.width / 2, player.y + player.height / 2);
		//	p.fill(0);
		//	p.rect(0, 0, viewport.screen[0], viewport.screen[1]);
	};
};

const game = new p5(sketch, document.getElementById('game'));

// arrow funtion
