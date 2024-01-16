// import Phaser from 'phaser'
import loading_screen from './scenes.js'


const config = {
	type: Phaser.AUTO,
	parent: 'app',
	mode: Phaser.Scale.Fit,
    autoCenter: Phaser.Scale.CENTER_BOTH,
	width: window.innerWidth,
    height:window.innerHeight,
	// width: 1900,
	// height: 1100,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true,
		},
	},
	scene: [loading_screen]
}

new Phaser.Game(config)