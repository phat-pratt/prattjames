import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'

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
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<any>()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += 0.001;
    ref.current.rotation.y += 0.005;
  });
  
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'blue' : 'gray'} />
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
              <Box position={[0, .1, 0]} />
            </Canvas>
          </div>
          <div id="header-text">
            <h1>James Pratt</h1>
            <h3> University of Wisconsin-Madison</h3>
            <h4>B.S. Computer Science and Applied Mathematics</h4>
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
