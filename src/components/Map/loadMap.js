import { loadJSONAsset, loadSpriteAsset, getFileNameWtExt } from '../utility.js';

const loadMap = (p, mapName) =>
	loadJSONAsset('map', mapName).then((tiledMap) => {
		const map = {
			width: tiledMap.width,
			height: tiledMap.height,
			tileWidth: tiledMap.tilewidth,
			tileHeight: tiledMap.tileheight,
			drawableLayers: [],
			objects: {},
			tileSets: [],
		};

		for (const layer of tiledMap.layers) {
			if (layer.type === 'tilelayer') {
				map.drawableLayers.push(layer);
			} else if (layer.type === 'objectgroup') {
				map.drawableLayers.push({ name: layer.name });
				map.objects[layer.name] = {};
				for (const object of layer.objects) {
					map.objects[layer.name][object.name] = object;
				}
			}
		}

		for (const { source: tileSetSrc } of tiledMap.tilesets) {
			const tileSrc = getFileNameWtExt(tileSetSrc);
			loadJSONAsset('tileset', `${tileSrc}.json`).then((tileSetJSON) => {
				const tileSetSprite = loadSpriteAsset(p, `${tileSrc}.png`);
				map.tileSets.push({
					tileSetJSON,
					tileSetSprite,
				});
			});
		}

		return map;
	});

export default loadMap;
