import {Box, Gltf, OrbitControls, Environment, CameraControls, PerspectiveCamera} from "@react-three/drei"
import {Canvas as CV} from "@react-three/fiber"
import {useStore} from "@/hooks/useStore"
import {useEffect} from 'react'

import Experience from "./Experience"

export default function Canvas() {
  const setLoader = useStore(state => state.setLoader);
  useEffect(() => {
    return () => setLoader(false)
  }, [])

  return (
    <CV shadows camera={{position: [0,0,8], fov: 42, near: 1, far: 1000}} >
      <CameraManager /> 
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </CV>
  )
}

function CameraManager() {
  return (
    <CameraControls 
      minZoom={1}
      maxZoom={1}
      polarRotateSpeed={0}
      azimuthRotateSpeed={0}
      mouseButtons={{
        left: 1,
        wheel: 16
      }}
      touches={{
        one: 32,
        two: 512
      }}
    />
  )
}
