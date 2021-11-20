import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter{
    constructor(){
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16 // logical starter for 60fps

        window.requestAnimationFrame(()=>{
            // calling within animation frame avoids bugs 
            this.tick()
        })
 

        console.log('time init');
    }

    tick(){

        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(()=>{

            this.tick()
        })
    }
}