import React, { Component } from 'react';
import Sketch from 'react-p5';
import loadMap from './Map/loadMap.js';

class Game extends Component {
	viewport = {
		width: 5,
		height: 5,
		tileWidth: 32,
		tileHeight: 32,
	};

	// Game world
	map;

	preload = (p) => {
		loadMap(p, 'world0.json').then((res) => {
			this.map = res;
			console.log(this.map);
		});
	};

	setup = (p, parentRef) => {
		p.createCanvas(
			this.viewport.width * this.viewport.tileWidth,
			this.viewport.height * this.viewport.tileHeight
		).parent(parentRef);
	};

	draw = (p) => {
		if (this.map === undefined) {
			p.background(127);
			return;
		}
		p.background(0);
	};

	render = () => (
		<div className="Game">
			<Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
		</div>
	);
}

export default Game;
