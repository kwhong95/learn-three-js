import * as THREE from 'three'

export interface MouseRef {
  position: {
    x: number
    y: number
  }
  hoverPosition: {
    x: number
    y: number
  }
  object?: THREE.Object3D
}
