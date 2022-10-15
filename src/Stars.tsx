import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import './App.css';

const random = require('maath/random/dist/maath-random.esm');


function Stars() {
    const ref = useRef<any>()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: .5 }))
    useFrame((state, delta) => {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    })
    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} >
          <PointMaterial transparent color="navy" size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    )
  };
export default Stars