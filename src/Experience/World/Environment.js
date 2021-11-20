import * as THREE from 'three'

import Experience from "../Experience";

export default class Environment {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.createSunlight()
        this.createEnvMap()

        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('environment')
            
            this.debugFolder.add(this.envMap, 'intensity').name("envMap").min(0).max(4).step(0.001).onChange(this.updateEnvMap.bind(this))
            this.debugFolder.add(this.sunlight, 'intensity').name('Sun').min(0).max(10).step(0.001)
            this.debugFolder.add(this.sunlight.position, 'x').name('Sun x Pos').min(-5).max(5).step(0.001)
            this.debugFolder.add(this.sunlight.position, 'y').name('Sun y Pos').min(-5).max(5).step(0.001)
            this.debugFolder.add(this.sunlight.position, 'z').name('Sun z Pos').min(-5).max(5).step(0.001)

        }
    }

    createSunlight(){
        this.sunlight = new THREE.DirectionalLight('#ffffff', 4)

        this.sunlight.castShadow = true
        this.sunlight.shadow.camera.far = 15
        this.sunlight.shadow.mapSize.set(1024, 1024)
        this.sunlight.shadow.normalBias = 0.05
        this.sunlight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunlight)
    }

    createEnvMap(){
        this.envMap = {}
        this.envMap.intensity = 0.4
        this.envMap.texture = this.resources.items.envMapTexture
        this.envMap.texture.encoding = THREE.sRGBEncoding
        this.scene.environment = this.envMap.texture

        this.updateEnvMap()
    }

    updateEnvMap(){
        this.scene.traverse(child => {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                child.material.envMap = this.envMap.texture
                child.material.envMapIntensity = this.envMap.intensity
                child.material.needsUpdate = true
            }
        })
    }
}