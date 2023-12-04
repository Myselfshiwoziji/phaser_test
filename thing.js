import Phaser from "phaser";
import loading_screen from "./scenes";

export default class thing { 
    constructor(scene, enemy = 'enemy') {
        this.scene = scene
        this.key = enemy
        this._group = this.scene.physics.add.group()
    }

    get group()
    {
        return this._group
    }

    spawn(playerX = 0)
    {
        const x = (playerX < 400) ? Phaser.Math.Between(400, 800): Phaser.Math.Between(0,400)

        const enemyguy = this.group.create(700, 200, this.key)
        enemyguy.setVelocity(Phaser.Math.Between(-0, 0), 0)

        

        return enemyguy
    }



}

