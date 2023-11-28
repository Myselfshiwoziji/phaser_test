import Phaser from 'phaser'

import Load from './scenes'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [Load],
}

export default new Phaser.Game(config)