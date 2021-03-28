function WorldRenderer(worldJSON, tileJSON, tileWidth, tileHeight, object) {
	// let dataArray;
	// let index = 0;
	let layers = worldJSON.layers;
	let tileColumns = tileJSON.columns;
	object.x = layers[2].objects[0].x;
	object.y = layers[2].objects[0].y;
	// console.log(layers[2].objects[1].x);

	const draw = (p) => {
		for (let index = 0; index < layers.length; index += 1) {
			if (layers[index].type === 'tilelayer') {
				let dataArray = Object.values(layers[index].data);
				let nextLine = 0;
				let line = 0;
				// console.log(layers[index].name);
				for (let j = 0; j < dataArray.length; j += 1) {
					if (j % worldJSON.width === 0 && j !== 0) {
						nextLine += 1;
						line = 0;
					}
					// tilePrinter(p,dataArray, nextLine, line);

					if (dataArray[j] % tileColumns === 0) {
						p.image(
							worldJSON.worldtilemap,
							tileWidth * line,
							tileHeight * nextLine,
							tileWidth,
							tileHeight,
							(tileColumns - 1) * tileWidth,
							(dataArray[j] / tileColumns - 1) * tileHeight,
							tileWidth,
							tileHeight
						);
					} else {
						p.image(
							worldJSON.worldtilemap,
							tileWidth * line,
							tileHeight * nextLine,
							tileWidth,
							tileHeight,
							((dataArray[j] % 8) - 1) * tileWidth,
							Math.floor(dataArray[j] / 8 - 0) * tileHeight,
							tileWidth,
							tileHeight
						);
					}
					line += 1;
				}
			} else if (layers[index].type === 'objectgroup') {
				// console.log('in object');
				for (let j = 0; j < layers[index].objects.length; j += 1) {
					// console.log('ok: ' + layers[index].objects.length);
					if (layers[index].objects[j].name === 'start') {
						// console.log('in for loop');
						// object.x = layers[index].objects[j].x;
						// object.y = layers[index].objects[j].y;
						object.show(p);
						object.update(layers[index].objects[1]);
						// console.log(layers[2].objects[1].x + ' ' + object.x);
						console.log(object.y + ' ' + layers[index].objects[1].y);
					}
				}
			}
		}
	};
	return {
		draw: draw,
	};
}
export default WorldRenderer;
