function worldCamera(world, worldWidth, worldHeight, canvas) {
	//Define a `camera` object with helpful properties
	console.log(world);
	let camera = {
		width: 512,
		height: 512,
		_x: 0,
		_y: 0,
		//`x` and `y` getters/setters
		//When you change the camera's position,
		//they shift the position of the world in the opposite direction
		get x() {
			return this._x;
		},
		set x(value) {
			this._x = value;
			world.x = -this._x;
		},
		get y() {
			return this._y;
		},
		set y(value) {
			this._y = value;
			world.y = -this._y;
		},
		//The center x and y position of the camera
		get centerX() {
			return this.x + this.width / 2;
		},
		get centerY() {
			return this.y + this.height / 2;
		},
		//Boundary properties that define a rectangular area, half the size
		//of the game screen. If the sprite that the camera is following
		//is inide this area, the camera won't scroll. If the sprite
		//crosses this boundary, the `follow` function ahead will change
		//the camera's x and y position to scroll the game world
		get rightInnerBoundary() {
			return this.x + this.width / 2 + this.width / 4;
		},
		get leftInnerBoundary() {
			return this.x + this.width / 2 - this.width / 4;
		},
		get topInnerBoundary() {
			return this.y + this.height / 2 - this.height / 4;
		},
		get bottomInnerBoundary() {
			return this.y + this.height / 2 + this.height / 4;
		},
		//The code next defines two camera
		//methods: `follow` and `centerOver`
		//Use the `follow` method to make the camera follow a sprite
		follow: function (sprite) {
			//Check the sprites position in relation to the inner
			//boundary. Move the camera to follow the sprite if the sprite
			//strays outside the boundary
			if (sprite.x < this.leftInnerBoundary) {
				this.x = sprite.x - this.width / 4;
			}
			if (sprite.y < this.topInnerBoundary) {
				this.y = sprite.y - this.height / 4;
			}
			if (sprite.x + sprite.width > this.rightInnerBoundary) {
				this.x = sprite.x + sprite.width - (this.width / 4) * 3;
			}
			if (sprite.y + sprite.height > this.bottomInnerBoundary) {
				this.y = sprite.y + sprite.height - (this.height / 4) * 3;
			}
			//If the camera reaches the edge of the map, stop it from moving
			if (this.x < 0) {
				this.x = 0;
			}
			if (this.y < 0) {
				this.y = 0;
			}
			if (this.x + this.width > worldWidth) {
				this.x = worldWidth - this.width;
			}
			if (this.y + this.height > worldHeight) {
				this.y = worldHeight - this.height;
			}
		},
		//Use the `centerOver` method to center the camera over a sprite
		centerOver: function (sprite) {
			//Center the camera over a sprite
			this.x = sprite.x + sprite.width / 2 - this.width / 2;
			this.y = sprite.y + sprite.height / 2 - this.height / 2;
		},
	};
	//Return the `camera` object
	return camera;
}
