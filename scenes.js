import Phaser from 'phaser'

export default class loading_screen extends Phaser.Scene {

    constructor() {
        super(loading_screen)
        this.player = undefined
        this.cursors = undefined
    }

    preload(){ 
        this.load.image('Background', 'assets/game_banner.png')
        this.load.spritesheet('guy', 'assets/Stickman.png', {frameWidth: 28, frameHeight: 34})

    }

    create() {
        this.add.image(825, 500, 'Background').setScale(3)
		this.cursors = this.input.keyboard.createCursorKeys()
		this.player = this.createPlayer()
    }

    createPlayer()
	{
		const player = this.physics.add.sprite(825, 500, 'guy').setScale(3)
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)

		// this.anims.create({
		// 	key: 'walk',
		// 	frames: this.anims.generateFrameNumbers('guy', { start: 0, end: 1 }),
		// 	frameRate: 10,
		// 	repeat: -1
		// })

        return player
    }
    update() {
		var keys = this.input.keyboard.addKeys("W,A,S,D")

		if (keys.A.isDown)
		{
			this.player.setVelocityX(-160)

			//this.player.anims.play('walk', true)
		}
		else if (keys.D.isDown)
		{
			this.player.setVelocityX(160)

			//this.player.anims.play('walk', true)
		}
        else if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-160)

			//this.player.anims.play('walk', true)
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(160)

			//this.player.anims.play('walk', true)
		}

		else {
			this.player.setVelocityX(0)

			//this.player.anims.player('walk', true)
		}

		if (keys.W.isDown)
        {
			this.player.setVelocityY(-160)

			//this.player.anims.play('walk', true)
		}
        else if (keys.S.isDown)
        {
			this.player.setVelocityY(160)

			//this.player.anims.play('walk', true)
		}
        else if (this.cursors.up.isDown)
        {
			this.player.setVelocityY(-160)

			//this.player.anims.play('walk', true)
		}
        else if (this.cursors.down.isDown)
        {
			this.player.setVelocityY(160)

			//this.player.anims.play('walk', true)
		}

        else
		{
			this.player.setVelocityY(0)

			//this.player.anims.play('walk')
		}



    }
}



