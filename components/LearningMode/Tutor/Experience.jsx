import {Box, Gltf, OrbitControls, useTexture, Environment, CameraControls, PerspectiveCamera} from "@react-three/drei"
import Teacher from "./Teacher"
import {useThree} from "@react-three/fiber"

export default function Experience() {
  const texture = useTexture("/Default_the_pyramid_of_egypt_1.jpg")
  const viewport = useThree(state => state.viewport)

  return (
    <>
      <OrbitControls /> 
      <Teacher position={[0, -3, 5]} scale={2} fov={42} />
      <Environment preset={'sunset'} />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]}  />
        <meshBasicMaterial map={texture} />

      </mesh>
    </>
  )
}