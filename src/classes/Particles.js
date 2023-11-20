import { Group, AdditiveBlending, PointsMaterial, BufferAttribute, Points, BufferGeometry } from 'three';

export default class Particles extends Group {
  constructor() {
    super()
    this.particleMaterial = new PointsMaterial( { size: 0.01, transparent: true } );
    this.particlesGeometry = new BufferGeometry;
    this.particlesCount = 300;
    this.posArray = new Float32Array(this.particlesCount * 3);

    for (let i = 0; i < this.particlesCount; i++) {
        this.posArray[i] = Math.random() * 10 - 5;
    }

    this.particleBufferAttribute = new BufferAttribute(this.posArray, 3);
    this.particlesGeometry.setAttribute( 'position', this.particleBufferAttribute );

    this.particlesMesh = new Points(this.particlesGeometry, this.particleMaterial);
    this.particlesMesh.counter = 0;
    this.add(this.particlesMesh);
  }
}