import Phaser from 'phaser'

export default class thing extends Phaser.Scene {

    constructor(){
        super()
    }

    preload(){ 
        this.load.image('Background', 'assets/Background.png')
        this.load.spritesheet('Stickman', 'assets/Stickman.png', {frameWidth: 32, frameHeight: 48})
    }

    create() {
        this.add.image(400, 300, 'Background')
    }

}