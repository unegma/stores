import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useXR} from "@react-three/xr";
import {ItemProps} from "../../types/ItemProps";
const ITEM_URI = `${process.env.REACT_APP_ASSETS_URL}/gem-transformed.glb`;

type GLTFResult = GLTF & {
  nodes: {
    gem: THREE.Mesh
  }
  materials: {
    gem: THREE.MeshStandardMaterial
  }
}

export default function Gem({ scale = 1, position = [0,0,0], xrScaleOffset = 1, xrPositionOffset = [0,-5,-5] }: ItemProps) {
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
      <mesh castShadow receiveShadow geometry={nodes.gem.geometry} material={materials.gem}>
        <meshStandardMaterial color="green" transparent={true} opacity={0.8} metalness={0.9} roughness={0} stencilWrite={true} shadowSide={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

useGLTF.preload(ITEM_URI)
