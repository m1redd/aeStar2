import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Boxes from "./surroundings/boxes";
import Car from "./surroundings/car";
import Ligh from "./surroundings/ligh";
import "./App.css";

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 60 }}>
        <color args={[0.115, 0.15, 0.15]} attach="background" />
        <Ligh />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />

        <OrbitControls />

        <Physics gravity={[0, -100, 0]}>
          <Boxes position={[-1.5, 0, 0]} color="yellow" />
          <Boxes position={[1.5, 0, 0]} color="blue" />

          <Car position={[0, 1.5, 10]} scale={0.012} speed={3} />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
