export default class menu extends Phaser.Scene{
    constructor() {
        super("menu")
    }

    preload() {

    }

    create() {
        this.start = false
        this.text = this.add.text(600,400, 'Click to start!', { font: '80px Arial', fill: '#FFFFFF' });
        this.input.keyboard.addKey("E")
    }

    update() {
        if (this.input.activePointer.isDown) {
            this.start = true
        }

        if (this.start == true) {
            this.scene.start('loading_screen')
            this.start = false
        }
    }
}