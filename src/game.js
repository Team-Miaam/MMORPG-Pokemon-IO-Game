import p5 from 'p5';
import WorldRenderer from './WorldRenderer.js';

let betamapData;
let worldtilemap;
let worldtileData;
let tilesetSource;
let demoWorld;

const sketch = (p) => {
	p.preload = () => {
		betamapData = p.loadJSON('../maps/betamap.json');
		worldtileData = p.loadJSON('../maps/newmap.json');
		betamapData.worldtilemap = p.loadImage('../images/worldtileset.png');
		tilesetSource = p.loadJSON('../maps/worldtileset.json');
	};
	p.setup = () => {
		p.createCanvas(1200, 1200);
		// console.log(tilesetSource);
		// console.log(worldtileData.layers[0].data.length);
		p.frameRate(30);
		demoWorld = WorldRenderer(betamapData, tilesetSource, 32, 32);
	};

	p.draw = () => {
		// p.background(0);
		// p.image(worldtilemap, 0, 0, 32, 32, 32 * 6, 32 * 0, 32, 32);
		// p.image(worldtilemap, 32, 0, 32, 32, 32 * 7, 32 * 0, 32, 32);
		// p.image(worldtilemap, 0, 32, 32, 32, 32 * 6, 32 * 1, 32, 32);
		// p.image(worldtilemap, 32, 32, 32, 32, 32 * 7, 32 * 1, 32, 32);
		// p.image(worldtilemap, 32, 0, 32, 32, 32, 1984 + 32, 32, 32);
		demoWorld.draw(p);
	};
};

const game = new p5(sketch, document.getElementById('game'));

// arrow funtion
