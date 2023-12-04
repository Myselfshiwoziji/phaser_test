import Phaser from 'phaser'

import thing from './thing.js'
export default class loading_screen extends Phaser.Scene {

    constructor() {
        super(loading_screen)
        this.player = undefined
        this.cursors = undefined
		this.enemyspawn = undefined

    }

    preload(){ 
        this.load.image('Background', 'assets/game_banner.png')
        this.load.spritesheet('guy', 'assets/Stickman.png', {frameWidth: 28, frameHeight: 34})
		this.load.image('enemy', 'assets/Stickman.png')

    }

    create() {
        this.add.image(825, 500, 'Background').setScale(3)
		this.cursors = this.input.keyboard.createCursorKeys()
		this.player = this.createPlayer()
		this.enemyspawn = new thing(this, 'enemy')
		/**this.enemy = group()

		this.physics.moveToObject(this.enemyguy, this.player, 100)*/

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

		// for (let i = 0; this.player.y == 500; i++) {
		// 	console.log(i)
		// 	setTimeout(1000)
		// }

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


		// const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		// const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		// console.log((-180*Phaser.Math.Angle.Between(screenCenterX, screenCenterY, this.input.activePointer.x, this.input.activePointer.y))/Math.PI)

    }
}




