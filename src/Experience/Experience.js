import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Debug from './Utils/Debug.js'


// turn into a singleton
let instance = null

export default class Experience {
    constructor(canvas){

        if(instance){
            return instance
        }

        instance = this

        // global access
        window.experience = this

        // props
        this.canvas = canvas

        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // events
        this.sizes.on('resize', this.resize.bind(this))
        this.time.on('tick', this.tick.bind(this))
    }

    resize(){
        console.log('resize triggered');
        this.camera.resizeCamera()
        this.renderer.resize()
    }

    tick(){
        console.log('tick occured');
        this.camera.updateControls()
        this.world.update()
        this.renderer.update()
    }

    destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        // traverse the whole scene
        this.scene.traverse(child => {

            if(child instanceof THREE.Mesh){

                // get rid of geometries
                child.geometry.dispose()

                // go through each material item and check if the subitem has a dispose method
                for(const key in child.material){
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function'){
                        value.dispose()
                    }
                }
            }

        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        
        if(this.debug.active){
            this.debug.ui.destroy()
        }
    }
}