import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
    constructor(){
        super()
        console.log('sizes init');

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')

            console.log(`resize: ${this.width} / ${this.height}`);
        })
    }
}