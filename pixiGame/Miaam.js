import * as PIXI from 'pixi.js';

class Miaam {
	setPlayer(player) {
		this.player = player;
	}

	makeTiledWorld(jsonTiledMap, tileset, stage) {
		// loader
		let player = this.player;
		let loader = PIXI.Loader.shared;
		let world = new PIXI.Container();
		world.objects = [];
		// loader.add(jsonTiledMap);
		const load = (loader) => {
			console.log('All files loaded');
			world.tiledMap = loader.resources[jsonTiledMap].data;
			world.worldWidth = world.tiledMap.width * world.tiledMap.tilewidth;
			world.worldHeight = world.tiledMap.height * world.tiledMap.tileheight;
			// Figure out how many columns there are on the tileset.
			world.numberOfTilesetColumns = Math.floor(
				world.tiledMap.imagewidth / world.tiledMap.tilewidth
			);
			spriteMaker();
		};

		function loadProgressHandler(loader, resource) {
			// Display the file `url` currently being loaded
			console.log('loading: ' + resource.url);

			// Display the percentage of files currently loaded
			console.log('progress: ' + loader.progress + '%');
			// If you gave your files names as the first argument
			// of the `add` method, you can access them like this
			// console.log("loading: " + resource.name);
		}
		loader.add(jsonTiledMap).load(load);
		loader.onProgress.add(loadProgressHandler);

		// shows progress loading objects

		function frame(source, x, y, width, height) {
			let texture;
			let imageFrame;
			// console.log(PIXI.utils.TextureCache);
			// If the source is a string, it's either a texture in the
			// cache or an image file
			if (typeof source === 'string') {
				if (PIXI.utils.TextureCache[source]) {
					// console.log(PIXI.utils.TextureCache[source]);
					texture = new PIXI.Texture(PIXI.utils.TextureCache[source]);
				} else {
					texture = new PIXI.Texture.from(source);
				}
			}

			// If the `source` is a texture,  use it
			else if (source instanceof PIXI.Texture) {
				texture = new PIXI.Texture(source);
			}
			if (!texture) {
				throw new Error(`Please load the ${source} texture into the cache.`);
			} else {
				// console.log(texture);
				let sprite = new PIXI.Sprite(texture);
				// Make a rectangle the size of the sub-image
				texture.baseTexture.width = 256;
				texture.baseTexture.height = 16384;
				imageFrame = new PIXI.Rectangle(x, y, width, height);
				// console.log(imageFrame);
				texture.frame = imageFrame;
				return texture;
			}
		}

		// let layer23 = world.tiledMap.layers;

		// loop through every layer
		function spriteMaker() {
			world.tiledMap.layers.forEach((tiledLayer) => {
				// Make a container group for this layer and copy
				// all of the layer properties onto it
				let layerGroup = new PIXI.Container();
				Object.keys(tiledLayer).forEach((key) => {
					// Add all the layer's properties to the group, except the width and height
					if (key !== 'width' && key !== 'height') {
						layerGroup[key] = tiledLayer[key];
					}
				});
				// Translate Tiled Editor’s `opacity` property to the Container’s equivalent `alpha` property
				layerGroup.alpha = tiledLayer.opacity;
				// Add the group to the `world`
				world.addChild(layerGroup);
				// Push the group into the `world`'s `objects` array So you can access it later
				world.objects.push(layerGroup);
				// Is this current layer a `tilelayer`?
				if (tiledLayer.type === 'tilelayer') {
					// Loop through the `data` array of this layer
					tiledLayer.data.forEach((gid, index) => {
						// console.log(gid, index);
						let tileSprite;
						let texture;
						let mapX;
						let mapY;
						let tilesetX;
						let tilesetY;
						let mapColumn;
						let mapRow;
						let tilesetColumn;
						let tilesetRow;
						// if gid=> grid id is not zero, create a sprite
						if (gid !== 0) {
							// Figure out the map column and row number that we're on, and then calculate the grid cell's x and y pixel position
							mapColumn = index % world.tiledMap.width;
							mapRow = Math.floor(index / world.tiledMap.width);
							mapX = mapColumn * world.tiledMap.tilewidth;
							mapY = mapRow * world.tiledMap.tileheight;
							// Figure out the column and row number that the tileset image is on, and then use those values to calculate the x and y pixel position of the image on the tileset
							tilesetColumn = (gid - 1) % world.numberOfTilesetColumns;
							tilesetRow = Math.floor((gid - 1) / world.numberOfTilesetColumns);
							tilesetX = tilesetColumn * world.tiledMap.tilewidth;
							tilesetY = tilesetRow * world.tiledMap.tileheight;

							// console.log(world.numberOfTilesetColumns, tilesetRow);
							// Use the above values to create the sprite's image from the tileset image. The custom `frame` method captures the correct image from the tileset
							/* ***************************************************************************************************************************** */
							/* ***************************************************************************************************************************** */
							texture = frame(
								tileset,
								tilesetX,
								tilesetY,
								world.tiledMap.tilewidth,
								world.tiledMap.tileheight
							);
							/* ***************************************************************************************************************************** */
							/* ***************************************************************************************************************************** */

							tileSprite = new PIXI.Sprite(texture);
							tileSprite.x = mapX;
							tileSprite.y = mapY;
							// Make a record of the sprite's index number in the array (We'll use this for collision detection, which you'll learn in the next chapter)
							tileSprite.index = index;
							// Make a record of the sprite's `gid` on the tileset. This will also be useful for collision detection later
							tileSprite.gid = gid;
							// Add the sprite to the current layer group
							world.addChild(tileSprite);
						}
					});
					// console.log(layerGroup);
				}
				// Is this layer a Tiled Editor `objectgroup`?
				if (tiledLayer.type === 'objectgroup') {
					tiledLayer.objects.forEach((object) => {
						// We're just going to capture the object's properties so that we can decide what to do with it later
						//  Get a reference to the layer group the object is in
						object.group = layerGroup;
						// Push the object into the world's `objects` array
						world.objects.push(object);
					});
				}
				// if i dont add it in stage then doesn't work
				// stage.addChild(layerGroup);
			});

			/*
			`world.getObject` and `world.getObjects` (with an “s”) search for and return
			any sprites or objects in the `world.objects` array.
			Any object that has a `name` property in
				Tiled Editor will show up in a search.
			`getObject` gives you a single object, `getObjects` gives you an array of objects.
			`getObject` returns the actual search function, so you
			can use the following format to directly access a single object:
			sprite.x = world.getObject("anySprite").x;
			sprite.y = world.getObject("anySprite").y;
			*/
			// Search function

			/* ************************************************************************************************** */
			let objlayer = world.getObject('objects');
			Makeplayer();
			/* *************************************************************************************************** */
		}
		world.getObject = (objectName) => {
			let searchForObject = () => {
				let foundObject;
				world.objects.some((object) => {
					if (object.name && object.name === objectName) {
						foundObject = object;
						return true;
					}
				});
				if (foundObject) {
					return foundObject;
				} else {
					throw new Error(
						'There is no object with the property name: ' + objectName
					);
				}
			};
			return searchForObject();
		};
		world.getObjects = (objectName) => {
			let foundObjects = [];
			world.objects.forEach((object) => {
				if (object.name && objectName.indexOf(object.name) !== -1) {
					foundObjects.push(object);
				}
			});
			if (foundObjects.length > 0) {
				return foundObjects;
			} else {
				throw new Error('Couldnt find those objects');
			}
			return foundObjects;
		};

		function Makeplayer() {
			let objlayer = world.getObject('objects');
			player.playerSprite.x = objlayer.objects[0].x;
			player.playerSprite.y = objlayer.objects[0].y;
			objlayer.addChild(player.playerSprite);
		}
		// console.log(world);
		return world;
	}
}

export default Miaam;
