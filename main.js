import Phaser from 'phaser'

import loading_screen from './scenes.js'


const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1900,
	height: 1100,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		},
	},
	scene: [loading_screen]
}

export default new Phaser.Game(config)