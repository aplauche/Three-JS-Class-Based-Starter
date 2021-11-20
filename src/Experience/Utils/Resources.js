import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "../Utils/EventEmitter";


export default class Resources extends EventEmitter {
    constructor(sources){
        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setupLoaders()
        this.load()
    }

    setupLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeLoader = new THREE.CubeTextureLoader()

    }

    load(){
        this.sources.forEach(source=>{
            if(source.type === 'gltfModel'){
                this.loaders.gltfLoader.load(source.path, (file)=>{
                    this.handleLoaded(source, file);
                })
            }
            else if(source.type === 'texture'){
                this.loaders.textureLoader.load(source.path, (file)=>{
                    this.handleLoaded(source, file);
                })
            }
            else if(source.type === 'cubeTexture'){
                this.loaders.cubeLoader.load(source.path, (file)=>{
                    this.handleLoaded(source, file);
                })
            }
        })
    }

    handleLoaded(source, file){
        this.items[source.name] = file
        this.loaded += 1
        if(this.loaded === this.toLoad){
            this.trigger('ready')
        }
    }
}