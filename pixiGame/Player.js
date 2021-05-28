class Player {
	constructor(playerSprite) {
		this.sprite = playerSprite;
	}
	vx = 0;
	vy = 0;
	x = 0;
	y = 0;
	hp = 30;

	left = keyboard('ArrowLeft');
	up = keyboard('ArrowUp');
	right = keyboard('ArrowRight');
	down = keyboard('ArrowDown');
}
