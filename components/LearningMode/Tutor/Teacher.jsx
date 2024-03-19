import {useGLTF} from "@react-three/drei"
import {useStore} from "@/hooks/useStore"
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useEffect, useState } from "react";

export default function Teacher({teacher, ...props}) {
	const {scene} = useGLTF(`/models/Teacher_Becky.glb`)
  const chatPlayerObject = useStore(state => state.chatPlayerObject);
	const [blink, setBlink] = useState(false)

	useEffect(() => {
		let blinkTimeout
		const nextBlink = () => {
			blinkTimeout = setTimeout(() => {
				setBlink(true)
				setTimeout(() => {
					setBlink(false)
					nextBlink()
				})
			})
		};
		nextBlink()
		return () => clearTimeout(blinkTimeout)
	}, [])
	
	const lerpMorphTarget = (target, value, speed = 0.1) => {
		scene.traverse(child => {
			if (child.isSkinnedMesh && child.morphTargetDictionary) {
				const index = child.morphTargetDictionary[target]
				if (
					index === undefined ||
					child.morphTargetInfluences[index] === undefined
				) {
					return
				}
				child.morphTargetInfluences[index] = MathUtils.lerp(
					child.morphTargetInfluences[index],
					value,
					speed
				)
			}
		})
	}
	useFrame(() => {

		lerpMorphTarget("eye_close", blink ? 1 : 0, 0.5)
		
		for (let i=0; i<= 21; i++) {
			lerpMorphTarget(i, 0, 0.1)
		}
		if (
			chatPlayerObject &&
			chatPlayerObject.visemes &&
			chatPlayerObject.audioPlayer
		) {
			for (let i = chatPlayerObject.visemes.length -1; i>=0; i--) {
				const viseme = chatPlayerObject.visemes[i]
				if (chatPlayerObject.audioPlayer.currentTime * 1000 >= viseme[0]) {
					lerpMorphTarget(viseme[0], 1, 0.2)
					break
				}
			}
		}
	})
	
	return <group {...props}> 
		<primitive object={scene} />
	</group>
}

useGLTF.preload(`/models/Teacher_Becky.glb`)
