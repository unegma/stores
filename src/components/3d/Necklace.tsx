import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useXR} from "@react-three/xr";
import {ItemProps} from "../../types/ItemProps";
const ITEM_URI = `${process.env.REACT_APP_ASSETS_URL}/necklace-transformed.glb`;

type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh
    Object_5001: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}


export default function Necklace({  scale = 1, position = [0,0,0], xrScaleOffset = 10, xrPositionOffset = [1,1,1] }: ItemProps) {
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
      <group rotation={[-0.04, 0, 0]} scale={localScale}>
        <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials['Material.001']}>
          <meshStandardMaterial color="silver" metalness={0.9} roughness={0.1} stencilWrite={true} shadowSide={THREE.DoubleSide} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Object_5001.geometry} material={materials['Material.001']}>
          <meshStandardMaterial color="goldenrod" metalness={0.9} roughness={0.1} stencilWrite={true} shadowSide={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload(ITEM_URI)
