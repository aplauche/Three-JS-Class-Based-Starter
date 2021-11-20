import * as THREE from 'three'

import Experience from "../Experience";
import Time from '../Utils/Time';


export default class Fox {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug


        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('fox')

            const debugObject = {
                playIdle: () => {this.toggleAnimation('idle')},
                playWalk: () => {this.toggleAnimation('walk')},
                playRun: () => {this.toggleAnimation('run')}
            }

            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalk')
            this.debugFolder.add(debugObject, 'playRun')
        }

        this.asset = this.resources.items.foxModel


        this.setModel()

        this.setupAnimations()
 
    }

    setModel(){
        this.model = this.asset.scene
        this.model.scale.set(0.02,0.02,0.02)
        this.scene.add(this.model)

        this.model.traverse(child => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true
            }
        })
    }

    setupAnimations(){
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.asset.animations[0])
        this.animation.actions.walk = this.animation.mixer.clipAction(this.asset.animations[1])
        this.animation.actions.run = this.animation.mixer.clipAction(this.asset.animations[2])

        this.animation.actions.current = this.animation.actions.idle

        this.animation.actions.current.play()
    
    }

    toggleAnimation(name){
        const newAction = this.animation.actions[name]
        const oldAction = this.animation.actions.current

        newAction.reset()
        newAction.play()

        newAction.crossFadeFrom(oldAction, 1)

        this.animation.actions.current = newAction
    }

    update(){
        this.animation.mixer.update(this.time.delta / 1000)
    }


}