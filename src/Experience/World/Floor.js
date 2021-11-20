import * as THREE from 'three'

import Experience from "../Experience";


export default class Floor {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
 
    }

    setGeometry(){
        this.geometry = new THREE.CircleGeometry(5, 64)
    }
    setTextures(){
        this.colorTexture = this.resources.items.grassColorTexture
        this.colorTexture.encoding = THREE.sRGBEncoding
        this.colorTexture.repeat.set(1.5, 1.5)
        this.colorTexture.wrapS = THREE.RepeatWrapping
        this.colorTexture.wrapT = THREE.RepeatWrapping

        this.normalTexture = this.resources.items.grassNormalTexture
        this.normalTexture.repeat.set(1.5, 1.5)
        this.normalTexture.wrapS = THREE.RepeatWrapping
        this.normalTexture.wrapT = THREE.RepeatWrapping
    }
    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map: this.colorTexture,
            normalMap: this.normalTexture
        })
    }
    setMesh(){
        this.mesh = new THREE.Mesh(
            this.geometry,
            this.material
        )
        this.mesh.rotation.x = -Math.PI / 2
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }


}