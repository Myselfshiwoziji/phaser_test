import Phaser from 'phaser'


export default class loading_screen extends Phaser.Scene {

    constructor() {
        super()
        this.player = undefined
        this.cursors = undefined
        this.akey = undefined
        this.wkey = undefined
        this.skey = undefined
        this.dkey = undefined
    }

    preload(){ 
        this.load.image('Background', 'assets/game_banner.png')
        this.load.spritesheet('guy', 'assets/Stickman.png', {frameWidth: 28, frameHeight: 34})

    }

    create() {
        this.add.image(825, 500, 'Background').setScale(3)
        this.createPlayer()
        this.player = this.createPlayer()
		this.cursors = this.input.keyboard.createCursorKeys()
        this.akey = this.input.keyboard.addKeys('A')
        this.wkey = this.input.keyboard.addKey('W')
        this.skey = this.input.keyboard.addKey('S')
        this.dkey = this.input.keyboard.addKey('D')
        this.keys = this.input.keyboard.addKeys("W,A,S,D");

    }


    createPlayer() { 
        const player = this.physics.add.sprite(825, 500, 'guy').setScale(3)
        player.setBounce(0)
        player.setCollideWorldBounds(true)
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('guy', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        })

        this.player.setVelocity(0, 0)

        // if (this.keyboard.cursors.left.isDown) {
        //     this.player.setVelocity(160, 0)
        // }

        return player
    }

    update() {


       if (this.keyboard.A.isDown) {
        this.player.setVelocityX(-160)
        this.player.anims.play('walk', true)
       }

       else if (this.keyboard.D.isDown) {
        this.player.setVelocityX(160)
        this.player.anims.play('walk', true)
       }

       else if (this.keyboard.W.isDown) {
        this.player.setVelocityY(-160)
        this.player.anims.play('walk', true)
       }

       else if (this.keyboard.S.isDown) {
        this.player.setVelocityY(160)
        this.player.anims.play('walk', true)
       }

       else this.player.setVelocity(0,0)
    

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

