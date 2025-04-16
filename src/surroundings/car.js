import { useGLTF, useAnimations } from "@react-three/drei";
import React, { useRef, useEffect, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Car({ position, scale, speed }) {
  const carRef = useRef();
  const group = useRef();
  const [stopping, setStopping] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);

  const { scene, animations } = useGLTF("/models/sillyTruck.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || stopped) return;
    const keysToPlay = [0, 2, 3, 5, 6];
    keysToPlay.forEach((index) => {
      const key = Object.keys(actions)[index];
      actions[key]?.play();
    });
  }, [actions, stopped]);

  useFrame(() => {
    const body = carRef.current;
    if (!body || stopped) return;
    const position = body.translation();
    if ((position.z < -5 || position.y < -5) && !stopping) {
      setStopping(true);
    }

    if (stopping && currentSpeed > 0) {
      const deceleration = 0.005;
      const newSpeed = Math.max(currentSpeed - deceleration, 0);
      setCurrentSpeed(newSpeed);

      const rotation = body.rotation();
      const forward = new THREE.Vector3(0, 0, -1)
        .applyQuaternion(rotation)
        .multiplyScalar(newSpeed);
      body.setLinvel({ x: forward.x, y: body.linvel().y, z: forward.z }, true);
        console.log(newSpeed)
      if (newSpeed < 1) {
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        if (actions) {
          Object.values(actions).forEach((action) => {
            action.stop();
          });
        }
        setStopped(true);
      }

      return;
    }

    if (!stopping) {
      const rotation = body.rotation();
      const forward = new THREE.Vector3(0, 0, -1)
        .applyQuaternion(rotation)
        .multiplyScalar(currentSpeed);
      body.setLinvel({ x: forward.x, y: body.linvel().y, z: forward.z }, true);
    }
  });

  return (
    <>
      <RigidBody
        ref={carRef}
        colliders="trimesh"
        type="dynamic"
        position={position}
        friction={1}
        restitution={0.1}
        linearDamping={1}
        mass={10}
        angularDamping={0.5}
      >
        <group ref={group} rotation={[0, Math.PI / 2, 0]}>
          <primitive object={scene} scale={scale} />
        </group>
      </RigidBody>
    </>
  );
}
