import React, { useState, useEffect } from 'react';
import './App.css';

import { Canvas } from '@react-three/fiber'
import Box from './Box'
import Stars from './Stars'

import { professionalExperience } from './config/experience'


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
      <div style={{ position: 'fixed', width: '100%', height: '100%'}}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </div>
      <div className="App">
        <header className="App-header">
          <div style={{ position: 'absolute', width: '100%', height: '100%'}}>
            <Canvas camera={{ position: [0, 0, 1] }}>
              <ambientLight intensity={0.1} />
              <pointLight position={[5, 5, 5]} />
              <Box position={[0, 1.5, -5]} onClickCallback={onLightSwitchFlipped}/>
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
