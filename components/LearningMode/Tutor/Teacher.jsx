import {useGLTF} from "@react-three/drei"

export const teachers = ["Becky", "Kimra"]

export default function Teacher({teacher, ...props}) {
	const {scene} = useGLTF(`/models/Teacher_${teacher}.glb`)
	return <group {...props}> 
		<primitive object={scene}>

		</primitive>
	</group>
}

teachers.map(name => {
	useGLTF.preload(`/models/Teacher_${name}.glb)`)
	useGLTF.preload('/animations/animations.glb');
})