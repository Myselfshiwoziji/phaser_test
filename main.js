// import Phaser from 'phaser'
import menu from './menu.js'
import loading_screen from './scenes.js'



const config = {
	type: Phaser.AUTO,
	parent: 'app',
	mode: Phaser.Scale.Fit,
    autoCenter: Phaser.Scale.CENTER_BOTH,
	width: window.innerWidth,
    height:window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [menu, loading_screen]
}

new Phaser.Game(config)