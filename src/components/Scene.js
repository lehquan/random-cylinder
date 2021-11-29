import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber';

const Scene = () => {
  const groupRef = useRef()
  const geo = new THREE.SphereBufferGeometry(1, 64, 64)
  const [particle, setParticle] = useState([])
  const count = 200

  useEffect(() => {
    let temp = []

    for(let i=0; i< count; i++){
      let s = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({color: Math.random() * 0x7f7f7f + 0x7f7f7f}));
      s.scale.setScalar(THREE.MathUtils.randFloat(0.1, 0.25));
      s.userData = {
        posY: THREE.MathUtils.randFloat(-10, 10),			// at what height
        radius: THREE.MathUtils.randFloat(5, 10),			// how far from Y-axis
        phase: Math.random() * Math.PI * 2,						// where to start
        speed: (0.1 - Math.random() * 0.2) * Math.PI	// how fast to circulate
      };
      temp.push(s);
    }
    setParticle([...temp])
  }, [])

  useFrame(({clock}) => {
    let t = clock.getElapsedTime()
    particle.forEach(sphere => {
      let ud = sphere.userData;
      let a = (ud.speed * t) + ud.phase;
      sphere.position.set(Math.cos(a), 0, -Math.sin(a))
      .multiplyScalar(ud.radius)
      .setY(ud.posY);
    })

    groupRef.current.rotation.y += 0.001
  })

  return(
      <group>
        <pointLight intensity={1.5}/>
        <ambientLight color={0xffffff} intensity={.5}/>
        <group ref={groupRef}>
          <mesh geometry={geo}>
            <meshBasicMaterial color={0xFFFF00}/>
          </mesh>
          {
            particle.map((item, index) => {
              return(<primitive object={item} key={Math.random()}/>)
            })
          }
        </group>
      </group>
  )
}

export default Scene
