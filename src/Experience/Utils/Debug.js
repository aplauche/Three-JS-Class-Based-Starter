import * as dat from 'dat.gui'

export default class Debug  {
    constructor(){
 
        // Check if #debug is in url
        this.active = window.location.hash == '#debug'

        if(this.active){
            this.ui = new dat.GUI()
            console.log('debug active');
        }

    }
}