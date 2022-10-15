import React, { useState, useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber'
import {
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter
} from "three";


function Box(props: any) {
  const { onClickCallback } = props;  
  const { scene, gl } = useThree();

  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<any>()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [scaleValue, setScaleValue] = useState(1);
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {

    if(hovered) { 
      console.log(ref.current.scale)
      ref.current.scale.x += (scaleValue * 0.005);
      ref.current.scale.y += (scaleValue * 0.005);
      ref.current.scale.z += (scaleValue * 0.005);
      if(ref.current.scale.x < 0.5 ) {
        setScaleValue(1);
      } 
      if(ref.current.scale.x > 1.1) {
        setScaleValue(-1);
      }
    }

    ref.current.rotation.x += (hovered ? -0.02 : 0.001);
    ref.current.rotation.y += (hovered ? -0.01 : 0.005);
  });

  const onClick = useCallback(() => {
    click(!clicked);
    onClickCallback();
  }, [onClickCallback, clicked])
  
  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter
  });
  const cubeCamera = new CubeCamera(1, 0, cubeRenderTarget);
  cubeCamera.position.set(0, 0, 0);
  scene.add(cubeCamera);

  useFrame(() => cubeCamera.update(gl, scene));


  return (
    <mesh
      {...props}
      ref={ref}
      onClick={onClick}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'lightsalmon'} />
    </mesh>
  )
};

  export default Box;