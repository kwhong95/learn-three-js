import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { useRef } from 'react'
import { FullWidth, WidthPadding } from 'styles'

interface Props {
  children?: React.ReactNode
}

const ThreeCanvas: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.position = 'absolute'
      ref.current.style.width = `${window.innerWidth}px`
      ref.current.style.height = `${window.innerHeight}px`
      ref.current.style.left = `-${
        (window.innerWidth - FullWidth) / 2 + WidthPadding
      }px`
    }
  }, [])

  return <Canvas ref={ref}>{children}</Canvas>
}

export default ThreeCanvas
