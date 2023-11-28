import Phaser from 'phaser'

import thing from './scenes.js'

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
	scene: [thing],
}

export default new Phaser.Game(config)