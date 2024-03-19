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
    <CV shadows camera={{position: [0,0,8], fov: 30}} >
      <color attachment="background" args={["#ececec"]} />
      <Experience />
    </CV>
  )
}