import Phaser from 'phaser'

import thing from './thing.js'
export default class loading_screen extends Phaser.Scene {

    constructor() {
        super(loading_screen)
        this.player = undefined
        this.cursors = undefined
		this.enemyspawn = undefined
		this.gameOver = false
		this.sword = undefined


    }

    preload(){ 
        this.load.image('Background', 'assets/game_banner.png')
        this.load.spritesheet('guy', 'assets/Stickman.png', {frameWidth: 28, frameHeight: 34})
		this.load.image('enemy', 'assets/Stickman.png')
		this.load.image('fields', 'assets/fields-1.png')
		this.load.image('sword', 'assets/sword.png')
		this.load.image('wall', 'assets/wall.png')

    }

    create() {
        this.add.image(825, 500, 'Background').setScale(3)
		this.cursors = this.input.keyboard.createCursorKeys()
		var keys = this.input.keyboard.addKeys("E")
		this.player = this.createPlayer()
		const wall = this.createWall()
		this.enemyspawn = new thing(this, 'enemy')
		this.enemyspawn.spawn()
		this.sword = this.physics.add.image(this.player.x, this.player.y, 'sword').setScale(1.8)
		this.canExecute = true
		this.playerExecute = true
		this.player.health = 5
		this.physics.add.collider(this.player, wall)
		this.physics.add.collider(this.enemyspawn.group, wall)

		
		const that = this;
		function Count(i) {
			if (i <= 4) {
			  that.enemyspawn.spawn()
			  setTimeout(() => Count(i+1), 1000);
			}
		}
		Count(2);


		function enemycheck() {
			if (that.enemyspawn.group.getChildren().length == 0) {
				Count(2)
			}
		}

		enemycheck()

		this.enemyspawn.group.getChildren().forEach(function(enemy) {
            enemy.health = 5;
        });


    }

	createWall()
	{
		const wall = this.physics.add.staticGroup()

		wall.create(1050, 300, 'wall').setScale(1.5).refreshBody()

		return wall
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
		//this.sword.setPosition(this.player.x - 30, this.player.y);
		var keys = this.input.keyboard.addKeys("W,A,S,D,E")

		this.enemyspawn.group.getChildren().forEach(function(child) {
			const directionX = this.player.x - child.x;
			const directionY = this.player.y - child.y;
	
			// Normalize the direction
			const length = Math.sqrt(directionX * directionX + directionY * directionY);
			const normalizedDirectionX = directionX / length;
			const normalizedDirectionY = directionY / length;
	
			// Set the velocity of the child towards the player
			const speed = length > 75 ? length: 0 
			child.setVelocity(normalizedDirectionX * speed, normalizedDirectionY * speed);
		}, this);
	


			if (this.gameOver) {
				return
			}



		var playerspeed = 350

		if (keys.A.isDown || this.cursors.left.isDown)
		{
			this.player.setVelocityX(-playerspeed)

			//this.player.anims.play('walk', true)
		}
		else if (keys.D.isDown || this.cursors.right.isDown)
		{
			this.player.setVelocityX(playerspeed)

			//this.player.anims.play('walk', true)
		}

		else {
			this.player.setVelocityX(0)

			//this.player.anims.player('walk', true)
		}

		if (keys.W.isDown || this.cursors.up.isDown)
        {
			this.player.setVelocityY(-playerspeed)


			//this.player.anims.play('walk', true)
		}
        else if (keys.S.isDown || this.cursors.down.isDown)
        {
			this.player.setVelocityY(playerspeed)


			//this.player.anims.play('walk', true)
		}

        else
		{
			this.player.setVelocityY(0)

			//this.player.anims.play('walk')
		}






		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
		const playerCenterX = this.player.x
		const playerCenterY = this.player.y

		//console.log((-180*Phaser.Math.Angle.Between(screenCenterX, screenCenterY, this.input.activePointer.x, this.input.activePointer.y))/Math.PI)
		// var cursor_angle = Phaser.Math.Angle.Between(screenCenterX, screenCenterY, this.input.activePointer.x, this.input.activePointer.y)
		this.player_cursor = Phaser.Math.Angle.Between(playerCenterX, playerCenterY, this.input.activePointer.x, this.input.activePointer.y)
		this.sword.angle = this.player_cursor*180/Math.PI + 90
		
		//console.log(this.sword.angle)

		if (this.sword.angle > 0) {
			this.sword.setPosition(this.player.x + 30, this.player.y);
		}

		else this.sword.setPosition(this.player.x - 30, this.player.y);



		this.physics.add.overlap(this.sword, this.enemyspawn.group, this.destroyEnemy, null, this)
		this.physics.add.overlap(this.enemyspawn.group, this.player, this.playerhurt, null, this)
    }

	destroyEnemy = (sword, enemy) => {
		if (enemy && enemy.health > 0 ) {
			if (this.canExecute) {
				//console.log(Boolean(this.canExecute))
				this.canExecute = false
				enemy.setAcceleration(20000*Math.cos(this.player_cursor), 20000*Math.sin(this.player_cursor))
				enemy.health -= 1
				setTimeout(() => {
					this.canExecute = true
					if (enemy.health > 0) {
						enemy.setAcceleration(0,0)
					}
				}, 400);
				//console.log(enemy.health)
			}
		}
		if (enemy && enemy.health <= 0) {
			enemy.destroy()
		}
		}

		playerhurt = (this.player, enemy => {
			if (enemy && this.player.health > 0) {
				if (this.playerExecute) {
					this.player.health -= 1
					this.playerExecute = false
					setTimeout(() => {
						this.playerExecute = true
					}, 1000);
					setTimeout(() => {
						this.player.setAcceleration(0,0)
					}, 500)
					console.log(this.player.health)

				}
			}
		})
}




