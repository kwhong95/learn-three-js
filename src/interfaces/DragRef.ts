import * as THREE from 'three'

export interface DragRef {
  x: number
  y: number
  vX: number
  vY: number
  dX: number
  dY: number
  i?: number
  dragging: boolean
  dragged: boolean
  object?: THREE.Object3D
}
