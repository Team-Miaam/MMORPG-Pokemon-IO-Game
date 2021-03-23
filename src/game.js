import p5 from 'p5';

let worldtilemap;
let worldtileData;
let tilesetSource;

const sketch = (p) => {
	p.preload = () => {
		worldtileData = p.loadJSON('../maps/newmap.json');
		worldtilemap = p.loadImage('../images/worldtileset.png');
		tilesetSource = p.loadJSON('../maps/worldtileset.json');
	};
	p.setup = () => {
		p.createCanvas(3200, 320);
		// console.log(tilesetSource);
		// console.log(worldtileData.layers[0].data.length);
		p.frameRate(30);
	};

	p.draw = () => {
		// p.background(0);
		p.image(worldtilemap, 0, 0, 32, 32, 32, 1984 + 32, 32, 32);
		for (let i = 0; i < worldtileData.layers.length; i += 1) {
			if (worldtileData.layers[i].type === 'tilelayer') {
				// console.log(worldtileData.layers[i].data['1']);
				let arrayObject = Object.values(worldtileData.layers[i].data);
				let nextLine = 0;
				let jModifier = 0;
				// console.log(a.length);
				for (let j = 0; j < arrayObject.length; j += 1) {
					// console.log(worldtileData.layers[i].data[j]);
					if (j % 10 === 0 && j !== 0) {
						nextLine += 1;
						jModifier = 0;
					}
					// console.log(nextLine);
					if (arrayObject[j] % 8 === 0) {
						p.image(
							worldtilemap,
							32 * jModifier,
							32 * nextLine,
							32,
							32,
							(arrayObject[j] - 1) * 32,
							(Math.floor(arrayObject[j] / 8) - 1) * 32,
							32,
							32
						);
					} else {
						p.image(
							worldtilemap,
							32 * jModifier,
							32 * nextLine,
							32,
							32,
							((arrayObject[j] % 8) - 1) * 32,
							(Math.floor(arrayObject[j] / 8) - 0) * 32,
							32,
							32
						);
					}

					jModifier += 1;
				}
			}
		}
		// p.image(worldtilemap, 32, 0, 32, 32, 32, 1984 + 32, 32, 32);
	};
};

const game = new p5(sketch, document.getElementById('game'));

// arrow funtion
