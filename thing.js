import Phaser, { Physics, Scene, Scenes } from "phaser";
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

    spawn()
    {
        const xrand = Math.floor((Math.random() - Math.random()) * 2701)
        const yrand = Math.floor((Math.random() - Math.random()) * 2001)


        const enemyguy = this.group.create(xrand, yrand, this.key)
        enemyguy.health = 5

  

        //enemyguy.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100))
        return enemyguy
    }

    // update() {
    //     let vector = new Phaser.Math.Vector2(enemyguy.x - Scenes.player.x, this.enemyguy.y - Scenes.player.y)
    //     vector.normalize()
    //     vector.scale(100)
    //     this.enemyguy.setVelocity(vector.x, vector.y)    

    // }




}

