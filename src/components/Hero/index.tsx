import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

const Hero = () => {
  return (
    <Canvas
      shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}
      dpr={window.devicePixelRatio}
      style={{ height: '100vh' }}
    >
      <Scene />
    </Canvas>
  )
}

export default Hero
