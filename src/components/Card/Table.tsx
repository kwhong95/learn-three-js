import { GroupProps } from '@react-three/fiber'

const Table = (props: GroupProps) => (
  <group {...props}>
    <mesh rotation={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 10]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  </group>
)

export default Table
