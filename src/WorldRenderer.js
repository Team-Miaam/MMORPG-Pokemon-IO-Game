function WorldRenderer(worldJSON, tileJSON, tileWidth, tileHeight) {
	// let dataArray;
	// let index = 0;
	let layers = worldJSON.layers;
	let tileColumns = tileJSON.columns;
	const draw = (p) => {
		for (let index = 0; index < layers.length; index += 1) {
			if (layers[index].type === 'tilelayer') {
				let dataArray = Object.values(layers[index].data);
				let nextLine = 0;
				let line = 0;

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
			}
		}
	};
	return {
		draw: draw,
	};
}
export default WorldRenderer;
