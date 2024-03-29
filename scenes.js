import thing from './thing.js'

export default class loading_screen extends Phaser.Scene {

    constructor() {
		super({key: 'loading_screen'});
    }

	spawnMoreEnemies(no) { 
		if (this.enemyspawn.group.getChildren().length == 0 && this.slimespawn.group.getChildren().length == 0) {
			this.wave += 1
			this.player.health += 1
			for (let i = 0; i < no + 3; i++) {
				this.spawner = Math.random()
				if (this.wave > 20) {
					this.prob = 1
				}
				else {
					this.prob = this.wave/20
				}
				if (this.spawner > this.prob) {
					this.enemyspawn.spawn()
				}
				else {
					this.slimespawn.spawn()
				}
			}
		}
	}

    preload(){ 
        this.load.image('Background', 'assets/game_banner.png')
        this.load.spritesheet('guy', 'assets/Warrior-Red.png', {frameWidth: 32, frameHeight: 32})
		this.load.image('fields', 'assets/fields-1.png')
		this.load.image('sword', 'assets/sword.png')
		this.load.image('wall', 'assets/wall.png')
		this.load.spritesheet('enemy', 'assets/Mage-Cyan.png', {frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('slime','assets/Slime.png', {frameWidth: 32, frameHeight: 32})
		this.load.image('tree', 'assets/Tree.png')
		this.cameras.main.setRoundPixels(true)

    }

    create() {

        this.add.image(950, 300, 'fields').setScale(10)
		this.cursors = this.input.keyboard.createCursorKeys()
		this.player = this.createPlayer()
		this.enemyspawn = new thing(this, 'enemy')
		this.slimespawn = new thing(this, 'slime')
		this.sword = this.physics.add.image(this.player.x, this.player.y, 'sword').setScale(1.5)
		this.canExecute = true
		this.playerExecute = true
		this.clickExecute = true
		this.player.health = 5
		this.wave = 0
		this.physics.world.setBounds(-350,-1000,2600,2591)
		this.score = 0
		this.wave_speed_multi = 2**(0.1*(this.wave - 1))
		this.cameras.main.setRoundPixels(true)

		this.createWall()

		this.physics.add.collider(this.enemyspawn.group, this.enemyspawn.group)
		this.physics.add.collider(this.slimespawn.group, this.enemyspawn.group)
		this.physics.add.collider(this.slimespawn.group, this.slimespawn.group)


		this.swordhit_cooldown = 500
		this.swordhit_knockback = 20000
		this.swordhit_damage = 1
		this.swordhit_traveltime = 1400
		const Ekey = this.input.keyboard.addKeys("E")

		this.anims.create({
			key: 'keynove',
			frames: this.anims.generateFrameNumbers('enemy', { start: 1, end: 4 }),
			frameRate: 8,
			repeat: -1			
		})

		this.anims.create({
			key: 'slimekey',
			frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 2 }),
			frameRate: 8,
			repeat: -1			
		})

		this.player.body.setSize(19, 22)
		this.sword.body.setSize(40,51)
		this.sword.setAngle(10)

		this.scoreboard = this.add.text(this.cameras.main.x , this.cameras.main.y , `Score: ${this.score}`, { font: '48px Arial', fill: '#000000' });
		this.wavenumber = this.add.text(this.cameras.main.x , this.cameras.main.y , `Score: ${this.wave}`, { font: '48px Arial', fill: '#000000' });
		this.healthbar = this.add.text(this.cameras.main.x , this.cameras.main.y , `Score: ${this.player.health}`, { font: '48px Arial', fill: '#000000' });



    }

	createWall()
	{
		const wall = this.physics.add.staticGroup()

		wall.create(1050, 300, 'tree').setScale(7).refreshBody()

		this.physics.add.collider(this.player, this.createWall.group)
		this.physics.add.collider(this.enemyspawn.group, this.createWall.group)

		return wall
	}
 
    createPlayer()
	{
		const player = this.physics.add.sprite(800, 400, 'guy').setScale(4)
        player.setCollideWorldBounds(true)

		this.anims.create({
			key: 'forward',
			frames: this.anims.generateFrameNumbers('guy', { start: 2, end: 3 }),
			frameRate: 6,
			repeat: -1
		})

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('guy', { start: 49, end: 50 }),
			frameRate: 6,
			repeat: -1
		})

		this.anims.create({
			key: 'backward',
			frames: this.anims.generateFrameNumbers('guy', { start: 98, end: 99 }),
			frameRate: 6,
			repeat: -1
		})

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('guy', { start: 145, end: 146 }),
			frameRate: 6,
			repeat: -1
		})

		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('guy', {start: 0, end: 1}),
			frameRate: 2,
			repeat: -1,
		})

        return player
    }


    update() {

		this.scoreboard.setPosition(this.player.x - 800 , this.player.y - 470)
		this.wavenumber.setPosition(this.player.x - 800 , this.player.y - 400)
		this.healthbar.setPosition(this.player.x + 500 , this.player.y - 470)


		this.scoreboard.setText(`Score: ${this.score}`)
		this.wavenumber.setText(`Wave: ${this.wave}`)
		this.healthbar.setText(`Health: ${this.player.health}`)



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
	
			// Normalizing direction
			const length = Math.sqrt(directionX * directionX + directionY * directionY);
			const normalizedDirectionX = directionX / length;
			const normalizedDirectionY = directionY / length;
	
			const speed = length > 75 ? length: 0
			child.setVelocity(normalizedDirectionX * speed * this.wave_speed_multi, normalizedDirectionY * speed *this.wave_speed_multi);
			child.anims.play('keynove', true)
			child.body.setSize(22, 23)

			this.distancefromplayerx = child.x - this.player.x
			this.distancefromplayery = child.y - this.player.y

		}, this);

		this.slimespawn.group.getChildren().forEach(function(child) {
			const directionX = this.player.x - child.x;
			const directionY = this.player.y - child.y;
	
			// Normalizing direction
			const length = Math.sqrt(directionX * directionX + directionY * directionY);
			const normalizedDirectionX = directionX / length;
			const normalizedDirectionY = directionY / length;
	
			const speed = length > 100 ? 400 : 3 
			child.setVelocity((normalizedDirectionX * speed + 1) * this.wave_speed_multi, (normalizedDirectionY * speed + 1) *this.wave_speed_multi);
			child.anims.play('slimekey', true)
			child.body.setSize(18, 14)

			this.distancefromplayerx = child.x - this.player.x
			this.distancefromplayery = child.y - this.player.y

		}, this);

		//player movement
		const rawplayerspeed = 300
		this.speed_multi = 1
		if (this.player.body.velocity.x != 0 && this.player.body.velocity.y != 0) {
			var playerspeed = rawplayerspeed*this.speed_multi/Math.sqrt(2);
		}

		else {
			var playerspeed = rawplayerspeed*this.speed_multi
		}



		if (keys.A.isDown || this.cursors.left.isDown)
		{
			this.player.setVelocityX(-playerspeed)

			if (keys.W.isDown || keys.S.isDown) {
			}	
			else {
				this.player.anims.play('left', true)
			}

		}


		else if (keys.D.isDown || this.cursors.right.isDown)
		{
			this.player.setVelocityX(playerspeed)
			if (keys.W.isDown || keys.S.isDown) {
			}	
			else {
				this.player.anims.play('right', true)
			}
		}

		else {
			this.player.setVelocityX(0)
		}

		if (keys.W.isDown || this.cursors.up.isDown)
        {
			this.player.setVelocityY(-playerspeed)
			this.player.anims.play('backward', true)
		}
        else if (keys.S.isDown || this.cursors.down.isDown)
        {
			this.player.setVelocityY(playerspeed)
			this.player.anims.play('forward', true)
		}

        else
		{
			this.player.setVelocityY(0)
		}

		if (keys.S.isDown == false && keys.A.isDown == false && keys.W.isDown == false && keys.D.isDown == false) {
			this.player.anims.play('idle', true)
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
				this.sword.setPosition(this.player.x + 40, this.player.y + 0);
			}
			else this.sword.setPosition(this.player.x - 40, this.player.y + 0);
		}

		this.physics.add.overlap(this.sword, this.enemyspawn.group, this.destroyEnemy, null, this)
		this.physics.add.overlap(this.enemyspawn.group, this.player, this.playerhurt, null, this)
		this.physics.add.overlap(this.sword, this.slimespawn.group, this.destroySlime, null, this)
		this.physics.add.overlap(this.slimespawn.group, this.player, this.playerslimehurt, null, this)
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
			this.score += 1
		}
	}

	destroySlime = (sword, slime) => {
		if (slime && slime.health > 0 ) {
			if (this.canExecute) {
				this.canExecute = false
				slime.setAcceleration(this.swordhit_knockback*Math.cos(this.player_cursor), this.swordhit_knockback*Math.sin(this.player_cursor))
				slime.health -= this.swordhit_damage
				setTimeout(() => {
					this.canExecute = true
					if (slime.health > 0) {
						slime.setAcceleration(0,0)
					}
				}, this.swordhit_cooldown);
			}
		}
		if (slime && slime.health <= 0) {
			slime.destroy()
			this.score += 2
		}
	}

	playerhurt = (this.player, enemy => {
		if (enemy && this.player.health > 0) {
			if (this.playerExecute) {
				this.player.health -= 1
				this.playerExecute = false
				this.player.setAcceleration(50*this.distancefromplayerx,-50*this.distancefromplayery)
				setTimeout(() => {
					this.playerExecute = true
				}, 700);
				setTimeout(() => {
					this.player.setAcceleration(0,0)
				}, 700)	
			}
		}

		if (this.player.health <= 0) {
			this.playerExecute = false
			this.player.disableBody(true, true)
			this.sword.disableBody(true, true)
			this.death = this.add.text(this.player.x , this.player.y , `You died!`, { font: '58px Arial', fill: '#000000' });
		}
	})

	playerslimehurt = (this.player, slime => {
		if (slime && this.player.health > 0) {
			if (this.playerExecute) {
				this.player.health -= 2
				this.playerExecute = false
				this.player.setAcceleration(80*this.distancefromplayerx,-80*this.distancefromplayery)
				setTimeout(() => {
					this.playerExecute = true
				}, 700);
				setTimeout(() => {
					this.player.setAcceleration(0,0)
				},700)	
			}
		}

		if (this.player.health <= 0) {
			this.playerExecute = false
			this.player.disableBody(true, true)
			this.sword.disableBody(true, true)
			this.death = this.add.text(this.player.x , this.player.y , `You died!`, { font: '58px Arial', fill: '#000000' });
		}
	})
}




