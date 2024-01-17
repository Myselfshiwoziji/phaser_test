export default class menu extends Phaser.Scene{
    constructor() {
        super("menu")
    }

    preload() {
        this.load.image('banner', 'assets/game_banner.png')

    }

    create() {
        this.start = false
        this.text = this.add.text(600,600, 'Click to start!', { font: '80px Arial', fill: '#FFFFFF' });
        this.add.image(830, 400, 'banner')
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