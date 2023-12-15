import Phaser from 'phaser'
import { Column } from 'phaser-ui-tools';
import thing from './thing.js'

export default class loading_screen extends Phaser.Scene {

    constructor() {
        super(loading_screen)
        this.player = undefined
        this.cursors = undefined
		this.enemyspawn = undefined
		this.sword = undefined

    }

	spawnMoreEnemies(no) {
		if (this.enemyspawn.group.getChildren().length == 0) {
			this.wave += 1
			this.player.health += 1
			console.log(`wave ${this.wave}`)
			for (let i = 0; i < no + 3; i++) {
				this.enemyspawn.spawn()
			}
		}
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
        this.add.image(950, 300, 'fields').setScale(10)
		this.cursors = this.input.keyboard.createCursorKeys()
		this.player = this.createPlayer()
		//const wall = this.createWall()
		this.enemyspawn = new thing(this, 'enemy')
		this.sword = this.physics.add.image(this.player.x, this.player.y, 'sword').setScale(1.8)
		this.canExecute = true
		this.playerExecute = true
		this.clickExecute = true
		this.player.health = 5
		this.wave = 0

		//colliders
		//this.physics.add.collider(this.player, wall)
		//this.physics.add.collider(this.enemyspawn.group, wall)
		this.physics.add.collider(this.enemyspawn.group, this.enemyspawn.group)

		//sword
		this.swordhit_cooldown = 500
		this.swordhit_knockback = 20000
		this.swordhit_damage = 1
		this.swordhit_traveltime = 1400
		const Ekey = this.input.keyboard.addKeys("E")

		this.enemyspawn.group.getChildren().forEach(function(enemy) {
            enemy.health = Math.floor(5*Math.log(this.wave + 1));

        });


    }



	// createWall()
	// {
	// 	const wall = this.physics.add.staticGroup()

	// 	wall.create(1050, 300, 'wall').setScale(1.5).refreshBody()

	// 	return wall
	// }
 
    createPlayer()
	{
		const player = this.physics.add.sprite(800, 400, 'guy').setScale(3)
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
		//wave spawn mechanic
		setTimeout(() => {
			this.spawnMoreEnemies(this.wave)
		}, 100);

		//movement keys
		this.cameras.main.startFollow(this.player)
		var keys = this.input.keyboard.addKeys("W,A,S,D")

		//go towards player
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



	

		//player movement
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

		//sword spin
		this.swordtoplayer_angle = Phaser.Math.Angle.Between(this.sword.x, this.sword.y, this.player.x, this.player.y)
		this.input.on('pointerdown', function (pointer) {
			if (pointer.leftButtonDown()) {
				if (this.clickExecute == true) {
					var throw_speed = Math.sqrt((this.input.activePointer.x - 957)**2 + (this.input.activePointer.x - 556)**2)
					this.sword.setAngularVelocity(800)
					this.swordhit_cooldown = 100
					this.swordhit_damage = 2
					this.swordhit_knockback = 3000*Math.floor(Math.sqrt(throw_speed))
					// console.log('cursorx ' + this.input.activePointer.x)
					// console.log('cursory ' + this.input.activePointer.y)
					this.sword.setVelocity(throw_speed*Math.cos(this.player_cursor), throw_speed*Math.sin(this.player_cursor))
					setTimeout(() => {
						this.sword.setAcceleration(3*throw_speed*Math.cos(this.swordtoplayer_angle),3*throw_speed*Math.sin(this.swordtoplayer_angle))
					}, this.swordhit_traveltime/4)
					this.clickExecute = false
					setTimeout(() => {
						this.clickExecute = true
					}, this.swordhit_traveltime)
				}
			}
			return pointer
		}, this);

		//sword enlarge swing


		const screenCenterX = this.cameras.main.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.y + this.cameras.main.height / 2;
		const playerCenterX = this.player.x
		const playerCenterY = this.player.y

		//console.log((180*Phaser.Math.Angle.Between(screenCenterX, screenCenterY, this.input.activePointer.x, this.input.activePointer.y))/Math.PI)
		// var cursor_angle = Phaser.Math.Angle.Between(screenCenterX, screenCenterY, this.input.activePointer.x, this.input.activePointer.y)
		this.player_cursor = Phaser.Math.Angle.Between(screenCenterX, screenCenterY, this.input.activePointer.x, this.input.activePointer.y)
		//this.sword.angle = this.player_cursor*180/Math.PI + 90

		if (this.clickExecute == true) {
			this.sword.angle = this.player_cursor*180/Math.PI + 90
			this.sword.setVelocity(0,0)
			this.sword.setAngularVelocity(0)
			this.sword.setAcceleration(0,0)
			this.swordhit_cooldown = 500
			this.swordhit_knockback = 20000
			this.swordhit_damage = 1
			if (this.sword.angle > 0) {
				this.sword.setPosition(this.player.x + 30, this.player.y);
			}
			else this.sword.setPosition(this.player.x - 30, this.player.y);
		}

		this.physics.add.overlap(this.sword, this.enemyspawn.group, this.destroyEnemy, null, this)
		this.physics.add.overlap(this.enemyspawn.group, this.player, this.playerhurt, null, this)
    }

	destroyEnemy = (sword, enemy) => {
		if (enemy && enemy.health > 0 ) {
			if (this.canExecute) {
				this.canExecute = false
				enemy.setAcceleration(this.swordhit_knockback*Math.cos(this.player_cursor), this.swordhit_knockback*Math.sin(this.player_cursor))
				enemy.health -= this.swordhit_damage
				setTimeout(() => {
					this.canExecute = true
					if (enemy.health > 0) {
						enemy.setAcceleration(0,0)
					}
				}, this.swordhit_cooldown);
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
				this.player.setAcceleration(0,0)
				setTimeout(() => {
					this.playerExecute = true
				}, 1000);
				setTimeout(() => {
					this.player.setAcceleration(0,0)
				}, 500)
				console.log(this.player.health)
			}
		}

		if (this.player.health == 0) {
			this.playerExecute = false
			console.log('you died!')
			this.player.flipY
			this.player.disableBody(true, true)
			this.sword.disableBody(true, true)
		}
	})
}




