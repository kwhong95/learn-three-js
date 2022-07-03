import * as THREE from 'three'
import React, { lazy, useRef, useEffect, Suspense } from 'react'
import { GroupProps } from '@react-three/fiber'
import { useSpringRef, useSpring, animated } from '@react-spring/three'
import { useControls } from 'leva'

import { cardSpringConf } from './config'
import { CardGeometry } from './geometry'

const useCardGeometry = () => {
  const geometry = useRef<THREE.ShapeGeometry>(CardGeometry())
  return geometry.current
}

const Timeout = lazy(() => {
  return new Promise<any>((resolve) => {
    setTimeout(() => resolve({ default: () => <></> }), 1000 * Math.random())
  })
})

export interface CardProps extends GroupProps {
  flip?: boolean
  lift?: boolean
}

const Card: React.FC<CardProps> = ({
  flip,
  lift,
  onPointerEnter,
  onPointerLeave,
  ...props
}) => {
  const geometry = useCardGeometry()
  const mesh = useRef<THREE.Mesh>(null)
  const spring = useSpringRef()

  const springProps = useSpring(
    {
      ref: spring,
      opacity: 0,
      position: [0, -0.5, 0],
      config: cardSpringConf,
    },
    [spring],
  )

  useEffect(() => {
    spring.start({
      from: { opacity: 0, position: [0, -0.5, 0] },
      to: { opacity: 1, position: [0, 0, 0] },
      config: cardSpringConf,
    })
  }, [spring])

  useEffect(() => {
    spring.start({
      rotation: [0, flip ? 0 : Math.PI, 0],
      position: [0, 0, lift || 0],
      config: cardSpringConf,
    })
  }, [spring, flip, lift])

  const { wireframe } = useControls({
    wireframe: false,
  })

  return (
    <animated.group {...props}>
      <animated.mesh
        {...springProps}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        geometry={geometry}
        ref={mesh}
        castShadow
        receiveShadow
      >
        <meshPhongMaterial
          transparent
          opacity={1}
          color="#555"
          wireframe={wireframe}
        />
      </animated.mesh>
    </animated.group>
  )
}

const SuspendedCard = (props: any) => (
  <Suspense fallback={<></>}>
    <Timeout />
    <Card {...props} />
  </Suspense>
)

export default SuspendedCard
