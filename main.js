import Phaser from 'phaser'

import loading_screen from './scenes.js'
import thing from './scenes.js'


const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1800,
	height: 1000,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [loading_screen]
}

export default new Phaser.Game(config)