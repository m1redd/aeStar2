import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function Boxes({ position, color }) {
  return (
    <>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={position}>
          <boxGeometry args={[1, 1, 25]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </RigidBody>
    </>
  );
}
