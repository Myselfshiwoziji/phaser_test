import Phaser from 'phaser'


export default class loading_screen extends Phaser.Scene {

    constructor() {
        super()
        this.player = undefined
        this.cursor = undefined
    }

    preload(){ 
        this.load.image('Background', 'assets/game_banner.png')
        this.load.spritesheet('guy', 'assets/Stickman.png', {frameWidth: 28, frameHeight: 34})

    }

    create() {
        this.add.image(825, 300, 'Background')
        this.createPlayer()
        this.cursor = this.input.keyboard.createCursorKeys()
    }


    createPlayer() { 
        this.player = this.add.sprite(825, 300, 'guy')
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('guy', {start: 0, end: 1}),
            frameRate: 5,
            repeat: -1
        })
    }
    update() {
        //this.player.setVelocityX(0)

       if (this.cursor.left.isDown) {
           //this.player.setVelocityX(-10)
           this.player.anims.play('walk', true)
       }

       else if (this.cursor.right.isDown) {
           //this.player.setVelocityX(10)
           this.player.anims.play('walk', true)

       }

    }
}


class thing extends Phaser.Scene {

    constructor() {
        super()
    }

    preload() {
        this.load.spritesheet('player', 'assets/Stickman.png', {frameWidth: 28, frameHeight: 32})
        this.load.image('field', 'assets/Background.png')

    }

    create() {
        this.add.image(825, 300, 'field')
        this.add.sprite(825, 300, 'player', 0)

    }

    CreatePlayer() {
        this.player = this.add.sprite(825, 300, 'guy', 0)
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers(player, {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        })
    }
}

