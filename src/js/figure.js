import * as THREE from "three";
import { gsap } from "gsap";
import vertexSource from "./shader/vertexShader.glsl";
import fragmentSource from "./shader/fragmentShader.glsl";

export default class Figure {
	constructor(el, scene) {
		this.$image = el;
		this.scene = scene

		this.loader = new THREE.TextureLoader()

		this.image = this.loader.load(this.$image.src)
		// this.hoverImage = this.loader.load(this.$image.dataset.hover)
    this.$image.style.opacity = 0
		this.sizes = new THREE.Vector2(0, 0)
		this.offset = new THREE.Vector2(0, 0)

    this.uniforms = {
      uTime: {
        value: 0.0
      },
      uTex: {
        value: this.texture
      },
      // uResolution: {
      //   value: new THREE.Vector2(this.viewport.width, this.viewport.height)
      // },
      // uTexResolution: {
      //   value: new THREE.Vector2(2048, 1024)
      // },
    };

		this.getSizes()

		this.createMesh()

    this.mouse = new THREE.Vector2(0, 0)
    window.addEventListener('mousemove', ev => {
        this.onMouseMove(ev)
    })
	}

  getSizes() {
		const { width, height, top, left } = this.$image.getBoundingClientRect()

    // console.log(height);

		this.sizes.set(width, height)
		// this.offset.set(left - window.innerWidth / 2 + width / 2, -top + window.innerHeight / 2 - height / 2)
		this.offset.set(left - width / 2, -top + window.innerHeight / 2 - height / 2)
	}

  createMesh() {
    //テクスチャ
    const loader = new THREE.TextureLoader();
    this.uniforms.uTex.value = loader.load(this.$image.src);

		this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
		// this.material = new THREE.MeshBasicMaterial({
		// 	map: this.image
		// })
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexSource,
      fragmentShader: fragmentSource,
      // side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material)

		// this.mesh.position.set(this.offset.x, this.offset.y, 0)
		// this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
    this.setParams();

		this.scene.add(this.mesh)
	}

  setParams() {
		this.mesh.position.set(this.offset.x, this.offset.y, 0)
		this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
  }

  onMouseMove(event) {
    gsap.to(this.mouse, 0.5, {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
    })

    gsap.to(this.mesh.rotation, 0.5, {
        x: -this.mouse.y * 0.2,
        y: this.mouse.x * (Math.PI / 8)
    })
  }

  update() {
    this.getSizes();
    this.setParams();
    // console.log('update');
  }
}