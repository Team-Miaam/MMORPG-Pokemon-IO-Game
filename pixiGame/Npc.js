import * as PIXI from 'pixi.js';
import keyboard from './keyboard';

class Npc {
	width = 32;

	height = 32;

	interaction_ = keyboard('e');

	sheet_ = {};

	spriteLocation = './images/morty.png';

	sprite_;

	baseTexture;

	createSheet() {
		this.sheet_['idlePose'] = [
			new PIXI.Texture(
				this.baseTexture,
				new PIXI.Rectangle(0, 0, this.width, this.height)
			),
		];
	}

	npcAnimation() {
		this.sprite_ = new PIXI.AnimatedSprite(this.sheet_.idlePose);
		this.sprite_.anchor.set(0.5);
		this.sprite_.animationSpeed = 0.1;
		this.sprite_.loop = false;
		this.sprite_.play();
	}

	npcAction() {
		this.interaction.press = () => {
			alert('for jessica');
		};
	}
}
export default Npc;
