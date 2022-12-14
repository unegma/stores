import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useXR} from "@react-three/xr";
import {ItemProps} from "../../types/ItemProps";
const ITEM_URI = `${process.env.REACT_APP_ASSETS_URL}/lion-gems-transformed.glb`;

type GLTFResult = GLTF & {
  nodes: {
    eye1: THREE.Mesh
    eye1001: THREE.Mesh
    lion_ring: THREE.Mesh
  }
  materials: {
    eye1: THREE.MeshStandardMaterial
  }
}

export default function LionGemsRing({  scale = 1, position = [0,0,0], xrScaleOffset = 1, xrPositionOffset = [0,-5,-5] }: ItemProps) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF(ITEM_URI, 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/') as GLTFResult

  console.log('Test %cTest', 'color: goldenrod; font-size: 16px;')
  console.log(nodes, materials)

  const {
    isPresenting
  } = useXR();

  const [localScale, setLocalScale] = useState(scale);
  const [localPosition, setLocalPosition] = useState(position);

  useEffect(() => {
    console.log(`Is Presenting is: ${isPresenting}`);
    if (isPresenting) {
      setLocalScale(scale*xrScaleOffset);
      setLocalPosition(xrPositionOffset);
    } else {
      setLocalScale(scale)
      setLocalPosition(position)
    }
  }, [isPresenting]);

  return (
    <group ref={group} dispose={null} scale={localScale} position={localPosition}>
      <mesh castShadow receiveShadow geometry={nodes.eye1.geometry} position={[-0.21, 2.14, -0.17]} scale={0.05}>
        <meshStandardMaterial color="green" transparent={true} opacity={0.8} metalness={0.9} roughness={0} stencilWrite={true} shadowSide={THREE.DoubleSide} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.eye1001.geometry} position={[0.21, 2.14, -0.17]} scale={0.05}>
        <meshStandardMaterial color="green" transparent={true} opacity={0.8} metalness={0.9} roughness={0} stencilWrite={true} shadowSide={THREE.DoubleSide} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.lion_ring.geometry} scale={0.16}>
        <meshStandardMaterial color="goldenrod" metalness={0.9} roughness={0.1} stencilWrite={true} shadowSide={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

useGLTF.preload(ITEM_URI)
