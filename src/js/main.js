import '../css/style.scss'
import * as THREE from "three";
// import vertexSource from "./shader/vertexShader.glsl";
// import fragmentSource from "./shader/fragmentShader.glsl";
import Figure from './figure';

// import img from '../images/image.jpg';

class Main {
  constructor() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.canvas = document.querySelector("#canvas");
    this.renderer = null;
    this.scene = new THREE.Scene();
    this.camera = null;
    this.cameraFov = 45;
    this.cameraFovRadian = (this.cameraFov / 2) * (Math.PI / 180);
    this.cameraDistance = (this.viewport.height / 2) / Math.tan(this.cameraFovRadian);
    this.geometry = null;
    this.material = null;
    this.mesh = null;

    // this.figure = new Figure(this.scene);

    this.imgPlaneArray = [];

    // this.uniforms = {
    //   uTime: {
    //     value: 0.0
    //   },
    //   uTex: {
    //     value: this.texture
    //   },
    //   uResolution: {
    //     value: new THREE.Vector2(this.viewport.width, this.viewport.height)
    //   },
    //   uTexResolution: {
    //     value: new THREE.Vector2(2048, 1024)
    //   },
    // };

    // this.clock = new THREE.Clock();

    this.init();

  }

  _setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.viewport.width, this.viewport.height);
  }

  _setCamera() {

    //ウインドウとWebGL座標を一致させる
    this.camera = new THREE.PerspectiveCamera(this.cameraFov, this.viewport.width / this.viewport.height, 1, this.cameraDistance * 2);
    this.camera.position.z = this.cameraDistance;
    // this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.camera);
  }

  _addMesh() {
    const imgArray = [...document.querySelectorAll('.list img')];
    for(const img of imgArray) {
      const imgMesh = new Figure(img, this.scene);
      
      this.imgPlaneArray.push(imgMesh);
    }
  }

  // _addMesh() {
  //   //ジオメトリ
  //   this.geometry = new THREE.PlaneGeometry(this.viewport.width, this.viewport.height, 40, 40);

  //   //テクスチャ
  //   const loader = new THREE.TextureLoader();
  //   this.uniforms.uTex.value = loader.load(img);

  //   // console.log(this.texture);

  //   //マテリアル
  //   this.material = new THREE.ShaderMaterial({
  //     uniforms: this.uniforms,
  //     vertexShader: vertexSource,
  //     fragmentShader: fragmentSource,
  //     side: THREE.DoubleSide
  //   });

  //   //メッシュ
  //   this.mesh = new THREE.Mesh(this.geometry, this.material);
  //   // this.scene.add(this.mesh);
  // }

  init() {
    this._setRenderer();
    this._setCamera();
    // this._addMesh();

    this._addMesh();

    this._update();
    this._addEvent();
  }

  _update() {
    // const elapsedTime = this.clock.getElapsedTime();
    // // this.uniforms.uTime.value = elapsedTime * 0.03;

    for(const img of this.imgPlaneArray) {
      img.update();
    }
    // this.figure.update();

    //レンダリング
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._update.bind(this));
  }

  _onResize() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    // レンダラーのサイズを修正
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    // カメラのアスペクト比を修正
    this.camera.aspect = this.viewport.width / this.viewport.height;
    this.camera.updateProjectionMatrix();
    // カメラの位置を調整
    this.cameraDistance = (this.viewport.height / 2) / Math.tan(this.cameraFovRadian); //ウインドウぴったりのカメラ距離
    this.camera.position.z = this.cameraDistance;
    // uniforms変数に反映
    // this.mesh.material.uniforms.uResolution.value.set(this.viewport.width, this.viewport.height);
    // meshのscale設定
    // const scaleX = Math.round(this.viewport.width / this.mesh.geometry.parameters.width * 100) / 100 + 0.01;
    // const scaleY = Math.round(this.viewport.height / this.mesh.geometry.parameters.height * 100) / 100 + 0.01;
    // this.mesh.scale.set(scaleX, scaleY, 1);
  }

  _addEvent() {
    window.addEventListener("resize", this._onResize.bind(this));
  }
}

const main = new Main();
