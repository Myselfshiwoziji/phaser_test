// import Phaser from 'phaser'
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
		},
	},
	scene: [loading_screen]
}

new Phaser.Game(config)