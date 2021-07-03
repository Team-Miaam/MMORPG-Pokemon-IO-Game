import * as PIXI from 'pixi.js';
import keyboard from './keyboard';

class Player {
	// constructor(playerSprite) {
	// 	this.sprite = playerSprite;
	// }

	vx = 0;

	vy = 0;

	x = 0;

	y = 0;

	hp = 30;

	left = keyboard('ArrowLeft');

	up = keyboard('ArrowUp');

	right = keyboard('ArrowRight');

	down = keyboard('ArrowDown');

	playerSheet = {};

	playerSpriteLocation = '/pixiGame/images/playerMoveMent.png';

	playerSprite;

	playerBaseTexture;

	createPlayerSheet() {
		this.playerSheet['standSouth'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(0 * 68, 0 * 72, 68, 72)
			),
		];
		this.playerSheet['standWest'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(0 * 68, 1 * 72, 68, 72)
			),
		];
		this.playerSheet['standEast'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(0 * 68, 2 * 72, 68, 72)
			),
		];
		this.playerSheet['standNorth'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(0 * 68, 3 * 72, 68, 72)
			),
		];

		this.playerSheet['walkSouth'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(0 * 68, 0 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(1 * 68, 0 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(2 * 68, 0 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(3 * 68, 0 * 72, 68, 72)
			),
		];
		this.playerSheet['walkWest'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(0 * 68, 1 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(1 * 68, 1 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(2 * 68, 1 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(3 * 68, 1 * 72, 68, 72)
			),
		];
		this.playerSheet['walkEast'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(0 * 68, 2 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(1 * 68, 2 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(2 * 68, 2 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(3 * 68, 2 * 72, 68, 72)
			),
		];
		this.playerSheet['walkNorth'] = [
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(0 * 68, 3 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(1 * 68, 3 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(2 * 68, 3 * 72, 68, 72)
			),
			new PIXI.Texture(
				this.playerBaseTexture,
				new PIXI.Rectangle(3 * 68, 3 * 72, 68, 72)
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
}

export default Player;
