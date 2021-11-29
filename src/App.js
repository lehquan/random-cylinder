import React, { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene';

const App = () => {
  return(
      <Suspense fallback={<span>loading...</span>}>
        <Canvas
            linear
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true, antialias: true }}
            camera={{ fov: 60, position: [0, 0, 30] }}
            onCreated={({ camera, scene, gl }) => {
              gl.setClearColor(0x202020)
            }}>
          <OrbitControls />
          <Scene/>
        </Canvas>
      </Suspense>
  )
}

export default App;
