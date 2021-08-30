import * as PIXI from 'pixi.js';
import keyboard from './keyboard';

class TextManager {
	hasBoxCreated = false;

	queue = [];

	msg = new PIXI.Text('...');

	space = keyboard(' ');

	E_button = keyboard('e');

	stage = new PIXI.Application();

	getApp(app) {
		this.stage = app;
	}

	initiateConvo() {
		this.msg.x = 10;
		this.msg.y = 402;
		this.msg.text = 'test conversation';
		this.queue.push('hello');
		this.queue.push('I am professor xyz');
		this.queue.push('call the police');
		this.queue.push('ggwp');
		return this.msg;
	}

	graphics = new PIXI.Graphics();

	textBoxinit() {
		this.graphics.lineStyle(10, 0x000000, 5);
		this.graphics.beginFill(0xffffff);
		this.graphics.drawRect(5, 402, 502, 105);
		this.graphics.endFill();

		return this.graphics;
	}

	closeText() {
		this.graphics.destroy();
	}

	startTalking() {
		this.msg.text = this.queue.shift();
		return this.msg;
	}

	textKeyboardControl() {
		this.space.press = () => {
			if (!this.hasBoxCreated) {
				console.log('space was pressed');
				this.stage.stage.addChild(this.textBoxinit());
				this.hasBoxCreated = true;
				this.stage.stage.addChild(this.initiateConvo());
			} else {
				this.stage.stage.addChild(this.startTalking());
			}
		};

		// Left arrow key `release` method
		this.space.release = () => {
			console.log('space was released');
		};

		this.E_button.press = () => {
			if (this.hasBoxCreated) {
				this.closeText();
				this.hasBoxCreated = false;
				this.graphics = new PIXI.Graphics();
			}
		};
	}
}

export default TextManager;
