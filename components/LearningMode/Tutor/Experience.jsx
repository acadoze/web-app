import {Canvas} from "@react-three/fiber"
import {Box, Gltf, OrbitControls, Environment, CameraControls} from "@react-three/drei"
import Teacher from "./Teacher"

export default function Experience({client}) {
  function degToRad(degrees) {
    return degrees * Math.PI / 180
  }
  return (
    <>
      <Canvas camera={{
        position: [0, 0, 0.0001]
      }}>
        <CameraManager />
        <Environment preset="sunset" />
        <ambientLight intesity={0.9} color="pink" />
        <hemisphereLight
          skyColor={'#fcf9d9'}
          groundColor={'#fcf9d9'}
          intensity={0.5}
          castShadow
        />
        <directionalLight
          position={[500, 100, 500]}
          color={'#fcf9d9'}
          intensity={2}
          castShadow
        />
        <Teacher teacher="Becky" position={[-5, -1, -3]} scale={1.6} rotation-x={degToRad(0)} rotation-y={degToRad(50)} client={client} />
        <Gltf src="/models/hexagon_pyramid.glb" position={[-2, -1.2, -5]} />
      </Canvas>
    </>
  )
}

function CameraManager() {
  return (
    <CameraControls 
      minZoom={1}
      maxZoom={5}
      polarRotateSpeed={-0.3}
      azimuthRotateSpeed={-0.3}
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