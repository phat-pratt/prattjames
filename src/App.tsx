import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter
} from "three";
// import { Text } from '@react-three/drei'

import './App.css';

const professionalExperience = [
  {
    start: 'Aug. 2020',
    title: 'Software Engineer II',
    company: 'Action Network Inc.'
  }, 
  {
    start: 'Jan. 2019',
    end: 'Aug 2019',
    title: 'Application Development Co-op',
    company: 'The Sub-Zero Group (Subzero, Wolf, and Cove)'
  }, 
  {
    start: 'Jun. 2018',
    end: 'Sep. 2019',
    title: 'Summer Analyst',
    company: 'Great Oaks Venture Capital'
  }, 
  {
    start: 'Sep. 2017',
    end: 'Feb 2018',
    title: 'Dairy Scientist',
    company: 'Babcock Dairy Plant'
  }
];

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

    ref.current.rotation.x += (hovered ? -0.005 : 0.005);
    ref.current.rotation.y += (hovered ? -0.001 : 0.001);
  });
console.log(ref.current)
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


  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={onClick}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? 'lightsalmon' : 'darkslategrey'} />
    </mesh>
  )
}

function App() {
  const [isDarkness, setIsDarkness] = useState(false);

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--cursorXpos', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursorYpos', `${event.clientY}px`)
    };

    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);

    };
  }, []);

  const onLightSwitchFlipped = () =>{
    console.log('onPress')
    setIsDarkness(!isDarkness)
    document.documentElement.style.setProperty('background', 'none');
  }

  return (
    <div id={isDarkness ? "container" : "container-light"}>

      <div className="App">
        <header className="App-header">
          <div style={{ position: 'absolute', width: '100%', height: '100%'}}>
            <Canvas>
              <ambientLight intensity={0.1} />
              <pointLight position={[5, 5, 5]} />
              {/* <Text position={[0,0,4]} material-toneMapped={false}>James Pratt</Text> */}
              <Box position={[0, 0, 0]} onClickCallback={onLightSwitchFlipped}/>
            </Canvas>
          </div>
          <div id="header-text">
            <h1>James Pratt</h1>
            <h3>Software Engineer</h3>
          </div>
        </header>
        <div id="Experience">
          <h1 className="Experience-header">Professional Experience</h1>
          <ol className="Experience-list">
            {professionalExperience.map(exp => {
              const { title, company, start, end = "Present" } = exp;
              const time = `${start} - ${end}`;

              return (
                <li key={title} className="Experience-list-item">
                  <div className="item-left">
                    <div className="Experience-title">{title}</div>
                  </div>
                  <div className="item-right">
                    <div className="Experience-company">{company}</div>
                    <i className="Experience-time">{time}</i>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <button id="light-switch" onClick={onLightSwitchFlipped}>{`Turn ${isDarkness ? 'ON' : 'OFF'} the lights`}</button>
    </div>
  );
}

export default App;
