// import Phaser, { Physics, Scene, Scenes } from "phaser";
// import loading_screen from "./scenes";

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


        const enemyguy = this.group.create(xrand, yrand, this.key).setScale(4)
        enemyguy.health = 5

        
        

  

        //enemyguy.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100))
        return enemyguy
    }





}

