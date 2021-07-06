import * as PIXI from 'pixi.js';
import keyboard from './keyboard';

class Player {
	// constructor(playerSprite) {
	// 	this.sprite = playerSprite;
	// }
	playerWidth = 32;

	playerHeight = 34;

	didHit;

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

	playerSpriteLocation = './pixiGame/images/Webp.net-resizeimage.png';

	playerSprite;

	playerBaseTexture;

	createPlayerSheet() {
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

	playerMovement() {
		this.left.press = () => {
			if (!this.playerSprite.playing) {
				this.playerSprite.textures = this.playerSheet.walkWest;
				this.playerSprite.play();
				this.playerSprite.loop = true;
			}
			// Change the player's velocity when the key is pressed
			this.vx = -this.velocity;
			this.vy = 0;
			this.down.isUp = false;
			this.up.isUp = false;
			this.right.isUp = false;
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
			this.down.isUp = true;
			this.up.isUp = true;
			this.right.isUp = true;
		};
		// Up
		this.up.press = () => {
			if (!this.playerSprite.playing) {
				this.playerSprite.textures = this.playerSheet.walkNorth;
				this.playerSprite.play();
				this.playerSprite.loop = true;
			}
			this.vy = -this.velocity;
			this.vx = 0;
			this.down.isUp = false;
			this.left.isUp = false;
			this.right.isUp = false;
		};
		this.up.release = () => {
			if (!this.down.isDown && this.vx === 0) {
				this.vy = 0;
				this.playerSprite.textures = this.playerSheet.standNorth;
				this.playerSprite.loop = false;
			}
			this.down.isUp = true;
			this.left.isUp = true;
			this.right.isUp = true;
		};

		// Right
		this.right.press = () => {
			if (!this.playerSprite.playing) {
				this.playerSprite.textures = this.playerSheet.walkEast;
				this.playerSprite.loop = true;
				this.playerSprite.play();
			}
			this.vx = this.velocity;
			this.vy = 0;
			this.down.isUp = false;
			this.up.isUp = false;
			this.left.isUp = false;
		};
		this.right.release = () => {
			if (!this.left.isDown && this.vy === 0) {
				this.vx = 0;
				this.playerSprite.textures = this.playerSheet.standEast;
				this.playerSprite.loop = false;
			}
			this.down.isUp = true;
			this.up.isUp = true;
			this.left.isUp = true;
		};

		// Down
		this.down.press = () => {
			// console.log(this.down);
			if (!this.playerSprite.playing) {
				this.playerSprite.textures = this.playerSheet.walkSouth;
				this.playerSprite.loop = true;
				this.playerSprite.play();
			}
			this.vy = this.velocity;
			this.vx = 0;
			this.right.isUp = false;
			this.up.isUp = false;
			this.left.isUp = false;
		};
		this.down.release = () => {
			if (!this.up.isDown && this.vx === 0) {
				this.vy = 0;
				this.playerSprite.textures = this.playerSheet.standSouth;
				this.playerSprite.loop = false;
			}
			this.right.isUp = true;
			this.up.isUp = true;
			this.left.isUp = true;
		};
	}
}

export default Player;
