makeTiledWorld(jsonTiledMap, tileset) {
    //Get a reference to the JSON file
    let tiledMap = PIXI.loader.resources[jsonTiledMap].data;
    //Create a container group called `world` to contain all the layers, sprites
    //and objects from the `tiledMap`. The `world` object is going to be
    //returned to the main game program after this `makeTiledWorld`
    //function finishes
    let world = new Container();
    //Set the width and height of each tile that makes up the map.
    //(The tile size is 32x32 pixels in this example)
    world.tileheight = tiledMap.tileheight;
    world.tilewidth = tiledMap.tilewidth;
    //Calculate the `width` and `height` of the world, in pixels
    world.worldWidth = tiledMap.width * tiledMap.tilewidth;
    world.worldHeight = tiledMap.height * tiledMap.tileheight;
    //Get a reference to the world's height and width in
    //tiles, in case you need to know this later (you will!)
    world.widthInTiles = tiledMap.width;
    world.heightInTiles = tiledMap.height;
    //Create an `objects` array to store references to any
    //named objects in the map. Named objects all have
    //a `name` property that was assigned in Tiled Editor
    world.objects = [];
    //The optional spacing (padding) around each tile
    //This is to account for spacing around tiles
    //that's commonly used with texture atlas tilesets. Set the
    //`spacing` property when you create a new map in Tiled Editor
    let spacing = tiledMap.tilesets[0].spacing;
    //Figure out how many columns there are on the tileset.
    //This is the width of the image, divided by the width
    //of each tile, plus any optional spacing thats around each tile
    let numberOfTilesetColumns =
    Math.floor(
    tiledMap.tilesets[0].imagewidth
    / (tiledMap.tilewidth + spacing)
    );
    //Loop through all the map layers
    tiledMap.layers.forEach(tiledLayer => {
    //Make a container group for this layer and copy
    //all of the layer properties onto it
    let layerGroup = new Container();
    Object.keys(tiledLayer).forEach(key => {
//Add all the layer's properties to the group, except the
//width and height (because the container group will work those our for
//itself based on its content).
if (key !== "width" && key !== "height") {
layerGroup[key] = tiledLayer[key];
}
});
//Translate Tiled Editor’s `opacity` property to the Container’s
//equivalent `alpha` property
layerGroup.alpha = tiledLayer.opacity;
//Add the group to the `world`
world.addChild(layerGroup);
//Push the group into the `world`'s `objects` array
//So you can access it later
world.objects.push(layerGroup);
//Is this current layer a `tilelayer`?
if (tiledLayer.type === "tilelayer") {
//Loop through the `data` array of this layer
tiledLayer.data.forEach((gid, index) => {
let tileSprite, texture, mapX, mapY, tilesetX, tilesetY,
mapColumn, mapRow, tilesetColumn, tilesetRow;
//If the grid id number (`gid`) isn't zero, create a sprite
if (gid !== 0) {
//Figure out the map column and row number that we're on, and then
//calculate the grid cell's x and y pixel position
mapColumn = index % world.widthInTiles;
mapRow = Math.floor(index / world.widthInTiles);
mapX = mapColumn * world.tilewidth;
mapY = mapRow * world.tileheight;
//Figure out the column and row number that the tileset
//image is on, and then use those values to calculate
//the x and y pixel position of the image on the tileset
tilesetColumn = ((gid - 1) % numberOfTilesetColumns);
tilesetRow = Math.floor((gid - 1) / numberOfTilesetColumns);
tilesetX = tilesetColumn * world.tilewidth;
tilesetY = tilesetRow * world.tileheight;
//Compensate for any optional spacing (padding) around the tiles if
//there is any. This bit of code accumlates the spacing offsets from the
//left side of the tileset and adds them to the current tile's position
if (spacing > 0) {
tilesetX
+= spacing
+ (spacing * ((gid - 1) % numberOfTilesetColumns));
tilesetY
+= spacing
+ (spacing * Math.floor((gid - 1) / numberOfTilesetColumns));
}
//Use the above values to create the sprite's image from
//the tileset image. The custom `frame` method captures the
//correct image from the tileset
texture = frame(
tileset, tilesetX, tilesetY,
world.tilewidth, world.tileheight
);
//I've dedcided that any tiles that have a `name` property are important
//and should be accessible in the `world.objects` array
let tileproperties = tiledMap.tilesets[0].tileproperties,
key = String(gid - 1);
//If the JSON `tileproperties` object has a sub-object that
//matches the current tile, and that sub-object has a `name` property,
//then create a sprite and assign the tile properties onto
//the sprite
if (tileproperties[key] && tileproperties[key].name) {
//Make a sprite
tileSprite = new Sprite(texture);
//Copy all of the tile's properties onto the sprite
//(This includes the `name` property)
Object.keys(tileproperties[key]).forEach(property => {
tileSprite[property] = tileproperties[key][property];
});
//Push the sprite into the `world`'s `objects` array
//so that you can access it by `name` later
world.objects.push(tileSprite);
}
//If the tile doesn't have a `name` property, just use it to
//create an ordinary sprite (it will only need one texture)
else {
tileSprite = new Sprite(texture);
}
//Position the sprite on the map
tileSprite.x = mapX;
tileSprite.y = mapY;
//Make a record of the sprite's index number in the array
//(We'll use this for collision detection, which you'll
//learn in the next chapter)
tileSprite.index = index;
//Make a record of the sprite's `gid` on the tileset.
//This will also be useful for collision detection later
tileSprite.gid = gid;
//Add the sprite to the current layer group
layerGroup.addChild(tileSprite);
}
});
}
//We're now done with the tile layers, so let's move on!
//Is this layer a Tiled Editor `objectgroup`?
if (tiledLayer.type === "objectgroup") {
tiledLayer.objects.forEach(object => {
//We're just going to capture the object's properties
//so that we can decide what to do with it later
//Get a reference to the layer group the object is in
object.group = layerGroup;
//Push the object into the world's `objects` array
world.objects.push(object);
});
}
});
//Search functions
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
world.getObject = objectName => {
let searchForObject = () => {
let foundObject;
world.objects.some(object => {
if (object.name && object.name === objectName) {
foundObject = object;
return true;
}
});
if (foundObject) {
return foundObject;
} else {
throw new Error("There is no object with the property name: " + objectName);
}
};
//Return the search function
return searchForObject();
};
world.getObjects = objectNames => {
let foundObjects = [];
world.objects.forEach(object => {
if (object.name && objectNames.indexOf(object.name) !== -1) {
foundObjects.push(object);
}
});
if (foundObjects.length > 0) {
return foundObjects;
} else {
throw new Error("I could not find those objects");
}
return foundObjects;
};
//That's it, we're done!
//Finally, return the `world` object back to the game program
return world;
}