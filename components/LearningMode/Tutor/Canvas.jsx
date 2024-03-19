import {Box, Gltf, OrbitControls, Environment, CameraControls, PerspectiveCamera} from "@react-three/drei"
import {Canvas as CV} from "@react-three/fiber"

import Experience from "./Experience"

export default function Canvas() {
  return (
    <CV shadows camera={{position: [0,0,8], fov: 30}} >
      <color attachment="background" args={["#ececec"]} />
      <Experience />
    </CV>
  )
}