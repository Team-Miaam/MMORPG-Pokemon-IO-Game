import * as PIXI from 'pixi.js';
import keyboard from './keyboard';

class Player {
	// constructor(playerSprite) {
	// 	this.sprite = playerSprite;
	// }
	playerWidth = 68;

	playerHeight = 72;

	vx = 0;

	vy = 0;

	x = 0;

	y = 0;

	hp = 30;

	velocity = 1;

	left = keyboard('ArrowLeft');

	up = keyboard('ArrowUp');

	right = keyboard('ArrowRight');

	down = keyboard('ArrowDown');

	playerSheet = {};

	playerSpriteLocation = '/pixiGame/images/playerMoveMent.png';

	playerSprite;

	playerBaseTexture;

	playerJsonContainer = new PIXI.Container();

	createPlayerSheet() {
		// let
		this.playerSheet['standSouth'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					0 * this.playerWidth,
					0 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
		];
		this.playerSheet['standWest'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					0 * this.playerWidth,
					1 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
		];
		this.playerSheet['standEast'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					0 * this.playerWidth,
					2 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
		];
		this.playerSheet['standNorth'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					0 * this.playerWidth,
					3 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
		];

		this.playerSheet['walkSouth'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					0 * this.playerWidth,
					0 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					1 * this.playerWidth,
					0 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					2 * this.playerWidth,
					0 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					3 * this.playerWidth,
					0 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
		];
		this.playerSheet['walkWest'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					0 * this.playerWidth,
					1 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					1 * this.playerWidth,
					1 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					2 * this.playerWidth,
					1 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					3 * this.playerWidth,
					1 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
		];
		this.playerSheet['walkEast'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					0 * this.playerWidth,
					2 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					1 * this.playerWidth,
					2 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					2 * this.playerWidth,
					2 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					3 * this.playerWidth,
					2 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
		];
		this.playerSheet['walkNorth'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					0 * this.playerWidth,
					3 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					1 * this.playerWidth,
					3 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					2 * this.playerWidth,
					3 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(
					3 * this.playerWidth,
					3 * this.playerHeight,
					this.playerWidth,
					this.playerHeight
				)
			),
		];
	}

	createPlayer() {
		this.playerSprite = new PIXI.AnimatedSprite(this.playerSheet.standSouth);
		this.playerSprite.anchor.set(0.5);
		this.playerSprite.animationSpeed = 0.1;
		this.playerSprite.loop = false;
		this.playerSprite.play();
	}

<<<<<<< Updated upstream
=======
	playerSetup() {
		this.createPlayerSheet();
		this.createPlayer();
	}

	playerAnimationLoadProto(app) {
		app.loader
			.add('player', this.playerSpriteLocation)
			.add('playerjson', this.playerAnimationJson);
		this.playerBaseTexture = new PIXI.BaseTexture.from(
			app.loader.resources['player'].url
		);

		app.loader.onComplete.add(() => {
			this.playerJsonFile = app.loader.resources['playerjson'].data;
			this.playerWidth = this.playerJsonFile.tilewidth;
			this.playerHeight = this.playerJsonFile.tileheight;
		});
		app.loader.load();
	}

>>>>>>> Stashed changes
	playerMovement() {
		this.left.press = () => {
			console.log('left');
			if (!this.playerSprite.playing) {
				this.playerSprite.textures = this.playerSheet.walkWest;
				this.playerSprite.play();
				this.playerSprite.loop = true;
			}
			// Change the player's velocity when the key is pressed
			this.vx = -this.velocity;
			this.vy = 0;
			console.log(this.vx, this.vy);
		};

		// Left arrow key `release` method
		this.left.release = () => {
			// If the left arrow has been released, and the right arrow isn't down,
			// and player isn't moving vertically:
			// Stop the player
			if (!this.right.isDown && this.vy === 0) {
				this.vx = 0;
				this.playerSprite.textures = this.playerSheet.standWest;
				this.playerSprite.loop = false;
			}
		};
		// Up
		this.up.press = () => {
			console.log('up');
			if (!this.playerSprite.playing) {
				this.playerSprite.textures = this.playerSheet.walkNorth;
				this.playerSprite.play();
				this.playerSprite.loop = true;
			}
			this.vy = -this.velocity;
			this.vx = 0;
			console.log(this.vx, this.vy);
		};
		this.up.release = () => {
			if (!this.down.isDown && this.vx === 0) {
				this.vy = 0;
				this.playerSprite.textures = this.playerSheet.standNorth;
				this.playerSprite.loop = false;
			}
		};

		// Right
		this.right.press = () => {
			console.log('right');
			if (!this.playerSprite.playing) {
				this.playerSprite.textures = this.playerSheet.walkEast;
				this.playerSprite.loop = true;
				this.playerSprite.play();
			}
			this.vx = this.velocity;
			this.vy = 0;
			console.log(this.vx, this.vy);
		};
		this.right.release = () => {
			if (!this.left.isDown && this.vy === 0) {
				this.vx = 0;
				this.playerSprite.textures = this.playerSheet.standEast;
				this.playerSprite.loop = false;
			}
		};

		// Down
		this.down.press = () => {
<<<<<<< Updated upstream
			console.log('down');
=======
>>>>>>> Stashed changes
			if (!this.playerSprite.playing) {
				this.playerSprite.textures = this.playerSheet.walkSouth;
				this.playerSprite.loop = true;
				this.playerSprite.play();
			}
			this.vy = this.velocity;
			this.vx = 0;
			console.log(this.vx, this.vy);
		};
		this.down.release = () => {
			if (!this.up.isDown && this.vx === 0) {
				this.vy = 0;
				this.playerSprite.textures = this.playerSheet.standSouth;
				this.playerSprite.loop = false;
			}
		};
	}
}

export default Player;
