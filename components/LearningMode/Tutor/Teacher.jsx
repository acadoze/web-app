import {useGLTF, useAnimations} from "@react-three/drei"
import {useStore} from "@/hooks/useStore"
import { useFrame } from "@react-three/fiber";
import { MathUtils,MeshStandardMaterial  } from "three";
import { useEffect, useState, useRef } from "react";
import { randInt } from "three/src/math/MathUtils";

const ANIMATION_FADE_TIME = 0.5;

export default function Teacher({teacher, ...props}) {
	const {scene} = useGLTF(`/models/Teacher_Nanami.glb`)

  const chatPlayerObject = useStore(state => state.chatPlayerObject);
  const loadingAnswer = useStore(state => state.loadingAnswer);
	const [blink, setBlink] = useState(false)
	const group = useRef();

	const { animations } = useGLTF(`/animations/animations_Nanami.glb`);
	const { actions, mixer } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("Idle");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.material) {
        child.material = new MeshStandardMaterial({
          map: child.material.map,
        });
      }
    });
  }, [scene])

    useEffect(() => {
      let blinkTimeout;
      const nextBlink = () => {
        blinkTimeout = setTimeout(() => {
          setBlink(true);
          setTimeout(() => {
            setBlink(false);
            nextBlink();
          }, 100);
        }, randInt(1000, 5000));
      };
      nextBlink();
      return () => clearTimeout(blinkTimeout);
    }, []);


   useEffect(() => {
      if (loadingAnswer) {
        setAnimation("Thinking");
      } else if (chatPlayerObject && chatPlayerObject.audioPlaying) {
        setAnimation(randInt(0, 1) ? "Talking" : "Talking2");
      } else {
        setAnimation("Idle");
      }
   }, [loadingAnswer, chatPlayerObject]);

  useFrame(({ camera }) => {
    // Smile
    lerpMorphTarget("mouthSmile", 0.2, 0.5);
    // Blinking
    lerpMorphTarget("eye_close", blink ? 1 : 0, 0.5);

    // Talking
    for (let i = 0; i <= 21; i++) {
      lerpMorphTarget(i, 0, 0.1); // reset morph targets
    }

    if (
      chatPlayerObject &&
      chatPlayerObject.audioPlayer &&
      chatPlayerObject.audioPlaying &&
      chatPlayerObject.visemes
    ) {
      for (let i = chatPlayerObject.visemes.length - 1; i >= 0; i--) {
        const viseme = chatPlayerObject.visemes[i];
        if (chatPlayerObject.audioPlayer.currentTime * 1000 >= viseme[0]) {
          lerpMorphTarget(viseme[1], 1, 0.2);
          break;
        }
      }
      if (
        actions[animation].time >
        actions[animation].getClip().duration - ANIMATION_FADE_TIME
      ) {
        setAnimation((animation) =>
          animation === "Talking" ? "Talking2" : "Talking"
        ); // Could load more type of animations and randomization here
      }
    }
  });

  useEffect(() => {
    actions[animation]
      ?.reset()
      .fadeIn(mixer.time > 0 ? ANIMATION_FADE_TIME : 0)
      .play();
    return () => {
      actions[animation]?.fadeOut(ANIMATION_FADE_TIME);
    };
  }, [animation, actions]);

	const lerpMorphTarget = (target, value, speed = 0.1) => {
    scene.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (
          index === undefined ||
          child.morphTargetInfluences[index] === undefined
        ) {
          return;
        }
        child.morphTargetInfluences[index] = MathUtils.lerp(
          child.morphTargetInfluences[index],
          value,
          speed
        );
      }
    });
  };
	
	return <group {...props} dispose={null} ref={group}> 
		<primitive object={scene} />
	</group>
}

useGLTF.preload(`/models/Teacher_Nanami.glb`)
useGLTF.preload(`/animations/animations_Nanami.glb`);
