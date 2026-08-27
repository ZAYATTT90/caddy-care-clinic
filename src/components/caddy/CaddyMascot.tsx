import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function useReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function CaddyBody({ calm }: { calm: boolean }) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const antenna = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;

    // Mouse / tilt parallax — eased toward the pointer so Caddy "tracks" you.
    const targetY = pointer.x * 0.55;
    const targetX = -pointer.y * 0.3;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.045;

    if (calm) return;

    // Idle bob + slow ambient spin + breathing scale pulse.
    group.current.position.y = Math.sin(t * 1.1) * 0.12;
    group.current.rotation.z = Math.sin(t * 0.6) * 0.04;
    const breathe = 1 + Math.sin(t * 1.6) * 0.028;
    if (body.current) body.current.scale.set(breathe, 1 / breathe ** 0.4, breathe);
    if (antenna.current) antenna.current.position.y = 1.05 + Math.sin(t * 2.4) * 0.03;
  });

  return (
    <group ref={group}>
      {/* glass head */}
      <mesh ref={body} castShadow>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshPhysicalMaterial
          color="#dff4f7"
          roughness={0.12}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.55}
          thickness={1.4}
          ior={1.35}
        />
      </mesh>

      {/* visor */}
      <mesh position={[0, 0.05, 0.72]} rotation={[-0.08, 0, 0]}>
        <capsuleGeometry args={[0.16, 0.5, 8, 24]} />
        <meshStandardMaterial color="#1f3a44" roughness={0.25} metalness={0.4} />
      </mesh>

      {/* eyes */}
      {[-0.24, 0.24].map((x) => (
        <mesh key={x} position={[x, 0.08, 0.86]}>
          <sphereGeometry args={[0.085, 32, 32]} />
          <meshStandardMaterial
            color="#7ce7f5"
            emissive="#4fd6ec"
            emissiveIntensity={1.6}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* care cross badge */}
      <group position={[0, -0.45, 0.78]} rotation={[0.3, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.32, 0.1, 0.05]} />
          <meshStandardMaterial color="#f0a054" emissive="#c9762f" emissiveIntensity={0.35} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.1, 0.32, 0.05]} />
          <meshStandardMaterial color="#f0a054" emissive="#c9762f" emissiveIntensity={0.35} />
        </mesh>
      </group>

      {/* antenna */}
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 16]} />
        <meshStandardMaterial color="#3a4a52" />
      </mesh>
      <mesh ref={antenna} position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial
          color="#ffd27a"
          emissive="#ffb347"
          emissiveIntensity={2}
          roughness={0.3}
        />
      </mesh>

      {/* orbiting ring */}
      <mesh rotation={[Math.PI / 2.2, 0.3, 0]}>
        <torusGeometry args={[1.35, 0.028, 16, 96]} />
        <meshStandardMaterial
          color="#8fdfe8"
          emissive="#57c9d8"
          emissiveIntensity={0.7}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

export default function CaddyMascot() {
  const calm = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.2, 4.4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 3]} intensity={1.5} castShadow />
      <directionalLight position={[-3, -1, 2]} intensity={0.5} color="#ffc98a" />
      <Float speed={calm ? 0 : 1.2} rotationIntensity={calm ? 0 : 0.35} floatIntensity={calm ? 0 : 0.6}>
        <CaddyBody calm={calm} />
      </Float>
      <ContactShadows position={[0, -1.6, 0]} opacity={0.28} scale={7} blur={3} far={3} />
      <Environment preset="sunset" />
    </Canvas>
  );
}
