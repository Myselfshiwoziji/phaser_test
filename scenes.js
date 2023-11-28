import Phaser from 'phaser'

class Load extends Phaser.Scene {

    constructor(){
        super('load')
    }

    preload(){ 
        this.load.image('Background', 'assets/Background.png')
        this.load.spritesheet('Stickman', 'assets/Stickman.png', {frameWidth: 32, frameHeight: 48})
    }

    create() {
        this.add.image('owen', 'assets/owen_jones.png')
    }

}